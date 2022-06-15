alter table "public"."channels" alter column "id" set default gen_random_uuid();
alter table "public"."channels" alter column "id" drop not null;
alter table "public"."channels" add column "id" uuid;
