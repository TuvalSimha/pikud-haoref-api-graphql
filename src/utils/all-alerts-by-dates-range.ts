import { RawAlert } from '../types';
import { formatDate } from '../helpers/format-date';
import { fetchAlertsByDateRange } from './fetch-alerts';

interface DateRangeProps {
	from: string;
	to: string;
}

export function allAlertsByDateRange({ from, to }: DateRangeProps): Promise<RawAlert[]> {
	return fetchAlertsByDateRange(formatDate(from), formatDate(to));
}
