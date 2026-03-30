import { RawAlert } from '../types';
import { fetchAlerts } from './fetch-alerts';

export function allAlertsFromLastWeek(): Promise<RawAlert[]> {
	return fetchAlerts(2);
}
