import { useEffect, useState } from 'react';
import { PlanWeekResponse } from '../models/Api';
import { getPlanWeek } from '../services/patient_app';

export function useScheduleViewModel() {
  const [planWeek, setPlanWeek] = useState<PlanWeekResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPlanWeek() {
    setLoading(true);
    setError(null);

    try {
      const data = (await getPlanWeek()) as PlanWeekResponse;
      setPlanWeek(data);
      setSelectedDate((currentDate) => currentDate ?? data.days.find((day) => day.isToday)?.date ?? data.today);
    } catch {
      setError('Não foi possível carregar a agenda.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlanWeek();
  }, []);

  const selectedDay =
    planWeek?.days.find((day) => day.date === selectedDate) ??
    planWeek?.days.find((day) => day.isToday) ??
    planWeek?.days[0] ??
    null;

  return {
    planWeek,
    selectedDay,
    selectedDate,
    setSelectedDate,
    loading,
    error,
    reload: loadPlanWeek,
  };
}
