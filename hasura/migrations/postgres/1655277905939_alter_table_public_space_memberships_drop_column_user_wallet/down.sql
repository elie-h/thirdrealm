comment on column "public"."space_memberships"."user_wallet" is E'A table to track user memberships to public spaces';
alter table "public"."space_memberships" alter column "user_wallet" drop not null;
alter table "public"."space_memberships" add column "user_wallet" text;
