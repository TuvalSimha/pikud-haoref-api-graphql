import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { createInMemoryCache, useResponseCache } from '@graphql-yoga/plugin-response-cache';
import { createStellatePlugin, StellateEnv } from '../stellate';

export interface Env extends StellateEnv {}

const cache = createInMemoryCache();

const typeDefs = /* GraphQL */ `
	scalar DateTime

	type Query {
		"""
		Fetch alerts with flexible filtering options.
		Use timeRange for predefined ranges (TODAY, LAST_WEEK, LAST_MONTH)
		or dateRange for custom date ranges (format: DD/MM/YYYY).
		"""
		alerts(filter: AlertFilter, first: Int, after: String): AlertConnection!

		# Legacy queries (still supported)
		allAlertsFromToday(orderBy: OrderBy!, typeBy: AlertCategory, first: Int, after: String): AlertConnection!
			@deprecated(reason: "Use alerts(filter: { timeRange: TODAY }) instead")
		allAlertsFromLastWeek(orderBy: OrderBy!, typeBy: AlertCategory, first: Int, after: String): AlertConnection!
			@deprecated(reason: "Use alerts(filter: { timeRange: LAST_WEEK }) instead")
		allAlertsFromLastMonth(orderBy: OrderBy!, typeBy: AlertCategory, first: Int, after: String): AlertConnection!
			@deprecated(reason: "Use alerts(filter: { timeRange: LAST_MONTH }) instead")
		allAlertsByDateRange(dates: AlertsInput!, typeBy: AlertCategory, first: Int, after: String): AlertConnection!
			@deprecated(reason: "Use alerts(filter: { dateRange: {...} }) instead")
	}

	"""
	Main filter input for querying alerts.
	All filters are optional and can be combined.
	"""
	input AlertFilter {
		"Predefined time ranges. Use this OR dateRange, not both."
		timeRange: TimeRange

		"Custom date range (format: DD/MM/YYYY). Use this OR timeRange, not both."
		dateRange: DateRangeInput

		"Filter by alert category/type."
		category: AlertCategory

		"Filter by location name (partial match, case-insensitive)."
		location: String

		"Sort order for results."
		orderBy: OrderBy
	}

	"""
	Custom date range for filtering alerts.
	Both dates should be in DD/MM/YYYY format.
	"""
	input DateRangeInput {
		"Start date (inclusive). Format: DD/MM/YYYY"
		from: String!

		"End date (inclusive). Format: DD/MM/YYYY"
		to: String!
	}

	type AlertConnection {
		edges: [AlertEdge!]!
		pageInfo: PageInfo!
		"Total number of alerts matching the filter (before pagination)."
		totalCount: Int!
	}

	type AlertEdge {
		node: Alert!
		cursor: String!
	}

	type PageInfo {
		hasNextPage: Boolean!
		hasPreviousPage: Boolean!
		startCursor: String
		endCursor: String
	}

	type Alert {
		"Alert timestamp."
		date: String

		"Alert title/description."
		title: String

		"Location/city name where the alert was triggered."
		location: String

		"Alert category as enum for easy filtering and display."
		category: AlertCategory

		"Raw category ID from the API (for debugging)."
		categoryId: Int
	}

	"Predefined time ranges for quick filtering."
	enum TimeRange {
		"Alerts from today only."
		TODAY

		"Alerts from the last 7 days."
		LAST_WEEK

		"Alerts from the last 30 days."
		LAST_MONTH
	}

	"Sort order for alerts."
	enum OrderBy {
		"Newest alerts first (default)."
		CREATED_AT_DESC

		"Oldest alerts first."
		CREATED_AT_ASC
	}

	"Alert categories/types. Each category represents a different type of emergency."
	enum AlertCategory {
		"Missile and rocket alerts."
		MISSILES

		"Unmanned aerial vehicle (drone) intrusion."
		UAV_INTRUSION

		"Earthquake warning."
		EARTHQUAKE

		"Radiological event warning."
		RADIOLOGICAL_EVENT

		"Tsunami warning."
		TSUNAMI

		"Hazardous materials incident."
		HAZARDOUS_MATERIALS

		"Terrorist infiltration alert."
		TERRORIST_INFILTRATION

		DRILL_MISSILES
		DRILL_GENERAL
		DRILL_EARTHQUAKE
		DRILL_RADIOLOGICAL_EVENT
		DRILL_TSUNAMI
		DRILL_UAV_INTRUSION
		DRILL_HAZARDOUS_MATERIALS
		DRILL_TERRORIST_INFILTRATION

		"Unknown or unrecognized category."
		UNKNOWN
	}

	# Legacy input (for deprecated queries)
	input AlertsInput {
		fromDateTime: DateTime
		toDateTime: DateTime
	}
`;

const schema = createSchema({
	typeDefs,
	resolvers: resolvers,
});

// Cache yoga instances per env configuration
let yogaInstance: ReturnType<typeof createYoga<Env>> | null = null;

function getYoga(env: Env) {
	// For local dev without Stellate, return a simple yoga instance
	if (!env.STELLATE_TOKEN) {
		if (!yogaInstance) {
			yogaInstance = createYoga<Env>({
				graphqlEndpoint: '/graphql',
				schema,
				graphiql: {
					defaultQuery: defaultQuery,
				},
				plugins: [
					useResponseCache({
						session: () => null,
						cache,
						ttl: 2_000,
						ttlPerSchemaCoordinate: {
							'Query.alerts': 10_000,
							'Query.allAlertsFromToday': 10_000,
							'Query.allAlertsFromLastWeek': 10_000,
							'Query.allAlertsFromLastMonth': 10_000,
							'Query.allAlertsByDateRange': 10_000,
						},
					}),
				],
			});
		}
		return yogaInstance;
	}

	// With Stellate enabled
	return createYoga<Env>({
		graphqlEndpoint: '/graphql',
		schema,
		graphiql: {
			defaultQuery: defaultQuery,
		},
		plugins: [
			createStellatePlugin(env),
			useResponseCache({
				session: () => null,
				cache,
				ttl: 2_000,
				ttlPerSchemaCoordinate: {
					'Query.alerts': 10_000,
					'Query.allAlertsFromToday': 10_000,
					'Query.allAlertsFromLastWeek': 10_000,
					'Query.allAlertsFromLastMonth': 10_000,
					'Query.allAlertsByDateRange': 10_000,
				},
			}),
		],
	});
}

const defaultQuery = /* GraphQL */ `
	# New unified query with filters
	query GetAlerts {
		alerts(
			filter: {
				timeRange: TODAY
				category: MISSILES
				orderBy: CREATED_AT_DESC
			}
			first: 10
		) {
			totalCount
			edges {
				node {
					date
					title
					location
					category
					categoryId
				}
				cursor
			}
			pageInfo {
				hasNextPage
				hasPreviousPage
				endCursor
			}
		}
	}
`;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const yoga = getYoga(env);
		return yoga.fetch(request, env);
	},
};
