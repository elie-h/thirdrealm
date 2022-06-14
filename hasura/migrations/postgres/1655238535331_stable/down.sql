
alter table "public"."channels" drop constraint "channels_space_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."channels" add column "space_id" uuid
--  null;

alter table "public"."messages" rename column "created_at" to "timestamp";
ALTER TABLE "public"."messages" ALTER COLUMN "timestamp" TYPE time without time zone;

ALTER TABLE "public"."messages" ALTER COLUMN "timestamp" TYPE timestamp with time zone;

alter table "public"."space_memberships" drop constraint "space_memberships_user_wallet_fkey",
  add constraint "space_memberships_user_wallet_fkey"
  foreign key ("space_id")
  references "public"."spaces"
  ("id") on update restrict on delete cascade;

alter table "public"."space_memberships" drop constraint "space_memberships_space_id_fkey";

alter table "public"."space_memberships" drop constraint "space_memberships_user_wallet_fkey";

alter table "public"."space_memberships" drop constraint "space_memberships_pkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."space_memberships" add column "space_id" uuid
--  null;

alter table "public"."space_memberships" rename column "user_wallet" to "wallet_address";

alter table "public"."spaces" drop constraint "spaces_pkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."spaces" add column "contract_address" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."spaces" add column "name" text
--  null;

alter table "public"."spaces" drop column "id" cascade
alter table "public"."spaces" drop column "id";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

comment on column "public"."spaces"."name" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "name" drop not null;
alter table "public"."spaces" add column "name" text;

comment on column "public"."spaces"."contract_address" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "contract_address" drop not null;
alter table "public"."spaces" add column "contract_address" text;

alter table "public"."spaces"
    add constraint "spaces_pkey"
    primary key ("contract_address");

alter table "public"."space_memberships" alter column "wallet_address" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."space_memberships" add column "wallet_address" text
--  null;

comment on column "public"."space_memberships"."contract_address" is E'A table to track user memberships to public spaces';
alter table "public"."space_memberships" alter column "contract_address" drop not null;
alter table "public"."space_memberships" add column "contract_address" text;

comment on column "public"."space_memberships"."wallet_address" is E'A table to track user memberships to public spaces';
alter table "public"."space_memberships"
  add constraint "space_memberships_wallet_address_fkey"
  foreign key (wallet_address)
  references "public"."users"
  (wallet_address) on update restrict on delete restrict;
alter table "public"."space_memberships" alter column "wallet_address" drop not null;
alter table "public"."space_memberships" add column "wallet_address" text;

alter table "public"."space_memberships"
    add constraint "space_memberships_pkey"
    primary key ("wallet_address", "contract_address");

alter table "public"."space_memberships"
  add constraint "space_memberships_contract_address_fkey"
  foreign key ("contract_address")
  references "public"."spaces"
  ("contract_address") on update restrict on delete set null;

alter table "public"."messages" drop constraint "messages_channel_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."messages" add column "channel_id" uuid
--  null;

alter table "public"."messages"
  add constraint "messages_space_fkey"
  foreign key (channel_id)
  references "public"."spaces"
  (contract_address) on update no action on delete restrict;
alter table "public"."messages" alter column "channel_id" drop not null;
alter table "public"."messages" add column "channel_id" text;

alter table "public"."messages" rename column "channel_id" to "space";

DROP TABLE "public"."channels";

alter table "public"."messages" drop constraint "messages_space_fkey";

alter table "public"."messages" drop constraint "messages_sender_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."messages" add column "space" text
--  null;

alter table "public"."space_memberships" drop constraint "space_memberships_pkey";

alter table "public"."space_memberships" drop constraint "space_memberships_contract_address_fkey";

alter table "public"."spaces" drop constraint "spaces_pkey";

alter table "public"."space_memberships" drop constraint "space_memberships_wallet_address_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."spaces" add column "name" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."spaces" add column "contract_address" text
--  null;

alter table "public"."messages" alter column "space" drop not null;
alter table "public"."messages" add column "space" text;

