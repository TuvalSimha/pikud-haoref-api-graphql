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
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	DateTime: { input: any; output: any };
};

export type Alert = {
	id: string;
	alertDate: string | number | Date;
	__typename?: 'Alert';
	category?: Maybe<Scalars['Int']['output']>;
	date?: Maybe<Scalars['String']['output']>;
	location?: Maybe<Scalars['String']['output']>;
	title?: Maybe<Scalars['String']['output']>;
};

export type AlertConnection = {
	__typename?: 'AlertConnection';
	edges: Array<AlertEdge>;
	pageInfo: PageInfo;
};

export type AlertEdge = {
	__typename?: 'AlertEdge';
	cursor: Scalars['String']['output'];
	node: Alert;
};

export type AlertsInput = {
	fromDateTime?: InputMaybe<Scalars['DateTime']['input']>;
	toDateTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum OrderBy {
	CreatedAtAsc = 'CREATED_AT_ASC',
	CreatedAtDesc = 'CREATED_AT_DESC',
}

export type PageInfo = {
	__typename?: 'PageInfo';
	endCursor?: Maybe<Scalars['String']['output']>;
	hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
	__typename?: 'Query';
	allAlertsByDateRange: AlertConnection;
	allAlertsFromLastMonth: AlertConnection;
	allAlertsFromLastWeek: AlertConnection;
	allAlertsFromToday: AlertConnection;
};

export type QueryAllAlertsByDateRangeArgs = {
	after?: InputMaybe<Scalars['String']['input']>;
	dates: AlertsInput;
	first?: InputMaybe<Scalars['Int']['input']>;
	typeBy?: InputMaybe<TypeBy>;
};

export type QueryAllAlertsFromLastMonthArgs = {
	after?: InputMaybe<Scalars['String']['input']>;
	first?: InputMaybe<Scalars['Int']['input']>;
	orderBy: OrderBy;
	typeBy?: InputMaybe<TypeBy>;
};

export type QueryAllAlertsFromLastWeekArgs = {
	after?: InputMaybe<Scalars['String']['input']>;
	first?: InputMaybe<Scalars['Int']['input']>;
	orderBy: OrderBy;
	typeBy?: InputMaybe<TypeBy>;
};

export type QueryAllAlertsFromTodayArgs = {
	after?: InputMaybe<Scalars['String']['input']>;
	first?: InputMaybe<Scalars['Int']['input']>;
	orderBy: OrderBy;
	typeBy?: InputMaybe<TypeBy>;
};

export enum TypeBy {
	DrillEarthQuake = 'DRILL_EARTH_QUAKE',
	DrillGeneral = 'DRILL_GENERAL',
	DrillHazardousMaterials = 'DRILL_HAZARDOUS_MATERIALS',
	DrillMissiles = 'DRILL_MISSILES',
	DrillRadioLogicalEvent = 'DRILL_RADIO_LOGICAL_EVENT',
	DrillTerroristInfiltration = 'DRILL_TERRORIST_INFILTRATION',
	DrillTsunami = 'DRILL_TSUNAMI',
	DrillUavIntrusion = 'DRILL_UAV_INTRUSION',
	EarthQuake = 'EARTH_QUAKE',
	HazardousMaterials = 'HAZARDOUS_MATERIALS',
	Missiles = 'MISSILES',
	RadioLogicalEvent = 'RADIO_LOGICAL_EVENT',
	TerroristInfiltration = 'TERRORIST_INFILTRATION',
	Tsunami = 'TSUNAMI',
	UavIntrusion = 'UAV_INTRUSION',
	Unknown = 'UNKNOWN',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Alert: ResolverTypeWrapper<Alert>;
	AlertConnection: ResolverTypeWrapper<AlertConnection>;
	AlertEdge: ResolverTypeWrapper<AlertEdge>;
	AlertsInput: AlertsInput;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
	DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
	Int: ResolverTypeWrapper<Scalars['Int']['output']>;
	OrderBy: OrderBy;
	PageInfo: ResolverTypeWrapper<PageInfo>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']['output']>;
	TypeBy: TypeBy;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Alert: Alert;
	AlertConnection: AlertConnection;
	AlertEdge: AlertEdge;
	AlertsInput: AlertsInput;
	Boolean: Scalars['Boolean']['output'];
	DateTime: Scalars['DateTime']['output'];
	Int: Scalars['Int']['output'];
	PageInfo: PageInfo;
	Query: {};
	String: Scalars['String']['output'];
};

export type AlertResolvers<ContextType = any, ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']> = {
	category?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AlertConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['AlertConnection'] = ResolversParentTypes['AlertConnection'],
> = {
	edges?: Resolver<Array<ResolversTypes['AlertEdge']>, ParentType, ContextType>;
	pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AlertEdgeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['AlertEdge'] = ResolversParentTypes['AlertEdge'],
> = {
	cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	node?: Resolver<ResolversTypes['Alert'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
	name: 'DateTime';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
	endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
	allAlertsByDateRange?: Resolver<
		ResolversTypes['AlertConnection'],
		ParentType,
		ContextType,
		RequireFields<QueryAllAlertsByDateRangeArgs, 'dates'>
	>;
	allAlertsFromLastMonth?: Resolver<
		ResolversTypes['AlertConnection'],
		ParentType,
		ContextType,
		RequireFields<QueryAllAlertsFromLastMonthArgs, 'orderBy'>
	>;
	allAlertsFromLastWeek?: Resolver<
		ResolversTypes['AlertConnection'],
		ParentType,
		ContextType,
		RequireFields<QueryAllAlertsFromLastWeekArgs, 'orderBy'>
	>;
	allAlertsFromToday?: Resolver<
		ResolversTypes['AlertConnection'],
		ParentType,
		ContextType,
		RequireFields<QueryAllAlertsFromTodayArgs, 'orderBy'>
	>;
};

export type Resolvers<ContextType = any> = {
	Alert?: AlertResolvers<ContextType>;
	AlertConnection?: AlertConnectionResolvers<ContextType>;
	AlertEdge?: AlertEdgeResolvers<ContextType>;
	DateTime?: GraphQLScalarType;
	PageInfo?: PageInfoResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
};
