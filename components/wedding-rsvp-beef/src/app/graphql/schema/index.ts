/* eslint-disable */
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
  JSON: { input: any; output: any; }
};

export type GqlAccommodatedGuest = {
  __typename?: 'AccommodatedGuest';
  accommodationId: Scalars['Int']['output'];
  checkInDate: Scalars['String']['output'];
  checkOutDate: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type GqlAccommodation = {
  __typename?: 'Accommodation';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  numGuests: Scalars['Int']['output'];
  numRooms: Scalars['Int']['output'];
};

export type GqlAccommodationGuestStayDetails = {
  __typename?: 'AccommodationGuestStayDetails';
  address: Scalars['String']['output'];
  checkInDate: Scalars['String']['output'];
  checkOutDate: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GqlAddAccommodatedGuestInput = {
  accommodationId: Scalars['Int']['input'];
  checkInDate: Scalars['String']['input'];
  checkOutDate: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type GqlAddAccommodationInput = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numGuests: Scalars['Int']['input'];
  numRooms: Scalars['Int']['input'];
};

export type GqlAddAdminInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GqlAddUserInput = {
  code: Scalars['String']['input'];
  dietaryRestrictions: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  numPlusOnes: Scalars['Int']['input'];
  plusOneOf: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  welcomeMessage: InputMaybe<Scalars['String']['input']>;
};

export type GqlAdmin = {
  __typename?: 'Admin';
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export enum GqlGuestType {
  guest = 'guest',
  plus_one = 'plus_one'
}

export type GqlListUsersFilter = {
  firstName: InputMaybe<Scalars['String']['input']>;
  lastName: InputMaybe<Scalars['String']['input']>;
};

export type GqlMutation = {
  __typename?: 'Mutation';
  addAccommodatedGuest: Scalars['Boolean']['output'];
  addAccommodation: Scalars['Boolean']['output'];
  addAdmin: Scalars['Boolean']['output'];
  addUser: Scalars['Boolean']['output'];
  deleteAccommodatedGuest: Scalars['Boolean']['output'];
  deleteAccommodation: Scalars['Boolean']['output'];
  deleteAdmin: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  updateAccommodatedGuest: Scalars['Boolean']['output'];
  updateAccommodation: Scalars['Boolean']['output'];
  updateAdmin: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
};


export type GqlMutationAddAccommodatedGuestArgs = {
  attrs: GqlAddAccommodatedGuestInput;
};


export type GqlMutationAddAccommodationArgs = {
  attrs: GqlAddAccommodationInput;
};


export type GqlMutationAddAdminArgs = {
  attrs: GqlAddAdminInput;
};


export type GqlMutationAddUserArgs = {
  attrs: GqlAddUserInput;
};


export type GqlMutationDeleteAccommodatedGuestArgs = {
  accommodationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type GqlMutationDeleteAccommodationArgs = {
  id: Scalars['Int']['input'];
};


export type GqlMutationDeleteAdminArgs = {
  id: Scalars['Int']['input'];
};


export type GqlMutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type GqlMutationUpdateAccommodatedGuestArgs = {
  attrs: GqlUpdateAccommodatedGuestInput;
};


export type GqlMutationUpdateAccommodationArgs = {
  attrs: GqlUpdateAccommodationInput;
  id: Scalars['Int']['input'];
};


export type GqlMutationUpdateAdminArgs = {
  attrs: GqlUpdateAdminInput;
  id: Scalars['Int']['input'];
};


export type GqlMutationUpdateUserArgs = {
  attrs: GqlUpdateUserInput;
  id: Scalars['Int']['input'];
};

export type GqlPagination = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type GqlPlusOne = {
  __typename?: 'PlusOne';
  id: Scalars['Int']['output'];
  plusOneOf: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type GqlQuery = {
  __typename?: 'Query';
  accommodatedGuest: GqlAccommodatedGuest;
  accommodatedGuests: Array<GqlAccommodatedGuest>;
  accommodation: GqlAccommodation;
  accommodations: Array<GqlAccommodation>;
  admin: GqlAdmin;
  adminLogin: GqlAdmin;
  admins: Array<GqlAdmin>;
  plusOne: GqlPlusOne;
  user: GqlUser;
  userPlusOnes: Array<GqlUser>;
  users?: Maybe<GqlUserList>;
};


export type GqlQueryAccommodatedGuestArgs = {
  accommodationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type GqlQueryAccommodatedGuestsArgs = {
  accommodationId: Scalars['Int']['input'];
};


export type GqlQueryAccommodationArgs = {
  id: Scalars['Int']['input'];
};


export type GqlQueryAdminArgs = {
  username: Scalars['String']['input'];
};


export type GqlQueryAdminLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type GqlQueryPlusOneArgs = {
  userId: Scalars['Int']['input'];
};


export type GqlQueryUserArgs = {
  code: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type GqlQueryUserPlusOnesArgs = {
  code: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type GqlQueryUsersArgs = {
  filter: InputMaybe<GqlListUsersFilter>;
  pagination: GqlPagination;
};

export type GqlUpdateAccommodatedGuestInput = {
  accommodationId: Scalars['Int']['input'];
  checkInDate: InputMaybe<Scalars['String']['input']>;
  checkOutDate: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type GqlUpdateAccommodationInput = {
  address: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  numGuests: InputMaybe<Scalars['Int']['input']>;
  numRooms: InputMaybe<Scalars['Int']['input']>;
};

export type GqlUpdateAdminInput = {
  firstName: InputMaybe<Scalars['String']['input']>;
  lastName: InputMaybe<Scalars['String']['input']>;
  password: InputMaybe<Scalars['String']['input']>;
  username: InputMaybe<Scalars['String']['input']>;
};

export type GqlUpdateUserInput = {
  code: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions: InputMaybe<Scalars['String']['input']>;
  firstName: InputMaybe<Scalars['String']['input']>;
  lastName: InputMaybe<Scalars['String']['input']>;
  numPlusOnes: InputMaybe<Scalars['Int']['input']>;
  rsvp: InputMaybe<Scalars['Boolean']['input']>;
  welcomeMessage: InputMaybe<Scalars['String']['input']>;
};

export type GqlUser = {
  __typename?: 'User';
  code: Scalars['String']['output'];
  dietaryRestrictions?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  numPlusOnes: Scalars['Int']['output'];
  plusOneOf?: Maybe<Scalars['Int']['output']>;
  rsvp?: Maybe<Scalars['Boolean']['output']>;
  stayingAt?: Maybe<GqlAccommodationGuestStayDetails>;
  type: Scalars['String']['output'];
  welcomeMessage?: Maybe<Scalars['String']['output']>;
};

export type GqlUserList = {
  __typename?: 'UserList';
  items?: Maybe<Array<Maybe<GqlUser>>>;
  pages: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
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
  info?: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info?: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = {
  AccommodatedGuest: ResolverTypeWrapper<GqlAccommodatedGuest>;
  Accommodation: ResolverTypeWrapper<GqlAccommodation>;
  AccommodationGuestStayDetails: ResolverTypeWrapper<GqlAccommodationGuestStayDetails>;
  AddAccommodatedGuestInput: GqlAddAccommodatedGuestInput;
  AddAccommodationInput: GqlAddAccommodationInput;
  AddAdminInput: GqlAddAdminInput;
  AddUserInput: GqlAddUserInput;
  Admin: ResolverTypeWrapper<GqlAdmin>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  GuestType: GqlGuestType;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  ListUsersFilter: GqlListUsersFilter;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: GqlPagination;
  PlusOne: ResolverTypeWrapper<GqlPlusOne>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateAccommodatedGuestInput: GqlUpdateAccommodatedGuestInput;
  UpdateAccommodationInput: GqlUpdateAccommodationInput;
  UpdateAdminInput: GqlUpdateAdminInput;
  UpdateUserInput: GqlUpdateUserInput;
  User: ResolverTypeWrapper<GqlUser>;
  UserList: ResolverTypeWrapper<GqlUserList>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = {
  AccommodatedGuest: GqlAccommodatedGuest;
  Accommodation: GqlAccommodation;
  AccommodationGuestStayDetails: GqlAccommodationGuestStayDetails;
  AddAccommodatedGuestInput: GqlAddAccommodatedGuestInput;
  AddAccommodationInput: GqlAddAccommodationInput;
  AddAdminInput: GqlAddAdminInput;
  AddUserInput: GqlAddUserInput;
  Admin: GqlAdmin;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  ListUsersFilter: GqlListUsersFilter;
  Mutation: {};
  Pagination: GqlPagination;
  PlusOne: GqlPlusOne;
  Query: {};
  String: Scalars['String']['output'];
  UpdateAccommodatedGuestInput: GqlUpdateAccommodatedGuestInput;
  UpdateAccommodationInput: GqlUpdateAccommodationInput;
  UpdateAdminInput: GqlUpdateAdminInput;
  UpdateUserInput: GqlUpdateUserInput;
  User: GqlUser;
  UserList: GqlUserList;
};

export type GqlAccommodatedGuestResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['AccommodatedGuest'] = GqlResolversParentTypes['AccommodatedGuest']> = {
  accommodationId: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  checkInDate: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  checkOutDate: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  firstName: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  lastName: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  userId: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlAccommodationResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Accommodation'] = GqlResolversParentTypes['Accommodation']> = {
  address: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  numGuests: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  numRooms: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlAccommodationGuestStayDetailsResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['AccommodationGuestStayDetails'] = GqlResolversParentTypes['AccommodationGuestStayDetails']> = {
  address: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  checkInDate: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  checkOutDate: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlAdminResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Admin'] = GqlResolversParentTypes['Admin']> = {
  firstName: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  lastName: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  username: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GqlJsonScalarConfig extends GraphQLScalarTypeConfig<GqlResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type GqlMutationResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Mutation'] = GqlResolversParentTypes['Mutation']> = {
  addAccommodatedGuest: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationAddAccommodatedGuestArgs, 'attrs'>>;
  addAccommodation: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationAddAccommodationArgs, 'attrs'>>;
  addAdmin: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationAddAdminArgs, 'attrs'>>;
  addUser: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationAddUserArgs, 'attrs'>>;
  deleteAccommodatedGuest: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationDeleteAccommodatedGuestArgs, 'accommodationId' | 'userId'>>;
  deleteAccommodation: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationDeleteAccommodationArgs, 'id'>>;
  deleteAdmin: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationDeleteAdminArgs, 'id'>>;
  deleteUser: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationDeleteUserArgs, 'id'>>;
  updateAccommodatedGuest: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationUpdateAccommodatedGuestArgs, 'attrs'>>;
  updateAccommodation: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationUpdateAccommodationArgs, 'attrs' | 'id'>>;
  updateAdmin: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationUpdateAdminArgs, 'attrs' | 'id'>>;
  updateUser: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationUpdateUserArgs, 'attrs' | 'id'>>;
};

export type GqlPlusOneResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['PlusOne'] = GqlResolversParentTypes['PlusOne']> = {
  id: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  plusOneOf: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  userId: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlQueryResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Query'] = GqlResolversParentTypes['Query']> = {
  accommodatedGuest: Resolver<GqlResolversTypes['AccommodatedGuest'], ParentType, ContextType, RequireFields<GqlQueryAccommodatedGuestArgs, 'accommodationId' | 'userId'>>;
  accommodatedGuests: Resolver<Array<GqlResolversTypes['AccommodatedGuest']>, ParentType, ContextType, RequireFields<GqlQueryAccommodatedGuestsArgs, 'accommodationId'>>;
  accommodation: Resolver<GqlResolversTypes['Accommodation'], ParentType, ContextType, RequireFields<GqlQueryAccommodationArgs, 'id'>>;
  accommodations: Resolver<Array<GqlResolversTypes['Accommodation']>, ParentType, ContextType>;
  admin: Resolver<GqlResolversTypes['Admin'], ParentType, ContextType, RequireFields<GqlQueryAdminArgs, 'username'>>;
  adminLogin: Resolver<GqlResolversTypes['Admin'], ParentType, ContextType, RequireFields<GqlQueryAdminLoginArgs, 'password' | 'username'>>;
  admins: Resolver<Array<GqlResolversTypes['Admin']>, ParentType, ContextType>;
  plusOne: Resolver<GqlResolversTypes['PlusOne'], ParentType, ContextType, RequireFields<GqlQueryPlusOneArgs, 'userId'>>;
  user: Resolver<GqlResolversTypes['User'], ParentType, ContextType, RequireFields<GqlQueryUserArgs, 'code' | 'lastName'>>;
  userPlusOnes: Resolver<Array<GqlResolversTypes['User']>, ParentType, ContextType, RequireFields<GqlQueryUserPlusOnesArgs, 'code' | 'lastName'>>;
  users: Resolver<Maybe<GqlResolversTypes['UserList']>, ParentType, ContextType, RequireFields<GqlQueryUsersArgs, 'pagination'>>;
};

export type GqlUserResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['User'] = GqlResolversParentTypes['User']> = {
  code: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  dietaryRestrictions: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  firstName: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  lastName: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  numPlusOnes: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  plusOneOf: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  rsvp: Resolver<Maybe<GqlResolversTypes['Boolean']>, ParentType, ContextType>;
  stayingAt: Resolver<Maybe<GqlResolversTypes['AccommodationGuestStayDetails']>, ParentType, ContextType>;
  type: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  welcomeMessage: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlUserListResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['UserList'] = GqlResolversParentTypes['UserList']> = {
  items: Resolver<Maybe<Array<Maybe<GqlResolversTypes['User']>>>, ParentType, ContextType>;
  pages: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  totalItems: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlResolvers<ContextType = any> = {
  AccommodatedGuest: GqlAccommodatedGuestResolvers<ContextType>;
  Accommodation: GqlAccommodationResolvers<ContextType>;
  AccommodationGuestStayDetails: GqlAccommodationGuestStayDetailsResolvers<ContextType>;
  Admin: GqlAdminResolvers<ContextType>;
  JSON: GraphQLScalarType;
  Mutation: GqlMutationResolvers<ContextType>;
  PlusOne: GqlPlusOneResolvers<ContextType>;
  Query: GqlQueryResolvers<ContextType>;
  User: GqlUserResolvers<ContextType>;
  UserList: GqlUserListResolvers<ContextType>;
};

