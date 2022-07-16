import type { Community, Wallet } from "@prisma/client";

export interface CommunityWithMembersCount extends Community {
  _count: {
    members: number;
  };
}

export interface WalletWithMemberships extends Wallet {
  memberships: {
    community: Community;
  }[];
}
