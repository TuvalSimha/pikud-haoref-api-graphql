import { alertsFromToday } from "./utils/alerts-from-today";
import {
  Alert,
  OrderBy,
  Resolvers,
  QueryAllAlertsFromTodayArgs,
  QueryAllAlertsByDateRangeArgs,
} from "../src/resolvers-types";
import { allAlertsFromLastWeek } from "./utils/all-alerts-from-last-week";
import { allAlertsFromLastMonth } from "./utils/all-alerts-from-last-month";
import { allAlertsByDateRange } from "./utils/all-alerts-by-dates-range";

export const resolvers: Resolvers = {
  Query: {
    allAlertsFromToday: async (_: any, args: QueryAllAlertsFromTodayArgs) => {
      const alerts = (await alertsFromToday()) as Alert[];
      if (!alerts) {
        return [];
      }
      if (args.orderBy === OrderBy.CreatedAtAsc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime(),
        );
        return sorted;
      }
      if (args.orderBy === OrderBy.CreatedAtDesc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime(),
        );
        return sorted;
      }

      return alerts;
    },

    allAlertsFromLastWeek: async (
      _: any,
      args: QueryAllAlertsFromTodayArgs,
    ) => {
      const alerts = (await allAlertsFromLastWeek()) as Alert[];
      if (!alerts) {
        return [];
      }
      if (args.orderBy === OrderBy.CreatedAtAsc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime(),
        );
        return sorted;
      }
      if (args.orderBy === OrderBy.CreatedAtDesc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime(),
        );
        return sorted;
      }

      return alerts;
    },

    allAlertsFromLastMonth: async (
      _: any,
      args: QueryAllAlertsFromTodayArgs,
    ) => {
      const alerts = (await allAlertsFromLastMonth()) as Alert[];
      if (!alerts) {
        return [];
      }
      if (args.orderBy === OrderBy.CreatedAtAsc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(a.alertDate).getTime() - new Date(b.alertDate).getTime(),
        );
        return sorted;
      }
      if (args.orderBy === OrderBy.CreatedAtDesc) {
        const sorted = alerts.sort(
          (a, b) =>
            new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime(),
        );
        return sorted;
      }

      return alerts;
    },

    allAlertsByDateRange: async (
      _: any,
      args: QueryAllAlertsByDateRangeArgs,
    ) => {
      console.log(args);
      const alerts = (await allAlertsByDateRange({
        from: args.dates.fromDateTime,
        to: args.dates.toDateTime,
      })) as Alert[];
      if (!alerts) {
        return [];
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
