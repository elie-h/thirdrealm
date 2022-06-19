export type Network = "ethereum" | "polygon" | "unknown";

export interface Space {
  id: string;
  name: string | undefined;
  description: string | undefined;
  cover_image: string | undefined;
  blockchain: Network;
}
