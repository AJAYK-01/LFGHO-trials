import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";
import { tokenURIABI } from "../contracts/abis/NFTtoken";
import axios from "axios";

export default function UserNFTList() {
  const [image, setImage] = useState("");
  const INFURA_ID = import.meta.env.VITE_INFURA_ID;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
  );
  const tokenContract = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"; // BAYC contract address
  const tokenId = 112; // A token we'd like to retrieve its metadata of

  const contract = new web3.eth.Contract(tokenURIABI, tokenContract);
  //   const { address } = useAccount();

  function addIPFSProxy(ipfsHash) {
    const URL = "https://ipfs.io/ipfs/";
    const hash = ipfsHash.replace(/^ipfs?:\/\//, "");
    const ipfsURL = URL + hash;

    return ipfsURL;
  }

  useEffect(() => {
    async function getNFTMetadata(url) {
      const newUrl = addIPFSProxy(url);
      axios.get(newUrl).then((res) => {
        const data = res.data;
        setImage(addIPFSProxy(data.image));
      });
    }

    async function getTokenURI() {
      const result = await contract.methods.tokenURI(tokenId).call();

      getNFTMetadata(result);
    }

    getTokenURI();
  }, [contract.methods]);

  return (
    <div>
      <h1>My NFTs</h1>
      <img src={image} alt="NFT image" />
    </div>
  );
}
