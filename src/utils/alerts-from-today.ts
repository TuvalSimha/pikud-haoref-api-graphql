import { RawAlert } from '../types';
import { fetchAlerts } from './fetch-alerts';

export function alertsFromToday(): Promise<RawAlert[]> {
	return fetchAlerts(1);
}
