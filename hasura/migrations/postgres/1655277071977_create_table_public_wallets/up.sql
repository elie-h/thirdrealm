CREATE TABLE "public"."wallets" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "address" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("address"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
