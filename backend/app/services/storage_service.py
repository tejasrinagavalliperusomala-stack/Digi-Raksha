import random
import time
from datetime import datetime, timedelta
from typing import List, Dict, Any, Tuple
from app.schemas.transaction import (
    TransactionItem,
    RiskLevel,
    DashboardSummary,
    SimulationResponse
)
from app.config.settings import settings

class TransactionStorageService:
    def __init__(self):
        self.reset_to_baseline()

    def reset_to_baseline(self):
        """
        Reset to mathematically consistent benchmark:
        172 flagged fraudulent transactions out of 100,000 total analyzed = exactly 0.172%
        """
        self.total_analyzed = settings.INITIAL_TOTAL_TRANSACTIONS      # 100,000
        self.flagged_fraudulent = settings.INITIAL_FLAGGED_TRANSACTIONS # 172
        self.high_risk_count = settings.INITIAL_HIGH_RISK              # 48
        self.suspicious_count = settings.INITIAL_SUSPICIOUS            # 124
        self.legitimate_count = self.total_analyzed - self.flagged_fraudulent  # 99,828
        
        self.volume_by_channel = {
            "UPI": 64200,
            "Credit Card": 18400,
            "Net Banking": 9800,
            "Debit Card": 5100,
            "Digital Wallet": 1900,
            "Cross-Border / Wire": 600
        }
        
        self.transactions: List[TransactionItem] = self._generate_initial_recent_transactions()
        self.timeline_series: List[Dict[str, Any]] = self._generate_initial_timeline_series()
        self.last_updated = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def get_fraud_detection_rate(self) -> float:
        """
        Calculates the flagged transaction rate:
        (Number of transactions flagged as fraudulent / Total analyzed transactions) * 100
        """
        if self.total_analyzed == 0:
            return 0.0
        rate = (self.flagged_fraudulent / self.total_analyzed) * 100.0
        return round(rate, 3)

    def get_dashboard_summary(self) -> DashboardSummary:
        return DashboardSummary(
            total_analyzed=self.total_analyzed,
            flagged_fraudulent=self.flagged_fraudulent,
            fraud_detection_rate=self.get_fraud_detection_rate(),
            high_risk_count=self.high_risk_count,
            suspicious_count=self.suspicious_count,
            legitimate_count=self.legitimate_count,
            average_risk_score=14.2,
            last_updated=self.last_updated,
            is_demo_mode=True,
            volume_by_channel=self.volume_by_channel,
            risk_distribution={
                "Legitimate": self.legitimate_count,
                "Suspicious": self.suspicious_count,
                "High Risk": self.high_risk_count
            },
            timeline_series=self.timeline_series,
            recent_flagged=[t for t in self.transactions if t.is_flagged][:15]
        )

    def record_analyzed_transaction(self, item: TransactionItem):
        self.total_analyzed += 1
        if item.risk_level == RiskLevel.HIGH_RISK:
            self.high_risk_count += 1
            self.flagged_fraudulent += 1
        elif item.risk_level == RiskLevel.SUSPICIOUS:
            self.suspicious_count += 1
            self.flagged_fraudulent += 1
        else:
            self.legitimate_count += 1

        # Update channel count
        channel = item.payment_method
        self.volume_by_channel[channel] = self.volume_by_channel.get(channel, 0) + 1

        # Add to front of transaction feed
        self.transactions.insert(0, item)
        if len(self.transactions) > 200:
            self.transactions.pop()
            
        self.last_updated = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def simulate_batch(self, batch_size: int = 10, fraud_bias_ratio: float = 0.10) -> SimulationResponse:
        """
        Controlled batch generation of synthetic transactions.
        Recalculates all metrics and appends to feed.
        """
        random.seed(int(time.time() * 1000) % 100000)
        new_items: List[TransactionItem] = []
        new_flagged = 0

        channels = ["UPI", "Credit Card", "Net Banking", "Debit Card", "Digital Wallet", "Cross-Border / Wire"]
        tx_types = ["P2P (Peer-to-Peer)", "P2M (Peer-to-Merchant)", "Bill Payment", "International E-Commerce", "Cash Out / ATM"]

        for i in range(batch_size):
            is_fraud = (random.random() < fraud_bias_ratio)
            channel = random.choices(channels, weights=[0.55, 0.20, 0.12, 0.08, 0.03, 0.02])[0]
            tx_type = random.choice(tx_types)

            if is_fraud:
                new_flagged += 1
                is_high = random.random() > 0.4
                risk_level = RiskLevel.HIGH_RISK if is_high else RiskLevel.SUSPICIOUS
                score = random.uniform(75.0, 98.5) if is_high else random.uniform(45.0, 68.0)
                amount = round(random.uniform(25000, 185000), 2)
                status = "Blocked" if is_high else "Flagged for Review"
                is_flagged = True
                self.flagged_fraudulent += 1
                if is_high:
                    self.high_risk_count += 1
                else:
                    self.suspicious_count += 1
            else:
                risk_level = RiskLevel.LEGITIMATE
                score = round(random.uniform(1.0, 22.0), 1)
                amount = round(random.uniform(50, 8500), 2)
                status = "Approved"
                is_flagged = False
                self.legitimate_count += 1

            self.total_analyzed += 1
            self.volume_by_channel[channel] = self.volume_by_channel.get(channel, 0) + 1

            txn = TransactionItem(
                id=f"TXN-SIM-{random.randint(10000, 99999)}",
                timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                amount=amount,
                payment_method=channel,
                transaction_type=tx_type,
                sender_id=f"USR-{random.randint(100000, 999999)}",
                receiver_id=f"MER-{random.randint(100000, 999999)}",
                risk_level=risk_level,
                risk_score=round(score, 1),
                status=status,
                is_flagged=is_flagged
            )
            new_items.append(txn)
            self.transactions.insert(0, txn)

        if len(self.transactions) > 300:
            self.transactions = self.transactions[:300]

        self.last_updated = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return SimulationResponse(
            message=f"Successfully simulated {batch_size} synthetic transactions ({new_flagged} flagged).",
            generated_count=batch_size,
            new_flagged_count=new_flagged,
            updated_summary=self.get_dashboard_summary(),
            batch_sample=new_items
        )

    def _generate_initial_recent_transactions(self) -> List[TransactionItem]:
        items = []
        samples = [
            ("TXN-794021", 84500.0, "Credit Card", "International E-Commerce", RiskLevel.HIGH_RISK, 94.2, "Blocked", True, 2),
            ("TXN-881203", 420.0, "UPI", "P2M (Peer-to-Merchant)", RiskLevel.LEGITIMATE, 4.1, "Approved", False, 5),
            ("TXN-912048", 45000.0, "Net Banking", "Cash Out / ATM", RiskLevel.SUSPICIOUS, 62.8, "Flagged for Review", True, 9),
            ("TXN-382910", 1250.0, "UPI", "P2P (Peer-to-Peer)", RiskLevel.LEGITIMATE, 8.3, "Approved", False, 14),
            ("TXN-551920", 120000.0, "Cross-Border / Wire", "International E-Commerce", RiskLevel.HIGH_RISK, 91.5, "Blocked", True, 22),
            ("TXN-610294", 890.0, "UPI", "Bill Payment", RiskLevel.LEGITIMATE, 2.7, "Approved", False, 28),
            ("TXN-102948", 32000.0, "Debit Card", "P2M (Peer-to-Merchant)", RiskLevel.SUSPICIOUS, 54.0, "Flagged for Review", True, 35),
            ("TXN-492019", 2500.0, "Digital Wallet", "P2M (Peer-to-Merchant)", RiskLevel.LEGITIMATE, 6.5, "Approved", False, 41),
            ("TXN-781923", 95000.0, "Credit Card", "International E-Commerce", RiskLevel.HIGH_RISK, 88.9, "Blocked", True, 49),
            ("TXN-294012", 150.0, "UPI", "P2M (Peer-to-Merchant)", RiskLevel.LEGITIMATE, 1.2, "Approved", False, 58),
            ("TXN-391024", 18500.0, "Net Banking", "P2P (Peer-to-Peer)", RiskLevel.SUSPICIOUS, 48.7, "Flagged for Review", True, 64),
            ("TXN-940129", 3400.0, "UPI", "Bill Payment", RiskLevel.LEGITIMATE, 5.0, "Approved", False, 75),
        ]
        base_time = datetime.now()
        for txn_id, amt, method, txtype, risk, score, status, flagged, mins_ago in samples:
            t_str = (base_time - timedelta(minutes=mins_ago)).strftime("%Y-%m-%d %H:%M:%S")
            items.append(TransactionItem(
                id=txn_id,
                timestamp=t_str,
                amount=amt,
                payment_method=method,
                transaction_type=txtype,
                sender_id=f"USR-{random.randint(100000, 999999)}",
                receiver_id=f"MER-{random.randint(100000, 999999)}",
                risk_level=risk,
                risk_score=score,
                status=status,
                is_flagged=flagged
            ))
        return items

    def _generate_initial_timeline_series(self) -> List[Dict[str, Any]]:
        points = []
        now = datetime.now()
        # 12 time intervals over the past 24 hours
        # Rates hover naturally around 0.172%
        rates = [0.168, 0.174, 0.170, 0.165, 0.180, 0.172, 0.169, 0.175, 0.171, 0.173, 0.170, 0.172]
        volumes = [7800, 8200, 7900, 8100, 8600, 8900, 8400, 8700, 8300, 8500, 8200, 8400]
        
        for i in range(12):
            t = (now - timedelta(hours=(11 - i) * 2)).strftime("%H:%M")
            vol = volumes[i]
            rate = rates[i]
            flagged = int(round(vol * (rate / 100.0)))
            points.append({
                "time": t,
                "volume": vol,
                "flagged": flagged,
                "detectionRate": rate
            })
        return points

storage_service = TransactionStorageService()
