import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { useData } from '../context/DataContext';

export const TransactionsPage = () => {
  const { transactions } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [sortField, setSortField] = useState('timestamp');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const pageSize = 10;

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return (transactions || []).filter(item => {
      const matchSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sender_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.receiver_id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRisk =
        riskFilter === 'All' || item.risk_level.toLowerCase() === riskFilter.toLowerCase();

      const matchChannel =
        channelFilter === 'All' || item.payment_method.toLowerCase() === channelFilter.toLowerCase();

      return matchSearch && matchRisk && matchChannel;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [transactions, searchTerm, riskFilter, channelFilter, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Timestamp,Amount,Channel,Type,RiskLevel,RiskScore,Status\n";
    const rows = filteredTransactions.map(t =>
      `"${t.id}","${t.timestamp}",${t.amount},"${t.payment_method}","${t.transaction_type}","${t.risk_level}",${t.risk_score},"${t.status}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digiraksha_transactions_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Transaction Explorer & Audit Trail
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Filter, search, and audit simulated transaction records and risk classifications.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="glass-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '0.86rem',
            fontWeight: 600,
            color: 'var(--text-accent)'
          }}
        >
          <Download size={15} />
          Export CSV ({filteredTransactions.length})
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          alignItems: 'center'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by ID, User, Merchant..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="cyber-input"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Risk Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Risk:</span>
          <select
            value={riskFilter}
            onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }}
            className="cyber-select"
          >
            <option value="All">All Classifications</option>
            <option value="Legitimate">Legitimate</option>
            <option value="Suspicious">Suspicious</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>

        {/* Channel Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Channel:</span>
          <select
            value={channelFilter}
            onChange={(e) => { setChannelFilter(e.target.value); setCurrentPage(1); }}
            className="cyber-select"
          >
            <option value="All">All Channels</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Digital Wallet">Digital Wallet</option>
            <option value="Cross-Border / Wire">Cross-Border / Wire</option>
          </select>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
              <th
                onClick={() => toggleSort('id')}
                style={{ padding: '12px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Transaction ID</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th
                onClick={() => toggleSort('timestamp')}
                style={{ padding: '12px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Time</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th
                onClick={() => toggleSort('amount')}
                style={{ padding: '12px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Amount (INR)</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th style={{ padding: '12px' }}>Channel</th>
              <th style={{ padding: '12px' }}>Type</th>
              <th style={{ padding: '12px' }}>Risk Level</th>
              <th
                onClick={() => toggleSort('risk_score')}
                style={{ padding: '12px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Risk Score</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No transactions match the specified filter criteria.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  className="table-row-hover"
                >
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-accent)' }}>
                    {txn.id}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {txn.timestamp}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {txn.payment_method}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {txn.transaction_type}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <StatusBadge status={txn.risk_level} />
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {txn.risk_score}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {txn.status}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-accent)',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem'
                      }}
                    >
                      <Eye size={13} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          <span>
            Showing page {currentPage} of {totalPages} ({filteredTransactions.length} records)
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <Modal
        isOpen={!!selectedTxn}
        onClose={() => setSelectedTxn(null)}
        title={`Audit Inspector: ${selectedTxn?.id}`}
      >
        {selectedTxn && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', background: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sender ID:</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{selectedTxn.sender_id}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recipient / Merchant:</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{selectedTxn.receiver_id}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount:</span>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{selectedTxn.amount.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Risk Status:</span>
                <div><StatusBadge status={selectedTxn.risk_level} /></div>
              </div>
            </div>

            <div className="code-box">
              <pre>{JSON.stringify(selectedTxn, null, 2)}</pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default TransactionsPage;
