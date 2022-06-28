import type {
  Space,
  Collection,
  WalletSpaceMembership,
  Wallet,
} from "@prisma/client";

export interface SpaceWithCollection extends Space {
  collection: Collection;
  _count: {
    members: number;
  };
}

export interface WalletWithMemberships extends Wallet {
  memberships: {
    space: SpaceWithCollection;
  }[];
}
