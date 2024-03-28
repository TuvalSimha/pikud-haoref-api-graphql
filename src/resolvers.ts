import { alertsFromToday } from "./utils/alrets-from-today";
import {
  Alert,
  OrderBy,
  Resolvers,
  QueryAllAlertsFromTodayArgs,
} from "../src/resolvers-types";

export const resolvers: Resolvers = {
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
