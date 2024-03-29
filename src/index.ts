import { createYoga, createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

const schema = createSchema({
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
  resolvers,
});

const yoga = createYoga({
  schema,
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


self.addEventListener("fetch", yoga);
