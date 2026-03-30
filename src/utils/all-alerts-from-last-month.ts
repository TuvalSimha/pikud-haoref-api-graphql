import { RawAlert } from '../types';
import { fetchAlerts } from './fetch-alerts';

export function allAlertsFromLastMonth(): Promise<RawAlert[]> {
	return fetchAlerts(3);
}
