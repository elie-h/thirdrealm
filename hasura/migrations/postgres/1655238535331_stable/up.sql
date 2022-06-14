
SET check_function_bodies = false;

CREATE TABLE "public"."test" ("name" text, "description" text, "Id" serial NOT NULL, PRIMARY KEY ("Id") );COMMENT ON TABLE "public"."test" IS E'This is a test table';

DROP table "public"."channels";

CREATE TABLE "public"."space" ("contract_address" text NOT NULL, "network" text NOT NULL, PRIMARY KEY ("contract_address") , UNIQUE ("contract_address"));COMMENT ON TABLE "public"."space" IS E'A space is a container specific to a smart contract';

DROP table "public"."space";

CREATE TABLE "public"."public_spaces" ("contract_address" text NOT NULL, "network" text NOT NULL, "name" text, "description" text, "slug" text, "external_link" text, "image_url" text, PRIMARY KEY ("contract_address","network") , UNIQUE ("slug"), UNIQUE ("contract_address"));COMMENT ON TABLE "public"."public_spaces" IS E'Spaces house content restricted to token holders of a particular contract address';

alter table "public"."users" drop column "handle" cascade;

alter table "public"."users" drop column "last_seen" cascade;

alter table "public"."users" drop column "last_typed" cascade;

alter table "public"."users" drop column "created_at" cascade;

