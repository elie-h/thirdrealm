alter table "public"."space_memberships" drop constraint "space_memberships_user_wallet_fkey",
  add constraint "space_memberships_wallet_id_fkey"
  foreign key ("wallet_id")
  references "public"."wallets"
  ("id") on update restrict on delete cascade;
