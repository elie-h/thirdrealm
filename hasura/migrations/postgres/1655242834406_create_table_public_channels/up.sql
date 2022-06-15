CREATE TABLE "public"."channels" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text, "space_id" uuid NOT NULL, PRIMARY KEY ("name","space_id") , FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
