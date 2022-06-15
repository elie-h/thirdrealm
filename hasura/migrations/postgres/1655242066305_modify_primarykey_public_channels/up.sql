BEGIN TRANSACTION;
ALTER TABLE "public"."channels" DROP CONSTRAINT "channels_pkey";

ALTER TABLE "public"."channels"
    ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("name", "space_id");
COMMIT TRANSACTION;
