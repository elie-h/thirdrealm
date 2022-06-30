import LRU from "lru-cache";

declare global {
  var __tokenOwnershipCache: LRU<string, number> | undefined;
  var __walletCache: LRU<string, object> | undefined;
}

let tokenOwnershipCache: LRU<string, number>;
let walletCache: LRU<string, object>;
// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  tokenOwnershipCache = new LRU<string, number>({
    max: 10000,
    ttl: 15 * 60 * 1000,
  });
  walletCache = new LRU<string, object>({
    max: 10000,
    ttl: 15 * 60 * 1000,
  });
} else {
  if (!global.__tokenOwnershipCache) {
    global.__tokenOwnershipCache = new LRU<string, number>({
      max: 10000,
      ttl: 15 * 60 * 1000,
    });
  }
  if (!global.__walletCache) {
    global.__walletCache = new LRU<string, object>({
      max: 10000,
      ttl: 15 * 60 * 1000,
    });
  }
  tokenOwnershipCache = global.__tokenOwnershipCache;
  walletCache = global.__walletCache;
}

export { tokenOwnershipCache, walletCache };
