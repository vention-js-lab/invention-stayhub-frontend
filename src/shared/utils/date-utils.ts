import { time } from '../libs/time.lib';

export const getTodayDate = (): string => {
  const today = time().toDate();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function calculateDayDiff(startDate: string | Date, endDate: string | Date) {
  const start = time(startDate);
  const end = time(endDate);
  return Math.max(0, end.diff(start, 'day'));
}
