/* eslint-disable */
/* Generate this file by running `npm run graphql-codegen` */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type AccommodatedGuest = {
  __typename?: 'AccommodatedGuest';
  accommodationId: Scalars['Int']['output'];
  checkInDate: Scalars['String']['output'];
  checkOutDate: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Accommodation = {
  __typename?: 'Accommodation';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  numGuests: Scalars['Int']['output'];
  numRooms: Scalars['Int']['output'];
};

export type AccommodationGuestStayDetails = {
  __typename?: 'AccommodationGuestStayDetails';
  address: Scalars['String']['output'];
  checkInDate: Scalars['String']['output'];
  checkOutDate: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type AddAccommodatedGuestInput = {
  accommodationId: Scalars['Int']['input'];
  checkInDate: Scalars['String']['input'];
  checkOutDate: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type AddAccommodationInput = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numGuests: Scalars['Int']['input'];
  numRooms: Scalars['Int']['input'];
};

export type AddAdminInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AddUserInput = {
  code: Scalars['String']['input'];
  dietaryRestrictions?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  numPlusOnes: Scalars['Int']['input'];
  plusOneOf?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  welcomeMessage?: InputMaybe<Scalars['String']['input']>;
};

export type Admin = {
  __typename?: 'Admin';
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export enum GuestType {
  guest = 'guest',
  plus_one = 'plus_one'
}

export type ListUsersFilter = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
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


export type MutationAddAccommodatedGuestArgs = {
  attrs: AddAccommodatedGuestInput;
};


export type MutationAddAccommodationArgs = {
  attrs: AddAccommodationInput;
};


export type MutationAddAdminArgs = {
  attrs: AddAdminInput;
};


export type MutationAddUserArgs = {
  attrs: AddUserInput;
};


export type MutationDeleteAccommodatedGuestArgs = {
  accommodationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationDeleteAccommodationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteAdminArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAccommodatedGuestArgs = {
  attrs: UpdateAccommodatedGuestInput;
};


export type MutationUpdateAccommodationArgs = {
  attrs: UpdateAccommodationInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateAdminArgs = {
  attrs: UpdateAdminInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  attrs: UpdateUserInput;
  id: Scalars['Int']['input'];
};

export type Pagination = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type PlusOne = {
  __typename?: 'PlusOne';
  id: Scalars['Int']['output'];
  plusOneOf: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  accommodatedGuest: AccommodatedGuest;
  accommodatedGuests: Array<AccommodatedGuest>;
  accommodation: Accommodation;
  accommodations: Array<Accommodation>;
  admin: Admin;
  adminLogin: Admin;
  admins: Array<Admin>;
  plusOne: PlusOne;
  user: User;
  userPlusOnes: Array<User>;
  users: Maybe<UserList>;
};


export type QueryAccommodatedGuestArgs = {
  accommodationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type QueryAccommodatedGuestsArgs = {
  accommodationId: Scalars['Int']['input'];
};


export type QueryAccommodationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAdminArgs = {
  username: Scalars['String']['input'];
};


export type QueryAdminLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryPlusOneArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  code: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type QueryUserPlusOnesArgs = {
  code: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<ListUsersFilter>;
  pagination: Pagination;
};

export type UpdateAccommodatedGuestInput = {
  accommodationId: Scalars['Int']['input'];
  checkInDate?: InputMaybe<Scalars['String']['input']>;
  checkOutDate?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type UpdateAccommodationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numGuests?: InputMaybe<Scalars['Int']['input']>;
  numRooms?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateAdminInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  numPlusOnes?: InputMaybe<Scalars['Int']['input']>;
  rsvpReception?: InputMaybe<Scalars['Boolean']['input']>;
  rsvpTeaCeremony?: InputMaybe<Scalars['Boolean']['input']>;
  welcomeMessage?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  code: Scalars['String']['output'];
  dietaryRestrictions: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  numPlusOnes: Scalars['Int']['output'];
  plusOneOf: Maybe<Scalars['Int']['output']>;
  rsvpReception: Maybe<Scalars['Boolean']['output']>;
  rsvpTeaCeremony: Maybe<Scalars['Boolean']['output']>;
  stayingAt: Maybe<AccommodationGuestStayDetails>;
  type: Scalars['String']['output'];
  welcomeMessage: Maybe<Scalars['String']['output']>;
};

export type UserList = {
  __typename?: 'UserList';
  items: Maybe<Array<Maybe<User>>>;
  pages: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
};

export type ListAccommodatedGuestsQueryVariables = Exact<{
  accommodationId: Scalars['Int']['input'];
}>;


export type ListAccommodatedGuestsQuery = { __typename?: 'Query', accommodatedGuests: Array<{ __typename?: 'AccommodatedGuest', id: number, userId: number, firstName: string, lastName: string, accommodationId: number, checkInDate: string, checkOutDate: string }> };

export type AddAccommodatedGuestMutationVariables = Exact<{
  attrs: AddAccommodatedGuestInput;
}>;


export type AddAccommodatedGuestMutation = { __typename?: 'Mutation', addAccommodatedGuest: boolean };

export type DeleteAccommodatedGuestMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  accommodationId: Scalars['Int']['input'];
}>;


export type DeleteAccommodatedGuestMutation = { __typename?: 'Mutation', deleteAccommodatedGuest: boolean };

export type UpdateAccommodatedGuestMutationVariables = Exact<{
  attrs: UpdateAccommodatedGuestInput;
}>;


export type UpdateAccommodatedGuestMutation = { __typename?: 'Mutation', updateAccommodatedGuest: boolean };

export type ListAccommodationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAccommodationsQuery = { __typename?: 'Query', accommodations: Array<{ __typename?: 'Accommodation', id: number, name: string, address: string, numGuests: number, numRooms: number }> };

export type AddAccommodationMutationVariables = Exact<{
  attrs: AddAccommodationInput;
}>;


export type AddAccommodationMutation = { __typename?: 'Mutation', addAccommodation: boolean };

export type DeleteAccommodationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAccommodationMutation = { __typename?: 'Mutation', deleteAccommodation: boolean };

export type UpdateAccommodationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  attrs: UpdateAccommodationInput;
}>;


export type UpdateAccommodationMutation = { __typename?: 'Mutation', updateAccommodation: boolean };

export type AdminLoginQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: { __typename?: 'Admin', id: number, username: string, firstName: string, lastName: string } };

export type GetAdminUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetAdminUserQuery = { __typename?: 'Query', admin: { __typename?: 'Admin', id: number, username: string, firstName: string, lastName: string } };

export type GetAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = { __typename?: 'Query', admins: Array<{ __typename?: 'Admin', id: number, username: string, firstName: string, lastName: string }> };

export type AddAdminUserMutationVariables = Exact<{
  attrs: AddAdminInput;
}>;


export type AddAdminUserMutation = { __typename?: 'Mutation', addAdmin: boolean };

export type DeleteAdminUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAdminUserMutation = { __typename?: 'Mutation', deleteAdmin: boolean };

export type UserQueryVariables = Exact<{
  code: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, type: string, firstName: string, lastName: string, code: string, rsvpReception: boolean | null, rsvpTeaCeremony: boolean | null, numPlusOnes: number, dietaryRestrictions: string | null, welcomeMessage: string | null, stayingAt: { __typename?: 'AccommodationGuestStayDetails', name: string, address: string, checkInDate: string, checkOutDate: string } | null }, userPlusOnes: Array<{ __typename?: 'User', id: number, type: string, firstName: string, lastName: string, code: string, rsvpReception: boolean | null, rsvpTeaCeremony: boolean | null, numPlusOnes: number, dietaryRestrictions: string | null, welcomeMessage: string | null }> };

export type ListUsersQueryVariables = Exact<{
  filter?: InputMaybe<ListUsersFilter>;
  pagination: Pagination;
}>;


export type ListUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserList', pages: number, totalItems: number, items: Array<{ __typename?: 'User', id: number, type: string, firstName: string, lastName: string, code: string, rsvpReception: boolean | null, rsvpTeaCeremony: boolean | null, numPlusOnes: number, dietaryRestrictions: string | null, welcomeMessage: string | null, plusOneOf: number | null } | null> | null } | null };

export type AddUserMutationVariables = Exact<{
  attrs: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: boolean };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  attrs: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };


export const ListAccommodatedGuestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listAccommodatedGuests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accommodationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodatedGuests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accommodationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accommodationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"accommodationId"}},{"kind":"Field","name":{"kind":"Name","value":"checkInDate"}},{"kind":"Field","name":{"kind":"Name","value":"checkOutDate"}}]}}]}}]} as unknown as DocumentNode<ListAccommodatedGuestsQuery, ListAccommodatedGuestsQueryVariables>;
export const AddAccommodatedGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAccommodatedGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAccommodatedGuestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAccommodatedGuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<AddAccommodatedGuestMutation, AddAccommodatedGuestMutationVariables>;
export const DeleteAccommodatedGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAccommodatedGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accommodationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccommodatedGuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accommodationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accommodationId"}}}]}]}}]} as unknown as DocumentNode<DeleteAccommodatedGuestMutation, DeleteAccommodatedGuestMutationVariables>;
export const UpdateAccommodatedGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAccommodatedGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccommodatedGuestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccommodatedGuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<UpdateAccommodatedGuestMutation, UpdateAccommodatedGuestMutationVariables>;
export const ListAccommodationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listAccommodations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accommodations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"numGuests"}},{"kind":"Field","name":{"kind":"Name","value":"numRooms"}}]}}]}}]} as unknown as DocumentNode<ListAccommodationsQuery, ListAccommodationsQueryVariables>;
export const AddAccommodationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAccommodation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAccommodationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAccommodation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<AddAccommodationMutation, AddAccommodationMutationVariables>;
export const DeleteAccommodationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAccommodation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccommodation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteAccommodationMutation, DeleteAccommodationMutationVariables>;
export const UpdateAccommodationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAccommodation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccommodationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccommodation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<UpdateAccommodationMutation, UpdateAccommodationMutationVariables>;
export const AdminLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<AdminLoginQuery, AdminLoginQueryVariables>;
export const GetAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetAdminUserQuery, GetAdminUserQueryVariables>;
export const GetAdminsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAdmins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetAdminsQuery, GetAdminsQueryVariables>;
export const AddAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<AddAdminUserMutation, AddAdminUserMutationVariables>;
export const DeleteAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteAdminUserMutation, DeleteAdminUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpReception"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpTeaCeremony"}},{"kind":"Field","name":{"kind":"Name","value":"numPlusOnes"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"welcomeMessage"}},{"kind":"Field","name":{"kind":"Name","value":"stayingAt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"checkInDate"}},{"kind":"Field","name":{"kind":"Name","value":"checkOutDate"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userPlusOnes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpReception"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpTeaCeremony"}},{"kind":"Field","name":{"kind":"Name","value":"numPlusOnes"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"welcomeMessage"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpReception"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpTeaCeremony"}},{"kind":"Field","name":{"kind":"Name","value":"numPlusOnes"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"welcomeMessage"}},{"kind":"Field","name":{"kind":"Name","value":"plusOneOf"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"attrs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attrs"}}}]}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;