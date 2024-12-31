//in other projects , we are using the hardhat network on the metamask , here there are some of the networks usees can able to connenct woth , thus the respective network configuration should be added to the walllet , thus it is below

import { ethers } from "ethers";
import Web3Modal from "web3modal";

//internal imports
import {TOKEN_ADDRESS,TokenABI,CONTRACT_ADDRESS,TokenICOABI} from './contractAbi';



// import tokenICO from "./TokenICO.json";
// import erc20 from "./ERC20.json";

// export const TOKEN_ADDRESS = "0x43dFD957bB91b568176E976A8d4e8ab4E94aeBfD";  //ERC20 , the token address is from remix
// export const  TokenABI =erc20.abi ;    //abi of ERC20  from remix deployment

// export const OWNER_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";  //hardhat1 holdings- 100000 tokens , the account who deploy the contract.

// export const CONTRACT_ADDRESS = "0xA303374bda3A6Ce7550514E6681228Ca12020BBA"; //contract address , which is from the deployed on the remix
// export const  TokenICOABI = tokenICO.abi;






//here we are not using the hardhat configuration , we are connecting the separate network
const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};


//function to chmage the network
const changeNetwork = async ({ networkName }) => {  
  try {
    //we are going to check , if the crypto wallrt is present in the computer or not , if the user install any of teh wallet , the etherum onbect will be pushed in the computer
    if (!window.ethereum) throw new Error("No Crtpto Wallet is Found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky";
  await changeNetwork({ networkName });
};

export const CHECK_WALLET_CONNECTED = async () => {
  //this function will called , whenever the page reloads
  if (!window.ethereum) return console.log("No Crtpto Wallet is Found");
  await handleNetworkSwitch();

  //getting the account of the metamask
  const account = await window.ethereum.request({
    method: "eth_accounts",
  });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please Install MetaMask & Connect");
  }
};



//first time connection between metamask and the dapp
export const CONNECT_WALLET = async () => {
  try {
    if (window.ethereum) return console.log("Please Install Metamask");
    await handleNetworkSwitch();
    const account = await windoow.ethereum.request({
      method: "eth_requestAccounts",
    });

    window.location.reload();
    return account[0];
  } catch (error) {
    console.log(error);
  }
};



//connecting the contract
const fetchContract = (address, abi, signer) => {
  return new ethers.Contract(address, abi, signer);  //contract address , abi , signer obj.
};

export const Token_Ico_Contract = async () => {
  try {
    const web3Modal = new Web3Modal(); //creating the instance of web3 modal
    const connection = await web3Modal.connect(); //connecting the user wallet
    const provider = new ethers.BrowserProvider(connection); //wrapping connection obj with the web3 provider
    const signer =await provider.getSigner(); //getting the account which is used to communicate with the contract
    console.log(signer);
    const contract = fetchContract( CONTRACT_ADDRESS,TokenICOABI.abi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};


//getting the token details...
export const ERC20 = async(_address) => {
  try {
    const web3Modal = new Web3Modal(); //creating the instance of web3 modal
    const connection = await web3Modal.connect(); //connecting the user wallet
    const provider = new ethers.BrowserProvider(connection); //wrapping connection obj with the web3 provider
    const signer =await provider.getSigner(); //getting the account which is used to communicate with the contract
    const network = await provider.getNetwork();
    const contract = fetchContract(_address,  TokenABI.abi, signer);

    const userAddress =await signer.getAddress();//checking this address comminication with the token
    const balance = await contract.balanceOf(userAddress);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();

// Convert chainId to hexadecimal string
const chainIdHex = '0x' + network.chainId.toString(16);

// Convert decimals to number
const decimalsNumber = Number(decimals);

    const token = {
      address: userAddress,
      name: name,
      symbol: symbol,
      decimals: decimalsNumber,
      supply: supply.toString(),
      balance: ethers.formatEther(balance.toString()),
      chainId: chainIdHex,
    };

    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};
 

export const ERC20_contract = async (CONTRACTADDRESS) => {
  try {
    const web3Modal = new Web3Modal(); //creating the instance of web3 modal
    const connection = await web3Modal.connect(); //connecting the user wallet
    const provider = new ethers.BrowserProvider(connection); //wrapping connection obj with the web3 provider
    const signer = await provider.getSigner(); //getting the account which is used to communicate with the contract
    const contract = fetchContract(CONTRACTADDRESS,  TokenABI.abi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
}; 

export const GET_BALANCE = async () => {
  try {
    const web3Modal = new Web3Modal(); //creating the instance of web3 modal
    const connection = await web3Modal.connect(); //connecting the user wallet
    const provider = new ethers.BrowserProvider(connection); //wrapping connection obj with the web3 provider
    const signer = await provider.getSigner(); //getting the account which is used to communicate with the contract
    const address = await signer.getAddress(); // Getting the signer's address
    const maticBal = await provider.getBalance(address); // Getting the balance of the signer's address
    return ethers.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};


//getting the particular account balance
export const GET_ACCOUNT_BALANCE = async (account) => {
  try {
    const web3Modal = new Web3Modal(); //creating the instance of web3 modal
    const connection = await web3Modal.connect(); //connecting the user wallet
    const provider = new ethers.BrowserProvider(connection); //wrapping connection obj with the web3 provider
    const maticBal = await provider.getBalance(account); //getting the account which is used to communicate with the contract
    return ethers.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};
//ethers.utils.formatEther(matricBal.toString());

export const AddTokenToMetaMask = async () => {
   if(window.ethereum){
    const tokenDetails=await ERC20(TOKEN_ADDRESS);
    const tokenDecimals=tokenDetails?.decimals;
    const tokenAddress=TOKEN_ADDRESS;
    const tokenSymbol=tokenDetails?.symbol;
    const tokenImage="https://i.ibb.co/dcFWb5T/Leodox.jpg";

   try{
const wasAdded=await window.ethereum.request({
  method:"wallet_watchAsset",
  params:{
    type:"ERC20",
    options:{
      address:tokenAddress,
      symbol:tokenSymbol,
      decimals:tokenDecimals,
      image:tokenImage
    }
  }
})

if(wasAdded)
  console.log("Token Added!");
else
console.log("Token not Added");


   }catch(error){
 console.log(error);
   }
    
}else{
  return "Metamask Not Installed";
}
}
