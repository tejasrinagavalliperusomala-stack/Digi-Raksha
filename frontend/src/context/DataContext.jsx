import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchDashboardSummary,
  fetchTransactions,
  simulateBatchApi,
  resetDemoDataApi,
  analyzeTransactionApi,
  fetchHealth
} from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [apiHealth, setApiHealth] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type, id: Date.now() });
    setTimeout(() => setNotification(null), 4500);
  };

  const loadData = useCallback(async () => {
    try {
      const [sumData, txnsData, healthData] = await Promise.all([
        fetchDashboardSummary(),
        fetchTransactions(),
        fetchHealth()
      ]);
      setSummary(sumData);
      setTransactions(txnsData);
      setApiHealth(healthData);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const runSimulation = async (batchSize = 10, fraudBias = 0.10) => {
    setIsSimulating(true);
    try {
      const res = await simulateBatchApi(batchSize, fraudBias);
      setSummary(res.updated_summary);
      // Prepend batch sample to transactions
      setTransactions(prev => [...(res.batch_sample || []), ...prev]);
      showNotification(res.message, 'success');
      return res;
    } catch (err) {
      showNotification("Simulation failed: " + err.message, 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  const resetDemo = async () => {
    setIsLoading(true);
    try {
      const res = await resetDemoDataApi();
      await loadData();
      showNotification(res.message || "Reset to baseline (0.172% rate).", 'info');
    } catch (err) {
      showNotification("Reset failed: " + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeTransaction = async (formData) => {
    try {
      const result = await analyzeTransactionApi(formData);
      // Reload summary and transaction list so metrics update immediately
      const [sumData, txnsData] = await Promise.all([
        fetchDashboardSummary(),
        fetchTransactions()
      ]);
      setSummary(sumData);
      setTransactions(txnsData);
      showNotification(`Analysis complete: Classified as ${result.risk_level}`, result.risk_level === 'High Risk' ? 'error' : (result.risk_level === 'Suspicious' ? 'warning' : 'success'));
      return result;
    } catch (err) {
      showNotification("Analysis error: " + err.message, 'error');
      throw err;
    }
  };

  return (
    <DataContext.Provider value={{
      summary,
      transactions,
      isLoading,
      isSimulating,
      apiHealth,
      notification,
      showNotification,
      refreshData: loadData,
      runSimulation,
      resetDemo,
      analyzeTransaction
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
