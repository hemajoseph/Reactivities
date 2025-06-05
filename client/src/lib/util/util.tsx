import {DateArg, format} from 'date-fns';
    
export function formatDate(date: DateArg<Date>) {
  if (!date) return '';
  return format(date, 'dd MMM yyyy h:mm a');

}