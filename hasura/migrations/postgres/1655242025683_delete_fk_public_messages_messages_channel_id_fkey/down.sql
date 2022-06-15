alter table "public"."messages"
  add constraint "messages_channel_id_fkey"
  foreign key ("channel_id")
  references "public"."channels"
  ("id") on update restrict on delete no action;
