import { alertsFromToday } from './utils/alerts-from-today';
import { allAlertsFromLastWeek } from './utils/all-alerts-from-last-week';
import { allAlertsFromLastMonth } from './utils/all-alerts-from-last-month';
import { allAlertsByDateRange } from './utils/all-alerts-by-dates-range';
import {
	Alert,
	Resolvers,
	QueryAllAlertsFromTodayArgs,
	QueryAllAlertsByDateRangeArgs,
	AlertEdge,
	PageInfo,
	AlertConnection,
} from './resolvers-types';
import { v4 as uuidv4 } from 'uuid';
import { sortAlerts } from './helpers/sort-alerts';
import { paginateAlerts } from './helpers/paginate-alerts';
import { getCategoryFromType } from './helpers/get-category-from-type';

export const resolvers: Resolvers = {
	Query: {
		allAlertsFromToday: async (_: any, { orderBy, typeBy, first, after }: QueryAllAlertsFromTodayArgs): Promise<AlertConnection> => {
			let alerts = (await alertsFromToday()) as Alert[];

			// Filter alerts based on typeBy if provided
			if (typeBy) {
				alerts = alerts.filter((alert) => alert.category === getCategoryFromType(typeBy));
			}

			const sortedAlerts = sortAlerts(alerts, orderBy);
			const paginatedAlerts = paginateAlerts(sortedAlerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map((alert) => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
			};

			return { edges, pageInfo };
		},

		allAlertsFromLastWeek: async (_: any, { orderBy, first, after }: QueryAllAlertsFromTodayArgs): Promise<AlertConnection> => {
			const alerts = (await allAlertsFromLastWeek()) as Alert[];
			const sortedAlerts = sortAlerts(alerts, orderBy);
			const paginatedAlerts = paginateAlerts(sortedAlerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map((alert) => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
			};

			return { edges, pageInfo };
		},

		allAlertsFromLastMonth: async (_: any, { orderBy, first, after }: QueryAllAlertsFromTodayArgs): Promise<AlertConnection> => {
			const alerts = (await allAlertsFromLastMonth()) as Alert[];
			const sortedAlerts = sortAlerts(alerts, orderBy);
			const paginatedAlerts = paginateAlerts(sortedAlerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map((alert) => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
			};

			return { edges, pageInfo };
		},

		allAlertsByDateRange: async (_: any, { dates, first, after }: QueryAllAlertsByDateRangeArgs): Promise<AlertConnection> => {
			const alerts = (await allAlertsByDateRange({
				from: dates.fromDateTime,
				to: dates.toDateTime,
			})) as Alert[];
			const paginatedAlerts = paginateAlerts(alerts, first, after);

			const edges: AlertEdge[] = paginatedAlerts.map((alert) => ({ node: alert, cursor: uuidv4() }));
			const pageInfo: PageInfo = {
				hasNextPage: edges.length > 0,
				endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
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
