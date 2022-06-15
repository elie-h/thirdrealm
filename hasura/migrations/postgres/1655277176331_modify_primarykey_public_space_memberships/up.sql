BEGIN TRANSACTION;
ALTER TABLE "public"."space_memberships" DROP CONSTRAINT "space_memberships_pkey";

ALTER TABLE "public"."space_memberships"
    ADD CONSTRAINT "space_memberships_pkey" PRIMARY KEY ("wallet_id", "space_id");
COMMIT TRANSACTION;
