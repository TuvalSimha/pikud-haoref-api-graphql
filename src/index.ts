import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { createInMemoryCache, useResponseCache } from '@graphql-yoga/plugin-response-cache';

export interface Env {}

const cache = createInMemoryCache()

const yoga = createYoga<Env>({
	graphqlEndpoint: '/graphql',
	schema: createSchema({
		typeDefs: /* GraphQL */ `
			scalar DateTime

			type Query {
				allAlertsFromToday(orderBy: OrderBy!, typeBy: TypeBy, first: Int, after: String): AlertConnection!
				allAlertsFromLastWeek(orderBy: OrderBy!, typeBy: TypeBy, first: Int, after: String): AlertConnection!
				allAlertsFromLastMonth(orderBy: OrderBy!, typeBy: TypeBy, first: Int, after: String): AlertConnection!
				allAlertsByDateRange(dates: AlertsInput!, typeBy: TypeBy, first: Int, after: String): AlertConnection!
			}

			type AlertConnection {
				edges: [AlertEdge!]!
				pageInfo: PageInfo!
			}

			type AlertEdge {
				node: Alert!
				cursor: String!
			}

			type PageInfo {
				hasNextPage: Boolean!
				endCursor: String
			}

			type Alert {
				date: String
				title: String
				location: String
				category: Int
			}

			enum OrderBy {
				CREATED_AT_DESC
				CREATED_AT_ASC
			}
			enum TypeBy {
				MISSILES
				UAV_INTRUSION
				EARTH_QUAKE
				RADIO_LOGICAL_EVENT
				TSUNAMI
				HAZARDOUS_MATERIALS
				TERRORIST_INFILTRATION
				DRILL_MISSILES
				DRILL_GENERAL
				DRILL_EARTH_QUAKE
				DRILL_RADIO_LOGICAL_EVENT
				DRILL_TSUNAMI
				DRILL_UAV_INTRUSION
				DRILL_HAZARDOUS_MATERIALS
				DRILL_TERRORIST_INFILTRATION
				UNKNOWN
			}

			input AlertsInput {
				fromDateTime: DateTime
				toDateTime: DateTime
			}
		`,
		resolvers: resolvers,
	}),
	graphiql: {
		defaultQuery: /* GraphQL */ `
			query AllAlertsFromToday {
				allAlertsFromToday(orderBy: CREATED_AT_DESC, first: 10) {
					edges {
						node {
							category
							date
							location
							title
						}
						cursor
					}
					pageInfo {
						hasNextPage
						endCursor
					}
				}
			}
		`,
	},
	plugins: [
		useResponseCache({
			session: () => null,
			cache,
			ttl: 2_000,
			ttlPerType: {
			  User: 500
			},
			ttlPerSchemaCoordinate: {
			  'Query.allAlertsFromToday': 10_000,
			  'Query.allAlertsFromLastWeek': 10_000,
			  'Query.allAlertsFromLastMonth': 10_000,
			  'Query.allAlertsByDateRange': 10_000,
			}
		  })
	  ],
});

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return yoga.fetch(request, env);
	},
};
