// index.ts
import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers';

// Workers Env
export interface Env { }

// Create Yoga server with schema and resolvers
const yoga = createYoga<Env>({
	schema: createSchema({
		typeDefs: /* GraphQL */ `
            scalar DateTime

            type Query {
                allAlertsFromToday(orderBy: OrderBy!, first: Int, after: String): AlertConnection!
                allAlertsFromLastWeek(orderBy: OrderBy!, first: Int, after: String): AlertConnection!
                allAlertsFromLastMonth(orderBy: OrderBy!, first: Int, after: String): AlertConnection!
                allAlertsByDateRange(dates: AlertsInput!, first: Int, after: String): AlertConnection!
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
});

// Fetch handler
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return yoga.fetch(request, env);
	},
};
