// src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export function useAttributionData(params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.attribution.getData(params);
      if (result && result.success && result.data) {
        setData(result.data);
      } else {
        setData(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params.startDate, params.endDate, params.model]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useSimulation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const simulate = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.attribution.simulate(params);
      if (result && result.success && result.data) {
        setResult(result.data);
        return result.data;
      }
      setResult(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { simulate, result, loading, error, reset };
}

export function useReportGeneration() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generate = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.attribution.generateReport(params);
      if (result && result.success && result.data) {
        setResult(result.data);
        return result.data;
      }
      setResult(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { generate, result, loading, error, reset };
}

export function useTopChannels(limit = 5) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.attribution.getTopChannels({ limit });
        if (result && result.success && result.data) {
          setData(result.data);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  return { data, loading, error };
}