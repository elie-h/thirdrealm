alter table "public"."messages" alter column "id" set default gen_random_uuid();
ALTER TABLE "public"."messages" ALTER COLUMN "id" TYPE uuid;
