ALTER TABLE "public"."messages" ALTER COLUMN "id" TYPE text;
alter table "public"."messages" alter column "id" set default gen_unique_short_id();
