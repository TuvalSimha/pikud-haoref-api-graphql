import { Alert, InputMaybe } from '../resolvers-types';

export function paginateAlerts(alerts: Alert[], first: InputMaybe<number> | undefined, after: InputMaybe<string> | undefined): Alert[] {
	if (!first) {
		return alerts;
	}
	const startIndex =
		after && typeof after !== 'undefined' && typeof after.valueOf() !== 'undefined'
			? alerts.findIndex((alert) => alert.id === after.valueOf()) + 1
			: 0;
	return alerts.slice(startIndex, startIndex + (first.valueOf() || 0));
}
