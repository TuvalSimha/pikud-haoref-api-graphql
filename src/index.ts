import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers';

// Workers Env
export interface Env {}

// Create Yoga server with schema and resolvers
const yoga = createYoga<Env>({
	schema: createSchema({
		typeDefs: /* GraphQL */ `
			scalar DateTime

			type Query {
				allAlertsFromToday(orderBy: OrderBy!): [Alert!]!
				allAlertsFromLastWeek(orderBy: OrderBy!): [Alert!]!
				allAlertsFromLastMonth(orderBy: OrderBy!): [Alert!]!
				allAlertsByDateRange(dates: AlertsInput!): [Alert!]!
				alerts(alertsInput: AlertsInput): [Alert!]!
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
				allAlertsFromToday(orderBy: CREATED_AT_DESC) {
					category
					date
					location
					title
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
