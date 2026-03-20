import { alertsFromToday } from './utils/alerts-from-today';
import { allAlertsFromLastWeek } from './utils/all-alerts-from-last-week';
import { allAlertsFromLastMonth } from './utils/all-alerts-from-last-month';
import { allAlertsByDateRange } from './utils/all-alerts-by-dates-range';
import { Resolvers, AlertCategory, AlertConnection } from './resolvers-types';
import { getCategoryFromType, getTypeFromCategoryId } from './helpers/get-category-from-type';

// Raw alert from the API
interface RawAlert {
	alertDate: string;
	title?: string;
	category_desc?: string;
	data: string;
	category: number;
}

// Filter alerts by category
function filterByCategory(alerts: RawAlert[], category: string | null | undefined): RawAlert[] {
	if (!category) return alerts;
	const categoryId = getCategoryFromType(category);
	if (categoryId === -1) return alerts;
	return alerts.filter((alert) => alert.category === categoryId);
}

// Filter alerts by location (partial match, case-insensitive)
function filterByLocation(alerts: RawAlert[], location: string | null | undefined): RawAlert[] {
	if (!location) return alerts;
	const searchTerm = location.toLowerCase();
	return alerts.filter((alert) => alert.data?.toLowerCase().includes(searchTerm));
}

// Sort alerts by date
function sortAlerts(alerts: RawAlert[], orderBy: string): RawAlert[] {
	if (orderBy === 'CREATED_AT_ASC') {
		return [...alerts].sort((a, b) => new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime());
	} else if (orderBy === 'CREATED_AT_DESC') {
		return [...alerts].sort((a, b) => new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime());
	}
	return alerts;
}

// Paginate alerts
function paginateAlerts(alerts: RawAlert[], first: number | null | undefined, after: string | null | undefined): RawAlert[] {
	if (!first) return alerts;

	// Find start index based on cursor
	let startIndex = 0;
	if (after) {
		const cursorIndex = parseInt(after.replace('cursor-', ''), 10);
		if (!isNaN(cursorIndex)) {
			startIndex = cursorIndex + 1;
		}
	}

	return alerts.slice(startIndex, startIndex + first);
}

// Build connection response with proper pagination
function buildConnection(
	rawAlerts: RawAlert[],
	first: number | null | undefined,
	after: string | null | undefined,
): AlertConnection {
	const totalCount = rawAlerts.length;
	const paginatedAlerts = paginateAlerts(rawAlerts, first, after);

	const startIndexInFull = after ? parseInt(after.replace('cursor-', ''), 10) + 1 : 0;

	const edges = paginatedAlerts.map((alert, index) => ({
		node: alert as any,
		cursor: `cursor-${startIndexInFull + index}`,
	}));

	const startCursor = edges.length > 0 ? edges[0].cursor : null;
	const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

	// Calculate pagination info
	const lastIndex = endCursor ? parseInt(endCursor.replace('cursor-', ''), 10) : -1;
	const hasNextPage = lastIndex >= 0 && lastIndex < totalCount - 1;
	const hasPreviousPage = startIndexInFull > 0;

	return {
		edges,
		pageInfo: {
			hasNextPage,
			hasPreviousPage,
			startCursor,
			endCursor,
		},
		totalCount,
	};
}

export const resolvers: Resolvers = {
	Query: {
		// New unified alerts query
		alerts: async (_, { filter, first, after }): Promise<AlertConnection> => {
			let alerts: RawAlert[] = [];

			// Determine which data source to use
			if (filter?.dateRange) {
				alerts = await allAlertsByDateRange({
					from: filter.dateRange.from,
					to: filter.dateRange.to,
				});
			} else if (filter?.timeRange === 'LAST_MONTH') {
				alerts = await allAlertsFromLastMonth();
			} else if (filter?.timeRange === 'LAST_WEEK') {
				alerts = await allAlertsFromLastWeek();
			} else if (filter?.timeRange === 'TODAY' || !filter?.timeRange) {
				// Default to today if no time range specified
				alerts = await alertsFromToday();
			}

			// Apply filters
			alerts = filterByCategory(alerts, filter?.category);
			alerts = filterByLocation(alerts, filter?.location);

			// Apply sorting (default to DESC)
			const orderBy = filter?.orderBy || 'CREATED_AT_DESC';
			const sortedAlerts = sortAlerts(alerts, orderBy);

			return buildConnection(sortedAlerts, first, after);
		},

		// Legacy queries (kept for backwards compatibility)
		allAlertsFromToday: async (_, { orderBy, typeBy, first, after }): Promise<AlertConnection> => {
			let alerts: RawAlert[] = await alertsFromToday();
			alerts = filterByCategory(alerts, typeBy);
			const sortedAlerts = sortAlerts(alerts, orderBy);
			return buildConnection(sortedAlerts, first, after);
		},

		allAlertsFromLastWeek: async (_, { orderBy, typeBy, first, after }): Promise<AlertConnection> => {
			let alerts: RawAlert[] = await allAlertsFromLastWeek();
			alerts = filterByCategory(alerts, typeBy);
			const sortedAlerts = sortAlerts(alerts, orderBy);
			return buildConnection(sortedAlerts, first, after);
		},

		allAlertsFromLastMonth: async (_, { orderBy, typeBy, first, after }): Promise<AlertConnection> => {
			let alerts: RawAlert[] = await allAlertsFromLastMonth();
			alerts = filterByCategory(alerts, typeBy);
			const sortedAlerts = sortAlerts(alerts, orderBy);
			return buildConnection(sortedAlerts, first, after);
		},

		allAlertsByDateRange: async (_, { dates, typeBy, first, after }): Promise<AlertConnection> => {
			let alerts: RawAlert[] = await allAlertsByDateRange({
				from: dates.fromDateTime,
				to: dates.toDateTime,
			});
			alerts = filterByCategory(alerts, typeBy);
			// Default sort for date range queries
			const sortedAlerts = sortAlerts(alerts, 'CREATED_AT_DESC');
			return buildConnection(sortedAlerts, first, after);
		},
	},

	Alert: {
		date: (alert: any) => alert.alertDate,
		title: (alert: any) => alert.title ?? alert.category_desc,
		location: (alert: any) => alert.data,
		category: (alert: any): AlertCategory => getTypeFromCategoryId(alert.category) as AlertCategory,
		categoryId: (alert: any) => alert.category,
	},
};