comment on column "public"."spaces"."name" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "name" drop not null;
alter table "public"."spaces" add column "name" text;

comment on column "public"."spaces"."blockchain" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "blockchain" drop not null;
alter table "public"."spaces" add column "blockchain" text;

comment on column "public"."spaces"."contract_address" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "contract_address" drop not null;
alter table "public"."spaces" add column "contract_address" text;

comment on column "public"."spaces"."slug" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "slug" drop not null;
alter table "public"."spaces" add column "slug" text;

comment on column "public"."spaces"."description" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "description" drop not null;
alter table "public"."spaces" add column "description" text;

comment on column "public"."spaces"."external_link" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "external_link" drop not null;
alter table "public"."spaces" add column "external_link" text;

comment on column "public"."spaces"."image_url" is E'Spaces house content restricted to token holders';
alter table "public"."spaces" alter column "image_url" drop not null;
alter table "public"."spaces" add column "image_url" text;

alter table "public"."messages" rename column "sender" to "sender_address";

alter table "public"."messages" rename column "space" to "space_address";

alter table "public"."messages" rename to "space_messages";

CREATE  INDEX "public_spaces_contract_address_key" on
  "public"."spaces" using btree ("contract_address");

alter table "public"."spaces" add constraint "spaces_contract_address_key" unique ("contract_address");

alter table "public"."space_memberships"
  add constraint "public_space_memberships_contract_address_fkey"
  foreign key ("contract_address")
  references "public"."spaces"
  ("contract_address") on update restrict on delete restrict;

alter table "public"."space_memberships"
  add constraint "public_space_memberships_wallet_address_fkey"
  foreign key ("wallet_address")
  references "public"."users"
  ("wallet_address") on update restrict on delete restrict;

alter table "public"."space_memberships"
    add constraint "public_space_memberships_pkey"
    primary key ("wallet_address", "contract_address");

comment on table "public"."spaces" is NULL;

alter table "public"."spaces" rename column "blockchain" to "network";

alter table "public"."space_messages"
  add constraint "space_messages_sender_fkey"
  foreign key ("sender_address")
  references "public"."users"
  ("wallet_address") on update restrict on delete no action;

CREATE  INDEX "public_spaces_pkey" on
  "public"."spaces" using btree ("contract_address", "network");

alter table "public"."spaces" add constraint "spaces_slug_key" unique ("slug");

alter table "public"."spaces"
    add constraint "public_spaces_pkey"
    primary key ("contract_address", "network");

alter table "public"."space_messages" rename column "sender_address" to "sender";

alter table "public"."space_messages" rename column "space_address" to "space";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."space_messages" add column "space" text
--  not null;

alter table "public"."space_messages"
  add constraint "space_messages_space_fkey"
  foreign key (space)
  references "public"."spaces"
  (contract_address) on update restrict on delete no action;
alter table "public"."space_messages" alter column "space" drop not null;
alter table "public"."space_messages" add column "space" text;

DROP TABLE "public"."space_messages";

alter table "public"."space_memberships" rename to "spaces_memberships";

alter table "public"."spaces_memberships" rename to "public_space_memberships";

alter table "public"."spaces" rename to "public_spaces";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."test";

DROP TABLE "public"."public_space_memberships";

alter table "public"."users" alter column "created_at" set default now();
alter table "public"."users" alter column "created_at" drop not null;
alter table "public"."users" add column "created_at" timestamp;

alter table "public"."users" alter column "last_typed" drop not null;
alter table "public"."users" add column "last_typed" timestamptz;

alter table "public"."users" alter column "last_seen" drop not null;
alter table "public"."users" add column "last_seen" timestamptz;

alter table "public"."users" add constraint "users_handle_key" unique (handle);
alter table "public"."users" alter column "handle" drop not null;
alter table "public"."users" add column "handle" text;

DROP TABLE "public"."public_spaces";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."space";

DROP TABLE "public"."space";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."channels";

DROP TABLE "public"."test";
