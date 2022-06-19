import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timetz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "channels" */
export type Channels = {
  __typename?: 'channels';
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  space: Spaces;
  space_id: Scalars['uuid'];
};

/** aggregated selection of "channels" */
export type Channels_Aggregate = {
  __typename?: 'channels_aggregate';
  aggregate?: Maybe<Channels_Aggregate_Fields>;
  nodes: Array<Channels>;
};

/** aggregate fields of "channels" */
export type Channels_Aggregate_Fields = {
  __typename?: 'channels_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Channels_Max_Fields>;
  min?: Maybe<Channels_Min_Fields>;
};


/** aggregate fields of "channels" */
export type Channels_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Channels_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "channels" */
export type Channels_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Channels_Max_Order_By>;
  min?: InputMaybe<Channels_Min_Order_By>;
};

/** input type for inserting array relation for remote table "channels" */
export type Channels_Arr_Rel_Insert_Input = {
  data: Array<Channels_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Channels_On_Conflict>;
};

/** Boolean expression to filter rows from the table "channels". All fields are combined with a logical 'AND'. */
export type Channels_Bool_Exp = {
  _and?: InputMaybe<Array<Channels_Bool_Exp>>;
  _not?: InputMaybe<Channels_Bool_Exp>;
  _or?: InputMaybe<Array<Channels_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  space?: InputMaybe<Spaces_Bool_Exp>;
  space_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "channels" */
export enum Channels_Constraint {
  /** unique or primary key constraint */
  ChannelsPkey = 'channels_pkey'
}

/** input type for inserting data into table "channels" */
export type Channels_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  space?: InputMaybe<Spaces_Obj_Rel_Insert_Input>;
  space_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Channels_Max_Fields = {
  __typename?: 'channels_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  space_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "channels" */
export type Channels_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  space_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Channels_Min_Fields = {
  __typename?: 'channels_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  space_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "channels" */
export type Channels_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  space_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "channels" */
export type Channels_Mutation_Response = {
  __typename?: 'channels_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Channels>;
};

/** on_conflict condition type for table "channels" */
export type Channels_On_Conflict = {
  constraint: Channels_Constraint;
  update_columns?: Array<Channels_Update_Column>;
  where?: InputMaybe<Channels_Bool_Exp>;
};

/** Ordering options when selecting data from "channels". */
export type Channels_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  space?: InputMaybe<Spaces_Order_By>;
  space_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: channels */
export type Channels_Pk_Columns_Input = {
  name: Scalars['String'];
  space_id: Scalars['uuid'];
};

/** select columns of table "channels" */
export enum Channels_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SpaceId = 'space_id'
}

/** input type for updating data in table "channels" */
export type Channels_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  space_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "channels" */
export enum Channels_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SpaceId = 'space_id'
}

/** columns and relationships of "messages" */
export type Messages = {
  __typename?: 'messages';
  channel_id?: Maybe<Scalars['uuid']>;
  created_at: Scalars['timetz'];
  id: Scalars['String'];
  message: Scalars['String'];
  sender_id: Scalars['uuid'];
};

/** aggregated selection of "messages" */
export type Messages_Aggregate = {
  __typename?: 'messages_aggregate';
  aggregate?: Maybe<Messages_Aggregate_Fields>;
  nodes: Array<Messages>;
};

/** aggregate fields of "messages" */
export type Messages_Aggregate_Fields = {
  __typename?: 'messages_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Messages_Max_Fields>;
  min?: Maybe<Messages_Min_Fields>;
};


/** aggregate fields of "messages" */
export type Messages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "messages". All fields are combined with a logical 'AND'. */
export type Messages_Bool_Exp = {
  _and?: InputMaybe<Array<Messages_Bool_Exp>>;
  _not?: InputMaybe<Messages_Bool_Exp>;
  _or?: InputMaybe<Array<Messages_Bool_Exp>>;
  channel_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timetz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  sender_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "messages" */
export enum Messages_Constraint {
  /** unique or primary key constraint */
  SpaceMessagesPkey = 'space_messages_pkey'
}

/** input type for inserting data into table "messages" */
export type Messages_Insert_Input = {
  channel_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timetz']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  sender_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Messages_Max_Fields = {
  __typename?: 'messages_max_fields';
  channel_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timetz']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  sender_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Messages_Min_Fields = {
  __typename?: 'messages_min_fields';
  channel_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timetz']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  sender_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "messages" */
export type Messages_Mutation_Response = {
  __typename?: 'messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Messages>;
};

/** on_conflict condition type for table "messages" */
export type Messages_On_Conflict = {
  constraint: Messages_Constraint;
  update_columns?: Array<Messages_Update_Column>;
  where?: InputMaybe<Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "messages". */
export type Messages_Order_By = {
  channel_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: messages */
export type Messages_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "messages" */
export enum Messages_Select_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SenderId = 'sender_id'
}

/** input type for updating data in table "messages" */
export type Messages_Set_Input = {
  channel_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timetz']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  sender_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "messages" */
export enum Messages_Update_Column {
  /** column name */
  ChannelId = 'channel_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SenderId = 'sender_id'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "channels" */
  delete_channels?: Maybe<Channels_Mutation_Response>;
  /** delete single row from the table: "channels" */
  delete_channels_by_pk?: Maybe<Channels>;
  /** delete data from the table: "messages" */
  delete_messages?: Maybe<Messages_Mutation_Response>;
  /** delete single row from the table: "messages" */
  delete_messages_by_pk?: Maybe<Messages>;
  /** delete data from the table: "space_memberships" */
  delete_space_memberships?: Maybe<Space_Memberships_Mutation_Response>;
  /** delete single row from the table: "space_memberships" */
  delete_space_memberships_by_pk?: Maybe<Space_Memberships>;
  /** delete data from the table: "spaces" */
  delete_spaces?: Maybe<Spaces_Mutation_Response>;
  /** delete single row from the table: "spaces" */
  delete_spaces_by_pk?: Maybe<Spaces>;
  /** delete data from the table: "wallets" */
  delete_wallets?: Maybe<Wallets_Mutation_Response>;
  /** delete single row from the table: "wallets" */
  delete_wallets_by_pk?: Maybe<Wallets>;
  /** insert data into the table: "channels" */
  insert_channels?: Maybe<Channels_Mutation_Response>;
  /** insert a single row into the table: "channels" */
  insert_channels_one?: Maybe<Channels>;
  /** insert data into the table: "messages" */
  insert_messages?: Maybe<Messages_Mutation_Response>;
  /** insert a single row into the table: "messages" */
  insert_messages_one?: Maybe<Messages>;
  /** insert data into the table: "space_memberships" */
  insert_space_memberships?: Maybe<Space_Memberships_Mutation_Response>;
  /** insert a single row into the table: "space_memberships" */
  insert_space_memberships_one?: Maybe<Space_Memberships>;
  /** insert data into the table: "spaces" */
  insert_spaces?: Maybe<Spaces_Mutation_Response>;
  /** insert a single row into the table: "spaces" */
  insert_spaces_one?: Maybe<Spaces>;
  /** insert data into the table: "wallets" */
  insert_wallets?: Maybe<Wallets_Mutation_Response>;
  /** insert a single row into the table: "wallets" */
  insert_wallets_one?: Maybe<Wallets>;
  /** update data of the table: "channels" */
  update_channels?: Maybe<Channels_Mutation_Response>;
  /** update single row of the table: "channels" */
  update_channels_by_pk?: Maybe<Channels>;
  /** update data of the table: "messages" */
  update_messages?: Maybe<Messages_Mutation_Response>;
  /** update single row of the table: "messages" */
  update_messages_by_pk?: Maybe<Messages>;
  /** update data of the table: "space_memberships" */
  update_space_memberships?: Maybe<Space_Memberships_Mutation_Response>;
  /** update single row of the table: "space_memberships" */
  update_space_memberships_by_pk?: Maybe<Space_Memberships>;
  /** update data of the table: "spaces" */
  update_spaces?: Maybe<Spaces_Mutation_Response>;
  /** update single row of the table: "spaces" */
  update_spaces_by_pk?: Maybe<Spaces>;
  /** update data of the table: "wallets" */
  update_wallets?: Maybe<Wallets_Mutation_Response>;
  /** update single row of the table: "wallets" */
  update_wallets_by_pk?: Maybe<Wallets>;
};


/** mutation root */
export type Mutation_RootDelete_ChannelsArgs = {
  where: Channels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Channels_By_PkArgs = {
  name: Scalars['String'];
  space_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MessagesArgs = {
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Messages_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Space_MembershipsArgs = {
  where: Space_Memberships_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Space_Memberships_By_PkArgs = {
  space_id: Scalars['uuid'];
  wallet_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SpacesArgs = {
  where: Spaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Spaces_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_WalletsArgs = {
  where: Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Wallets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ChannelsArgs = {
  objects: Array<Channels_Insert_Input>;
  on_conflict?: InputMaybe<Channels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channels_OneArgs = {
  object: Channels_Insert_Input;
  on_conflict?: InputMaybe<Channels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MessagesArgs = {
  objects: Array<Messages_Insert_Input>;
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_OneArgs = {
  object: Messages_Insert_Input;
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Space_MembershipsArgs = {
  objects: Array<Space_Memberships_Insert_Input>;
  on_conflict?: InputMaybe<Space_Memberships_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Space_Memberships_OneArgs = {
  object: Space_Memberships_Insert_Input;
  on_conflict?: InputMaybe<Space_Memberships_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SpacesArgs = {
  objects: Array<Spaces_Insert_Input>;
  on_conflict?: InputMaybe<Spaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Spaces_OneArgs = {
  object: Spaces_Insert_Input;
  on_conflict?: InputMaybe<Spaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WalletsArgs = {
  objects: Array<Wallets_Insert_Input>;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Wallets_OneArgs = {
  object: Wallets_Insert_Input;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ChannelsArgs = {
  _set?: InputMaybe<Channels_Set_Input>;
  where: Channels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Channels_By_PkArgs = {
  _set?: InputMaybe<Channels_Set_Input>;
  pk_columns: Channels_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MessagesArgs = {
  _set?: InputMaybe<Messages_Set_Input>;
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_By_PkArgs = {
  _set?: InputMaybe<Messages_Set_Input>;
  pk_columns: Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Space_MembershipsArgs = {
  _set?: InputMaybe<Space_Memberships_Set_Input>;
  where: Space_Memberships_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Space_Memberships_By_PkArgs = {
  _set?: InputMaybe<Space_Memberships_Set_Input>;
  pk_columns: Space_Memberships_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SpacesArgs = {
  _set?: InputMaybe<Spaces_Set_Input>;
  where: Spaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Spaces_By_PkArgs = {
  _set?: InputMaybe<Spaces_Set_Input>;
  pk_columns: Spaces_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WalletsArgs = {
  _set?: InputMaybe<Wallets_Set_Input>;
  where: Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Wallets_By_PkArgs = {
  _set?: InputMaybe<Wallets_Set_Input>;
  pk_columns: Wallets_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  channels: Array<Channels>;
  /** An aggregate relationship */
  channels_aggregate: Channels_Aggregate;
  /** fetch data from the table: "channels" using primary key columns */
  channels_by_pk?: Maybe<Channels>;
  /** fetch data from the table: "messages" */
  messages: Array<Messages>;
  /** fetch aggregated fields from the table: "messages" */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk?: Maybe<Messages>;
  /** An array relationship */
  space_memberships: Array<Space_Memberships>;
  /** An aggregate relationship */
  space_memberships_aggregate: Space_Memberships_Aggregate;
  /** fetch data from the table: "space_memberships" using primary key columns */
  space_memberships_by_pk?: Maybe<Space_Memberships>;
  /** fetch data from the table: "spaces" */
  spaces: Array<Spaces>;
  /** fetch aggregated fields from the table: "spaces" */
  spaces_aggregate: Spaces_Aggregate;
  /** fetch data from the table: "spaces" using primary key columns */
  spaces_by_pk?: Maybe<Spaces>;
  /** fetch data from the table: "wallets" */
  wallets: Array<Wallets>;
  /** fetch aggregated fields from the table: "wallets" */
  wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "wallets" using primary key columns */
  wallets_by_pk?: Maybe<Wallets>;
};


export type Query_RootChannelsArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Query_RootChannels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Query_RootChannels_By_PkArgs = {
  name: Scalars['String'];
  space_id: Scalars['uuid'];
};


export type Query_RootMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Query_RootMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Query_RootMessages_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootSpace_MembershipsArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};


export type Query_RootSpace_Memberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};


export type Query_RootSpace_Memberships_By_PkArgs = {
  space_id: Scalars['uuid'];
  wallet_id: Scalars['uuid'];
};


export type Query_RootSpacesArgs = {
  distinct_on?: InputMaybe<Array<Spaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Spaces_Order_By>>;
  where?: InputMaybe<Spaces_Bool_Exp>;
};


export type Query_RootSpaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Spaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Spaces_Order_By>>;
  where?: InputMaybe<Spaces_Bool_Exp>;
};


export type Query_RootSpaces_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Query_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Query_RootWallets_By_PkArgs = {
  id: Scalars['uuid'];
};

/** A table to track user memberships to public spaces */
export type Space_Memberships = {
  __typename?: 'space_memberships';
  /** An object relationship */
  space: Spaces;
  space_id: Scalars['uuid'];
  /** An object relationship */
  wallet: Wallets;
  wallet_id: Scalars['uuid'];
};

/** aggregated selection of "space_memberships" */
export type Space_Memberships_Aggregate = {
  __typename?: 'space_memberships_aggregate';
  aggregate?: Maybe<Space_Memberships_Aggregate_Fields>;
  nodes: Array<Space_Memberships>;
};

/** aggregate fields of "space_memberships" */
export type Space_Memberships_Aggregate_Fields = {
  __typename?: 'space_memberships_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Space_Memberships_Max_Fields>;
  min?: Maybe<Space_Memberships_Min_Fields>;
};


/** aggregate fields of "space_memberships" */
export type Space_Memberships_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "space_memberships" */
export type Space_Memberships_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Space_Memberships_Max_Order_By>;
  min?: InputMaybe<Space_Memberships_Min_Order_By>;
};

/** input type for inserting array relation for remote table "space_memberships" */
export type Space_Memberships_Arr_Rel_Insert_Input = {
  data: Array<Space_Memberships_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Space_Memberships_On_Conflict>;
};

/** Boolean expression to filter rows from the table "space_memberships". All fields are combined with a logical 'AND'. */
export type Space_Memberships_Bool_Exp = {
  _and?: InputMaybe<Array<Space_Memberships_Bool_Exp>>;
  _not?: InputMaybe<Space_Memberships_Bool_Exp>;
  _or?: InputMaybe<Array<Space_Memberships_Bool_Exp>>;
  space?: InputMaybe<Spaces_Bool_Exp>;
  space_id?: InputMaybe<Uuid_Comparison_Exp>;
  wallet?: InputMaybe<Wallets_Bool_Exp>;
  wallet_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "space_memberships" */
export enum Space_Memberships_Constraint {
  /** unique or primary key constraint */
  SpaceMembershipsPkey = 'space_memberships_pkey'
}

/** input type for inserting data into table "space_memberships" */
export type Space_Memberships_Insert_Input = {
  space?: InputMaybe<Spaces_Obj_Rel_Insert_Input>;
  space_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  wallet_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Space_Memberships_Max_Fields = {
  __typename?: 'space_memberships_max_fields';
  space_id?: Maybe<Scalars['uuid']>;
  wallet_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "space_memberships" */
export type Space_Memberships_Max_Order_By = {
  space_id?: InputMaybe<Order_By>;
  wallet_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Space_Memberships_Min_Fields = {
  __typename?: 'space_memberships_min_fields';
  space_id?: Maybe<Scalars['uuid']>;
  wallet_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "space_memberships" */
export type Space_Memberships_Min_Order_By = {
  space_id?: InputMaybe<Order_By>;
  wallet_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "space_memberships" */
export type Space_Memberships_Mutation_Response = {
  __typename?: 'space_memberships_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Space_Memberships>;
};

/** on_conflict condition type for table "space_memberships" */
export type Space_Memberships_On_Conflict = {
  constraint: Space_Memberships_Constraint;
  update_columns?: Array<Space_Memberships_Update_Column>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};

/** Ordering options when selecting data from "space_memberships". */
export type Space_Memberships_Order_By = {
  space?: InputMaybe<Spaces_Order_By>;
  space_id?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Wallets_Order_By>;
  wallet_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: space_memberships */
export type Space_Memberships_Pk_Columns_Input = {
  space_id: Scalars['uuid'];
  wallet_id: Scalars['uuid'];
};

/** select columns of table "space_memberships" */
export enum Space_Memberships_Select_Column {
  /** column name */
  SpaceId = 'space_id',
  /** column name */
  WalletId = 'wallet_id'
}

/** input type for updating data in table "space_memberships" */
export type Space_Memberships_Set_Input = {
  space_id?: InputMaybe<Scalars['uuid']>;
  wallet_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "space_memberships" */
export enum Space_Memberships_Update_Column {
  /** column name */
  SpaceId = 'space_id',
  /** column name */
  WalletId = 'wallet_id'
}

/** Spaces house content restricted to token holders */
export type Spaces = {
  __typename?: 'spaces';
  blockchain: Scalars['String'];
  /** An array relationship */
  channels: Array<Channels>;
  /** An aggregate relationship */
  channels_aggregate: Channels_Aggregate;
  contract_address: Scalars['String'];
  cover_image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  space_memberships: Array<Space_Memberships>;
  /** An aggregate relationship */
  space_memberships_aggregate: Space_Memberships_Aggregate;
};


/** Spaces house content restricted to token holders */
export type SpacesChannelsArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


/** Spaces house content restricted to token holders */
export type SpacesChannels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


/** Spaces house content restricted to token holders */
export type SpacesSpace_MembershipsArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};


/** Spaces house content restricted to token holders */
export type SpacesSpace_Memberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};

/** aggregated selection of "spaces" */
export type Spaces_Aggregate = {
  __typename?: 'spaces_aggregate';
  aggregate?: Maybe<Spaces_Aggregate_Fields>;
  nodes: Array<Spaces>;
};

/** aggregate fields of "spaces" */
export type Spaces_Aggregate_Fields = {
  __typename?: 'spaces_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Spaces_Max_Fields>;
  min?: Maybe<Spaces_Min_Fields>;
};


/** aggregate fields of "spaces" */
export type Spaces_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Spaces_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "spaces". All fields are combined with a logical 'AND'. */
export type Spaces_Bool_Exp = {
  _and?: InputMaybe<Array<Spaces_Bool_Exp>>;
  _not?: InputMaybe<Spaces_Bool_Exp>;
  _or?: InputMaybe<Array<Spaces_Bool_Exp>>;
  blockchain?: InputMaybe<String_Comparison_Exp>;
  channels?: InputMaybe<Channels_Bool_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  cover_image?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  space_memberships?: InputMaybe<Space_Memberships_Bool_Exp>;
};

/** unique or primary key constraints on table "spaces" */
export enum Spaces_Constraint {
  /** unique or primary key constraint */
  SpacesPkey = 'spaces_pkey'
}

/** input type for inserting data into table "spaces" */
export type Spaces_Insert_Input = {
  blockchain?: InputMaybe<Scalars['String']>;
  channels?: InputMaybe<Channels_Arr_Rel_Insert_Input>;
  contract_address?: InputMaybe<Scalars['String']>;
  cover_image?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  space_memberships?: InputMaybe<Space_Memberships_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Spaces_Max_Fields = {
  __typename?: 'spaces_max_fields';
  blockchain?: Maybe<Scalars['String']>;
  contract_address?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Spaces_Min_Fields = {
  __typename?: 'spaces_min_fields';
  blockchain?: Maybe<Scalars['String']>;
  contract_address?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "spaces" */
export type Spaces_Mutation_Response = {
  __typename?: 'spaces_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Spaces>;
};

/** input type for inserting object relation for remote table "spaces" */
export type Spaces_Obj_Rel_Insert_Input = {
  data: Spaces_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Spaces_On_Conflict>;
};

/** on_conflict condition type for table "spaces" */
export type Spaces_On_Conflict = {
  constraint: Spaces_Constraint;
  update_columns?: Array<Spaces_Update_Column>;
  where?: InputMaybe<Spaces_Bool_Exp>;
};

/** Ordering options when selecting data from "spaces". */
export type Spaces_Order_By = {
  blockchain?: InputMaybe<Order_By>;
  channels_aggregate?: InputMaybe<Channels_Aggregate_Order_By>;
  contract_address?: InputMaybe<Order_By>;
  cover_image?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  space_memberships_aggregate?: InputMaybe<Space_Memberships_Aggregate_Order_By>;
};

/** primary key columns input for table: spaces */
export type Spaces_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "spaces" */
export enum Spaces_Select_Column {
  /** column name */
  Blockchain = 'blockchain',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  CoverImage = 'cover_image',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "spaces" */
export type Spaces_Set_Input = {
  blockchain?: InputMaybe<Scalars['String']>;
  contract_address?: InputMaybe<Scalars['String']>;
  cover_image?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "spaces" */
export enum Spaces_Update_Column {
  /** column name */
  Blockchain = 'blockchain',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  CoverImage = 'cover_image',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  channels: Array<Channels>;
  /** An aggregate relationship */
  channels_aggregate: Channels_Aggregate;
  /** fetch data from the table: "channels" using primary key columns */
  channels_by_pk?: Maybe<Channels>;
  /** fetch data from the table: "messages" */
  messages: Array<Messages>;
  /** fetch aggregated fields from the table: "messages" */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk?: Maybe<Messages>;
  /** An array relationship */
  space_memberships: Array<Space_Memberships>;
  /** An aggregate relationship */
  space_memberships_aggregate: Space_Memberships_Aggregate;
  /** fetch data from the table: "space_memberships" using primary key columns */
  space_memberships_by_pk?: Maybe<Space_Memberships>;
  /** fetch data from the table: "spaces" */
  spaces: Array<Spaces>;
  /** fetch aggregated fields from the table: "spaces" */
  spaces_aggregate: Spaces_Aggregate;
  /** fetch data from the table: "spaces" using primary key columns */
  spaces_by_pk?: Maybe<Spaces>;
  /** fetch data from the table: "wallets" */
  wallets: Array<Wallets>;
  /** fetch aggregated fields from the table: "wallets" */
  wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "wallets" using primary key columns */
  wallets_by_pk?: Maybe<Wallets>;
};


export type Subscription_RootChannelsArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Subscription_RootChannels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Subscription_RootChannels_By_PkArgs = {
  name: Scalars['String'];
  space_id: Scalars['uuid'];
};


export type Subscription_RootMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootMessages_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootSpace_MembershipsArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};


export type Subscription_RootSpace_Memberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};


export type Subscription_RootSpace_Memberships_By_PkArgs = {
  space_id: Scalars['uuid'];
  wallet_id: Scalars['uuid'];
};


export type Subscription_RootSpacesArgs = {
  distinct_on?: InputMaybe<Array<Spaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Spaces_Order_By>>;
  where?: InputMaybe<Spaces_Bool_Exp>;
};


export type Subscription_RootSpaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Spaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Spaces_Order_By>>;
  where?: InputMaybe<Spaces_Bool_Exp>;
};


export type Subscription_RootSpaces_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Subscription_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Subscription_RootWallets_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timetz". All fields are combined with logical 'AND'. */
export type Timetz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timetz']>;
  _gt?: InputMaybe<Scalars['timetz']>;
  _gte?: InputMaybe<Scalars['timetz']>;
  _in?: InputMaybe<Array<Scalars['timetz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timetz']>;
  _lte?: InputMaybe<Scalars['timetz']>;
  _neq?: InputMaybe<Scalars['timetz']>;
  _nin?: InputMaybe<Array<Scalars['timetz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "wallets" */
export type Wallets = {
  __typename?: 'wallets';
  address: Scalars['String'];
  id: Scalars['uuid'];
  /** An array relationship */
  space_memberships: Array<Space_Memberships>;
  /** An aggregate relationship */
  space_memberships_aggregate: Space_Memberships_Aggregate;
};


/** columns and relationships of "wallets" */
export type WalletsSpace_MembershipsArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};


/** columns and relationships of "wallets" */
export type WalletsSpace_Memberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Space_Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Space_Memberships_Order_By>>;
  where?: InputMaybe<Space_Memberships_Bool_Exp>;
};

/** aggregated selection of "wallets" */
export type Wallets_Aggregate = {
  __typename?: 'wallets_aggregate';
  aggregate?: Maybe<Wallets_Aggregate_Fields>;
  nodes: Array<Wallets>;
};

/** aggregate fields of "wallets" */
export type Wallets_Aggregate_Fields = {
  __typename?: 'wallets_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Wallets_Max_Fields>;
  min?: Maybe<Wallets_Min_Fields>;
};


/** aggregate fields of "wallets" */
export type Wallets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "wallets". All fields are combined with a logical 'AND'. */
export type Wallets_Bool_Exp = {
  _and?: InputMaybe<Array<Wallets_Bool_Exp>>;
  _not?: InputMaybe<Wallets_Bool_Exp>;
  _or?: InputMaybe<Array<Wallets_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  space_memberships?: InputMaybe<Space_Memberships_Bool_Exp>;
};

/** unique or primary key constraints on table "wallets" */
export enum Wallets_Constraint {
  /** unique or primary key constraint */
  WalletsAddressKey = 'wallets_address_key',
  /** unique or primary key constraint */
  WalletsPkey = 'wallets_pkey'
}

/** input type for inserting data into table "wallets" */
export type Wallets_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  space_memberships?: InputMaybe<Space_Memberships_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Wallets_Max_Fields = {
  __typename?: 'wallets_max_fields';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Wallets_Min_Fields = {
  __typename?: 'wallets_min_fields';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "wallets" */
export type Wallets_Mutation_Response = {
  __typename?: 'wallets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Wallets>;
};

/** input type for inserting object relation for remote table "wallets" */
export type Wallets_Obj_Rel_Insert_Input = {
  data: Wallets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** on_conflict condition type for table "wallets" */
export type Wallets_On_Conflict = {
  constraint: Wallets_Constraint;
  update_columns?: Array<Wallets_Update_Column>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** Ordering options when selecting data from "wallets". */
export type Wallets_Order_By = {
  address?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  space_memberships_aggregate?: InputMaybe<Space_Memberships_Aggregate_Order_By>;
};

/** primary key columns input for table: wallets */
export type Wallets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "wallets" */
export enum Wallets_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "wallets" */
export type Wallets_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "wallets" */
export enum Wallets_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Id = 'id'
}


export const GetSpacesDocument = gql`
    query getSpaces {
  spaces {
    id
    name
    contract_address
    blockchain
    cover_image
    description
  }
}
    `;
export const GetSpaceByIdDocument = gql`
    query getSpaceById($id: uuid!) {
  spaces_by_pk(id: $id) {
    id
    name
    blockchain
    contract_address
    cover_image
    description
    members: space_memberships_aggregate {
      aggregate {
        count(distinct: true, columns: space_id)
      }
    }
  }
}
    `;
export const GetSpaceAndCheckMembershipsDocument = gql`
    query getSpaceAndCheckMemberships($id: uuid!, $address: String!) {
  spaces_by_pk(id: $id) {
    contract_address
    space_memberships(where: {wallet: {address: {_eq: $address}}}) {
      space_id
    }
  }
}
    `;
export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    getSpaces(variables?: GetSpacesQueryVariables, options?: C): Promise<GetSpacesQuery> {
      return requester<GetSpacesQuery, GetSpacesQueryVariables>(GetSpacesDocument, variables, options);
    },
    getSpaceById(variables: GetSpaceByIdQueryVariables, options?: C): Promise<GetSpaceByIdQuery> {
      return requester<GetSpaceByIdQuery, GetSpaceByIdQueryVariables>(GetSpaceByIdDocument, variables, options);
    },
    getSpaceAndCheckMemberships(variables: GetSpaceAndCheckMembershipsQueryVariables, options?: C): Promise<GetSpaceAndCheckMembershipsQuery> {
      return requester<GetSpaceAndCheckMembershipsQuery, GetSpaceAndCheckMembershipsQueryVariables>(GetSpaceAndCheckMembershipsDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;