import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';

interface DateProps {
  defaultValue?: string;
  name?: string;
}

export default function DateField({ defaultValue = '', name, ...props }: DateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DatePicker
        {...props}
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        slotProps={{ textField: { name, required: true }, }}
      />
    </LocalizationProvider>
  )
}
