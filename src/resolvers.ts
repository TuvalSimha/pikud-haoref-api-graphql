import { alertsFromToday } from './utils/alerts-from-today';
import { allAlertsFromLastWeek } from './utils/all-alerts-from-last-week';
import { allAlertsFromLastMonth } from './utils/all-alerts-from-last-month';
import { allAlertsByDateRange } from './utils/all-alerts-by-dates-range';
import { Alert, OrderBy, Resolvers, QueryAllAlertsFromTodayArgs, QueryAllAlertsByDateRangeArgs, InputMaybe, AlertEdge, PageInfo, AlertConnection } from './resolvers-types';
import { v4 as uuidv4 } from 'uuid';

export const resolvers: Resolvers = {
	Query: {
		allAlertsFromToday: async (_: any, { orderBy, first, after }: QueryAllAlertsFromTodayArgs): Promise<AlertConnection> => {
			const alerts = await alertsFromToday() as Alert[];
			const sortedAlerts = sortAlerts(alerts, orderBy);
			const paginatedAlerts = paginateAlerts(sortedAlerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map(alert => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
			};

			return { edges, pageInfo };
		},

		allAlertsFromLastWeek: async (_: any, { orderBy, first, after }: QueryAllAlertsFromTodayArgs): Promise<AlertConnection> => {
			const alerts = await allAlertsFromLastWeek() as Alert[];
			const sortedAlerts = sortAlerts(alerts, orderBy);
			const paginatedAlerts = paginateAlerts(sortedAlerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map(alert => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
			};

			return { edges, pageInfo };
		},

		allAlertsFromLastMonth: async (_: any, { orderBy, first, after }: QueryAllAlertsFromTodayArgs): Promise<AlertConnection> => {
			const alerts = await allAlertsFromLastMonth() as Alert[];
			const sortedAlerts = sortAlerts(alerts, orderBy);
			const paginatedAlerts = paginateAlerts(sortedAlerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map(alert => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
			};

			return { edges, pageInfo };
		},

		allAlertsByDateRange: async (_: any, { dates, first, after }: QueryAllAlertsByDateRangeArgs): Promise<AlertConnection> => {
			const alerts = await allAlertsByDateRange({
				from: dates.fromDateTime,
				to: dates.toDateTime
			}) as Alert[];
			const paginatedAlerts = paginateAlerts(alerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map(alert => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
			};

			return { edges, pageInfo };
		},
	},
	Alert: {
		date: (alert: any) => alert.alertDate,
		title: (alert: any) => alert.title ?? alert.category_desc,
		location: (alert: any) => alert.data,
		category: (alert: any) => alert.category,
	},
};

function sortAlerts(alerts: Alert[], orderBy: OrderBy): Alert[] {
	if (orderBy === OrderBy.CreatedAtAsc) {
		return alerts.sort((a, b) => new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime());
	} else if (orderBy === OrderBy.CreatedAtDesc) {
		return alerts.sort((a, b) => new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime());
	} else {
		return alerts;
	}
}

function paginateAlerts(alerts: Alert[], first: InputMaybe<number> | undefined, after: InputMaybe<string> | undefined): Alert[] {
	if (!first) {
		return alerts;
	}
	const startIndex = after && typeof after !== 'undefined' && typeof after.valueOf() !== 'undefined' ? alerts.findIndex(alert => alert.id === after.valueOf()) + 1 : 0;
	return alerts.slice(startIndex, startIndex + (first.valueOf() || 0));
}



