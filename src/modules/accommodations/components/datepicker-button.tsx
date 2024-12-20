import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

const styles = {
  dateButton: {
    width: '160px',
    marginLeft: '5px',
    padding: '0',
    borderRadius: '35px',
    backgroundColor: '#fff',
    whiteSpace: 'nowrap',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
};

interface DatePickerButtonProps {
  label: string;
  date: Dayjs | null;
  onDateChange: (newDate: Dayjs | null) => void;
}

export function DatePickerButton({ label, date, onDateChange }: DatePickerButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)} sx={styles.dateButton}>
        <Typography fontSize="medium">{label}</Typography>
        <Typography fontSize="small" color="silver">
          {date ? date.format('YYYY-MM-DD') : t('filterArea.when')}
        </Typography>
      </Button>
      <DatePicker
        open={isOpen}
        value={date}
        disablePast={true}
        onClose={() => setIsOpen(false)}
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
