import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';

const styles = {
  dateButton: (isFocused: boolean) => ({
    padding: '0 30px',
    width: '180px',
    borderRadius: '35px',
    backgroundColor: isFocused ? '#fff' : '#e0e0e0',
    whiteSpace: 'nowrap',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

interface DatePickerButtonProps {
  label: string;
  date: Dayjs | null;
  onDateChange: (newDate: Dayjs | null) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export function DatePickerButton({ label, date, onDateChange, focused, onFocus, onBlur }: DatePickerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)} onFocus={onFocus} onBlur={onBlur} sx={styles.dateButton(focused)}>
        <Typography fontSize="medium">{label}</Typography>
        <Typography fontSize="small" color="silver">
          {date ? dayjs(date).format('YYYY-MM-DD') : 'When?'}
        </Typography>
      </Button>
      <DatePicker
        open={isOpen}
        onClose={() => setIsOpen(false)}
        value={date}
        onChange={(newDate) => {
          onDateChange(newDate);
          setIsOpen(false);
        }}
        slots={{
          field: () => null,
        }}
        slotProps={{
          popper: {
            anchorEl: buttonRef.current,
          },
        }}
      />
    </>
  );
}
