export interface NFT {
  id: number;
  name: string;
  description: string;
  url: string;
  image?: string;
  price: number;
  minted?: boolean;
}
