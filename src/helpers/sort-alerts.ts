import { Alert, OrderBy } from '../resolvers-types';

export function sortAlerts(alerts: Alert[], orderBy: OrderBy): Alert[] {
	if (orderBy === OrderBy.CreatedAtAsc) {
		return alerts.sort((a, b) => new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime());
	} else if (orderBy === OrderBy.CreatedAtDesc) {
		return alerts.sort((a, b) => new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime());
	} else {
		return alerts;
	}
}
