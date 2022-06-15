alter table "public"."space_memberships" drop constraint "space_memberships_pkey";
alter table "public"."space_memberships"
    add constraint "space_memberships_pkey"
    primary key ("user_wallet", "space_id");
