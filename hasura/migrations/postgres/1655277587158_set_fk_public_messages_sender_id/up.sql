alter table "public"."messages"
  add constraint "messages_sender_id_fkey"
  foreign key ("sender_id")
  references "public"."wallets"
  ("id") on update restrict on delete no action;