CREATE TABLE "public"."public_space_memberships" ("wallet_address" text NOT NULL, "contract_address" text NOT NULL, PRIMARY KEY ("wallet_address","contract_address") , FOREIGN KEY ("wallet_address") REFERENCES "public"."users"("wallet_address") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("contract_address") REFERENCES "public"."public_spaces"("contract_address") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."public_space_memberships" IS E'A table to track user memberships to public spaces';

DROP table "public"."test";

alter table "public"."public_spaces" rename to "spaces";

alter table "public"."public_space_memberships" rename to "spaces_memberships";

alter table "public"."spaces_memberships" rename to "space_memberships";

CREATE TABLE "public"."space_messages" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "message" text NOT NULL, "timestamp" timestamptz NOT NULL DEFAULT now(), "sender" text NOT NULL, "space" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("sender") REFERENCES "public"."users"("wallet_address") ON UPDATE restrict ON DELETE no action, FOREIGN KEY ("space") REFERENCES "public"."spaces"("contract_address") ON UPDATE restrict ON DELETE no action, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."space_messages" drop column "space" cascade;

alter table "public"."space_messages" add column "space" text
 not null;

alter table "public"."space_messages" rename column "space" to "space_address";

alter table "public"."space_messages" rename column "sender" to "sender_address";

alter table "public"."spaces" drop constraint "public_spaces_pkey";

alter table "public"."spaces" drop constraint "public_spaces_slug_key";

DROP INDEX IF EXISTS "public"."public_spaces_pkey";

alter table "public"."space_messages" drop constraint "space_messages_sender_fkey";

alter table "public"."spaces" rename column "network" to "blockchain";

comment on table "public"."spaces" is E'Spaces house content restricted to token holders';

alter table "public"."space_memberships" drop constraint "public_space_memberships_pkey";

alter table "public"."space_memberships" drop constraint "public_space_memberships_wallet_address_fkey";

alter table "public"."space_memberships" drop constraint "public_space_memberships_contract_address_fkey";

alter table "public"."spaces" drop constraint "public_spaces_contract_address_key";

DROP INDEX IF EXISTS "public"."public_spaces_contract_address_key";

alter table "public"."space_messages" rename to "messages";

alter table "public"."messages" rename column "space_address" to "space";

alter table "public"."messages" rename column "sender_address" to "sender";

alter table "public"."spaces" drop column "image_url" cascade;

alter table "public"."spaces" drop column "external_link" cascade;

alter table "public"."spaces" drop column "description" cascade;

alter table "public"."spaces" drop column "slug" cascade;

alter table "public"."spaces" drop column "contract_address" cascade;

alter table "public"."spaces" drop column "blockchain" cascade;

alter table "public"."spaces" drop column "name" cascade;

alter table "public"."messages" drop column "space" cascade;

alter table "public"."spaces" add column "contract_address" text
 null;

alter table "public"."spaces" add column "name" text
 null;

alter table "public"."space_memberships"
  add constraint "space_memberships_wallet_address_fkey"
  foreign key ("wallet_address")
  references "public"."users"
  ("wallet_address") on update restrict on delete restrict;

alter table "public"."spaces"
    add constraint "spaces_pkey"
    primary key ("contract_address");

alter table "public"."space_memberships"
  add constraint "space_memberships_contract_address_fkey"
  foreign key ("contract_address")
  references "public"."spaces"
  ("contract_address") on update restrict on delete set null;

alter table "public"."space_memberships"
    add constraint "space_memberships_pkey"
    primary key ("wallet_address", "contract_address");

alter table "public"."messages" add column "space" text
 null;

alter table "public"."messages"
  add constraint "messages_sender_fkey"
  foreign key ("sender")
  references "public"."users"
  ("wallet_address") on update restrict on delete no action;

alter table "public"."messages"
  add constraint "messages_space_fkey"
  foreign key ("space")
  references "public"."spaces"
  ("contract_address") on update no action on delete restrict;

CREATE TABLE "public"."channels" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."messages" rename column "space" to "channel_id";

alter table "public"."messages" drop column "channel_id" cascade;

alter table "public"."messages" add column "channel_id" uuid
 null;

alter table "public"."messages"
  add constraint "messages_channel_id_fkey"
  foreign key ("channel_id")
  references "public"."channels"
  ("id") on update restrict on delete no action;

alter table "public"."space_memberships" drop constraint "space_memberships_contract_address_fkey";

alter table "public"."space_memberships" drop constraint "space_memberships_pkey";

alter table "public"."space_memberships" drop column "wallet_address" cascade;

alter table "public"."space_memberships" drop column "contract_address" cascade;

alter table "public"."space_memberships" add column "wallet_address" text
 null;

alter table "public"."space_memberships" alter column "wallet_address" set not null;

alter table "public"."spaces" drop constraint "spaces_pkey";

alter table "public"."spaces" drop column "contract_address" cascade;

alter table "public"."spaces" drop column "name" cascade;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."spaces" add column "id" uuid
 null default gen_random_uuid();

alter table "public"."spaces" add column "name" text
 null;

alter table "public"."spaces" add column "contract_address" text
 null;

alter table "public"."spaces"
    add constraint "spaces_pkey"
    primary key ("id");

alter table "public"."space_memberships" rename column "wallet_address" to "user_wallet";

alter table "public"."space_memberships" add column "space_id" uuid
 null;

alter table "public"."space_memberships"
    add constraint "space_memberships_pkey"
    primary key ("user_wallet", "space_id");

alter table "public"."space_memberships"
  add constraint "space_memberships_user_wallet_fkey"
  foreign key ("user_wallet")
  references "public"."users"
  ("wallet_address") on update restrict on delete no action;

alter table "public"."space_memberships"
  add constraint "space_memberships_space_id_fkey"
  foreign key ("space_id")
  references "public"."spaces"
  ("id") on update restrict on delete cascade;

alter table "public"."space_memberships" drop constraint "space_memberships_user_wallet_fkey",
  add constraint "space_memberships_user_wallet_fkey"
  foreign key ("user_wallet")
  references "public"."users"
  ("wallet_address") on update restrict on delete cascade;

ALTER TABLE "public"."messages" ALTER COLUMN "timestamp" TYPE time;

ALTER TABLE "public"."messages" ALTER COLUMN "timestamp" TYPE timetz;
alter table "public"."messages" rename column "timestamp" to "created_at";

alter table "public"."channels" add column "space_id" uuid
 null;

alter table "public"."channels"
  add constraint "channels_space_id_fkey"
  foreign key ("space_id")
  references "public"."spaces"
  ("id") on update restrict on delete cascade;
