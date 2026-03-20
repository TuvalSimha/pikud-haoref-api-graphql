import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Alert = {
  __typename?: 'Alert';
  /** Alert category as enum for easy filtering and display. */
  category?: Maybe<AlertCategory>;
  /** Raw category ID from the API (for debugging). */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** Alert timestamp in ISO format. */
  date?: Maybe<Scalars['String']['output']>;
  /** Location/city name where the alert was triggered. */
  location?: Maybe<Scalars['String']['output']>;
  /** Alert title/description (e.g., "ירי רקטות וטילים"). */
  title?: Maybe<Scalars['String']['output']>;
};

/** Alert categories/types. Each category represents a different type of emergency. */
export enum AlertCategory {
  DrillEarthquake = 'DRILL_EARTHQUAKE',
  DrillGeneral = 'DRILL_GENERAL',
  DrillHazardousMaterials = 'DRILL_HAZARDOUS_MATERIALS',
  DrillMissiles = 'DRILL_MISSILES',
  DrillRadiologicalEvent = 'DRILL_RADIOLOGICAL_EVENT',
  DrillTerroristInfiltration = 'DRILL_TERRORIST_INFILTRATION',
  DrillTsunami = 'DRILL_TSUNAMI',
  DrillUavIntrusion = 'DRILL_UAV_INTRUSION',
  /** Earthquake warning. */
  Earthquake = 'EARTHQUAKE',
  /** Hazardous materials incident. */
  HazardousMaterials = 'HAZARDOUS_MATERIALS',
  /** Missile and rocket alerts (צבע אדום). */
  Missiles = 'MISSILES',
  /** Radiological event warning. */
  RadiologicalEvent = 'RADIOLOGICAL_EVENT',
  /** Terrorist infiltration alert. */
  TerroristInfiltration = 'TERRORIST_INFILTRATION',
  /** Tsunami warning. */
  Tsunami = 'TSUNAMI',
  /** Unmanned aerial vehicle (drone) intrusion. */
  UavIntrusion = 'UAV_INTRUSION',
  /** Unknown or unrecognized category. */
  Unknown = 'UNKNOWN'
}

export type AlertConnection = {
  __typename?: 'AlertConnection';
  edges: Array<AlertEdge>;
  pageInfo: PageInfo;
  /** Total number of alerts matching the filter (before pagination). */
  totalCount: Scalars['Int']['output'];
};

export type AlertEdge = {
  __typename?: 'AlertEdge';
  cursor: Scalars['String']['output'];
  node: Alert;
};

/**
 * Main filter input for querying alerts.
 * All filters are optional and can be combined.
 */
export type AlertFilter = {
  /** Filter by alert category/type. */
  category?: InputMaybe<AlertCategory>;
  /** Custom date range (format: DD/MM/YYYY). Use this OR timeRange, not both. */
  dateRange?: InputMaybe<DateRangeInput>;
  /**
   * Filter by location name (partial match, case-insensitive).
   * Example: "תל אביב" or "חיפה"
   */
  location?: InputMaybe<Scalars['String']['input']>;
  /** Sort order for results. */
  orderBy?: InputMaybe<OrderBy>;
  /** Predefined time ranges. Use this OR dateRange, not both. */
  timeRange?: InputMaybe<TimeRange>;
};

export type AlertsInput = {
  fromDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  toDateTime?: InputMaybe<Scalars['DateTime']['input']>;
};

/**
 * Custom date range for filtering alerts.
 * Both dates should be in DD/MM/YYYY format.
 */
export type DateRangeInput = {
  /** Start date (inclusive). Format: DD/MM/YYYY */
  from: Scalars['String']['input'];
  /** End date (inclusive). Format: DD/MM/YYYY */
  to: Scalars['String']['input'];
};

