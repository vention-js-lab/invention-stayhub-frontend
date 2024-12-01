import dayjs from 'dayjs';

export function formatDate(date: string | number | Date | dayjs.Dayjs | null | undefined) {
  const parsedDate = date ? dayjs(date) : null;

  if (!parsedDate || !parsedDate.isValid()) {
    return null;
  }

  return parsedDate.format(parsedDate.year() === dayjs().year() ? 'MMMM D' : 'MMMM D, YYYY');
}
