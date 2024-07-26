/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nft from "../components/Nft";
import styles from "../styles/Home.module.css";
import { NFT } from "../types/NFT";
import useSWR from "swr";

const fetchNfts = async () => {
  const response = await fetch("/api/get-nfts");
  const data = await response.json();

  if (response.ok) {
    return data as NFT[];
  }

  throw new Error(data.error);
}

const Home: NextPage = () => {
  const address = useAddress();

  const { data: nftMetadata, error } = useSWR('get-nfts', () => fetchNfts());

  if (error) return <div>Failed to load NFT data</div>
  if (!nftMetadata) return <div>Loading NFT data..</div>

  console.log({ nftMetadata });

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <h1>Select your DTCSI SII certificate and mint it as an NFT</h1>
          <h3>Note: Mint only the certificate with your name tag</h3>
          <div className={styles.NFTs}>
            {nftMetadata &&
              nftMetadata.map((nft) => <Nft key={nft.id} nft={nft} />)}
          </div>
        </>
      ) : (
        <>
        <img
            src="/dtcsi-logo.png"
            alt="DTCSI Logo"
            className={styles.headerImage} // Add a class to style the image
          />
        <h1>DTCSI NFT Certificate Dapp</h1><ConnectWallet /></>
      )}
    </div>
  );
};

export default Home;
