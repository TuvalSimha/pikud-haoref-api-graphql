import { makeExecutableSchema } from "@graphql-tools/schema";
import { alertsFromToday } from "./utils/alrets-from-today";
import { readFileSync } from "node:fs";
import {
  Alert,
  OrderBy,
  Resolvers,
  QueryAllAlertsFromTodayArgs,
} from "./resolvers-types";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

const resolvers: Resolvers = {
  Query: {
    allAlertsFromToday: async (_: any, args: QueryAllAlertsFromTodayArgs) => {
      const alerts = (await alertsFromToday()) as Alert[];
      if (!alerts) {
        return [];
      }
      console.log("alerts", alerts);
      console.log("args", args.orderBy);
      if (args.orderBy === OrderBy.CreatedAtAsc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime()
        );
        return sorted;
      }
      if (args.orderBy === OrderBy.CreatedAtDesc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime()
        );
        return sorted;
      }

      return alerts;
    },
  },
  Alert: {
    date: (alert: any) => alert.alertDate,
    title: (alert: any) => alert.title ?? alert.category_desc,
    location: (alert: any) => alert.data,
    category: (alert: any) => alert.category,
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
