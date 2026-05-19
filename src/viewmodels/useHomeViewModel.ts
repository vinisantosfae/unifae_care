import { useEffect, useState } from 'react';
import { HomeSnapshot } from '../models/Api';
import { getHomeSnapshot } from '../services/patient_app';

export function useHomeViewModel() {
  const [home, setHome] = useState<HomeSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadHome() {
    setLoading(true);
    setError(null);

    try {
      setHome(await getHomeSnapshot());
    } catch {
      setError('Não foi possível carregar a home.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHome();
  }, []);

  return { home, loading, error, reload: loadHome };
}
