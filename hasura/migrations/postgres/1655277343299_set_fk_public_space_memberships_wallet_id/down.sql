alter table "public"."space_memberships" drop constraint "space_memberships_wallet_id_fkey",
  add constraint "space_memberships_user_wallet_fkey"
  foreign key ("user_wallet")
  references "public"."users"
  ("wallet_address") on update restrict on delete cascade;