/** Sort order for alerts. */
export enum OrderBy {
  /** Oldest alerts first. */
  CreatedAtAsc = 'CREATED_AT_ASC',
  /** Newest alerts first (default). */
  CreatedAtDesc = 'CREATED_AT_DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Fetch alerts with flexible filtering options.
   * Use `timeRange` for predefined ranges (TODAY, LAST_WEEK, LAST_MONTH)
   * or `dateRange` for custom date ranges (format: DD/MM/YYYY).
   */
  alerts: AlertConnection;
  /** @deprecated Use `alerts(filter: { dateRange: {...} })` instead */
  allAlertsByDateRange: AlertConnection;
  /** @deprecated Use `alerts(filter: { timeRange: LAST_MONTH })` instead */
  allAlertsFromLastMonth: AlertConnection;
  /** @deprecated Use `alerts(filter: { timeRange: LAST_WEEK })` instead */
  allAlertsFromLastWeek: AlertConnection;
  /** @deprecated Use `alerts(filter: { timeRange: TODAY })` instead */
  allAlertsFromToday: AlertConnection;
};


export type QueryAlertsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AlertFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllAlertsByDateRangeArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  dates: AlertsInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  typeBy?: InputMaybe<AlertCategory>;
};


export type QueryAllAlertsFromLastMonthArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: OrderBy;
  typeBy?: InputMaybe<AlertCategory>;
};


export type QueryAllAlertsFromLastWeekArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: OrderBy;
  typeBy?: InputMaybe<AlertCategory>;
};


export type QueryAllAlertsFromTodayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: OrderBy;
  typeBy?: InputMaybe<AlertCategory>;
};

/** Predefined time ranges for quick filtering. */
export enum TimeRange {
  /** Alerts from the last 30 days. */
  LastMonth = 'LAST_MONTH',
  /** Alerts from the last 7 days. */
  LastWeek = 'LAST_WEEK',
  /** Alerts from today only. */
  Today = 'TODAY'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Alert: ResolverTypeWrapper<Alert>;
  AlertCategory: AlertCategory;
  AlertConnection: ResolverTypeWrapper<AlertConnection>;
  AlertEdge: ResolverTypeWrapper<AlertEdge>;
  AlertFilter: AlertFilter;
  AlertsInput: AlertsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateRangeInput: DateRangeInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  OrderBy: OrderBy;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TimeRange: TimeRange;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Alert: Alert;
  AlertConnection: AlertConnection;
  AlertEdge: AlertEdge;
  AlertFilter: AlertFilter;
  AlertsInput: AlertsInput;
  Boolean: Scalars['Boolean']['output'];
  DateRangeInput: DateRangeInput;
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  PageInfo: PageInfo;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type AlertResolvers<ContextType = any, ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']> = {
  category?: Resolver<Maybe<ResolversTypes['AlertCategory']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AlertConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AlertConnection'] = ResolversParentTypes['AlertConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AlertEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type AlertEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AlertEdge'] = ResolversParentTypes['AlertEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Alert'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  alerts?: Resolver<ResolversTypes['AlertConnection'], ParentType, ContextType, Partial<QueryAlertsArgs>>;
  allAlertsByDateRange?: Resolver<ResolversTypes['AlertConnection'], ParentType, ContextType, RequireFields<QueryAllAlertsByDateRangeArgs, 'dates'>>;
  allAlertsFromLastMonth?: Resolver<ResolversTypes['AlertConnection'], ParentType, ContextType, RequireFields<QueryAllAlertsFromLastMonthArgs, 'orderBy'>>;
  allAlertsFromLastWeek?: Resolver<ResolversTypes['AlertConnection'], ParentType, ContextType, RequireFields<QueryAllAlertsFromLastWeekArgs, 'orderBy'>>;
  allAlertsFromToday?: Resolver<ResolversTypes['AlertConnection'], ParentType, ContextType, RequireFields<QueryAllAlertsFromTodayArgs, 'orderBy'>>;
};

export type Resolvers<ContextType = any> = {
  Alert?: AlertResolvers<ContextType>;
  AlertConnection?: AlertConnectionResolvers<ContextType>;
  AlertEdge?: AlertEdgeResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

