alter table "public"."messages"
  add constraint "messages_sender_fkey"
  foreign key (sender)
  references "public"."users"
  (wallet_address) on update restrict on delete no action;
alter table "public"."messages" alter column "sender" drop not null;
alter table "public"."messages" add column "sender" text;
