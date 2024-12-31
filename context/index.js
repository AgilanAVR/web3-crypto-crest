import React,{useState} from 'react';
import {ethers} from 'ethers';
import toast from "react-hot-toast";

import {
    CHECK_WALLET_CONNECTED,
    Token_Ico_Contract,
    CONNECT_WALLET,
    GET_BALANCE,
    GET_ACCOUNT_BALANCE,
    ERC20,  //gives the predefinned onject , which contains some of the inforamtion bt the user and the token contract
    ERC20_contract,  //gives the contract interface
    TOKEN_ADDRESS,
    AddTokenToMetaMask,
} from './constants';


//creating the react context and sending all the datas to the app
export const TOKEN_ICO_CONTEXT=React.createContext();
export const TOKEN_ICO_PROVIDER=({children})=>{
   const DAPP_NAME="Token Ico Dapp";
   const currency="ETH";
   const network="Holeskey";
   const [loader , setLoader]=useState(false);
   const [account , setAccount]=useState();
   const [count , setCount]=useState(0);
   
   const notifySuccess =(msg)=>{
   toast.success(msg , {duration:2000});
   }
   
   const notifyError =(msg)=>{
       toast.error(msg , {duration:2000});
       }
   
       //functions  to be passed through the context;
       const TOKEN_ICO=async()=>{
        try {
            const address =await CHECK_WALLET_CONNECTED();
            if(address){
                setLoader(true);
                setAccount(address);
                const contract=await Token_Ico_Contract();
                const tokenDetails=await contract.getTokenDetails();
                const contractOwner=await contract.owner();
                const soldTokens=await contract.soldTokens();

                const ethBal=await GET_BALANCE();
                const token={
                    tokenBal:ethers.formatEther(tokenDetails.balance.toString()),
                    name:tokenDetails.name,
                    symbol:tokenDetails.symbol,
                    supply:ethers.formatEther(tokenDetails.supply.toString()),
                    tokenPrice: ethers.formatEther(tokenDetails.tokenprice.toString()),
                    tokenAddress: ethers.formatEther(tokenDetails.tokenaddress),
                    matricBal:ethBal,
                    address:address.toLowerCase(),
                    owner:contractOwner.toLowerCase(),
                    soldTokens:soldTokens.toString(),

                }
                console.log(token);
                setLoader(false);
                return token;
            }
        } catch (error) {
            console.log(error);
        }
       }

       const BUY_TOKEN=async({_amount})=>{
        try {
            const address =await CHECK_WALLET_CONNECTED();
            setLoader(true);
            if(address){
                const contract=await Token_Ico_Contract();
                const tokenDetails=await contract.getTokenDetails();
                const availableBalanace=ethers.formatEther(tokenDetails.balance.toString());

                if(availableBalanace >1){
                    const price=ethers.formatEther(tokenDetails.tokenprice.toString()); //0.001
                    const payAmount=BigInt(_amount) * (ethers.parseUnits(price.toString(), "ether"));

                    //making transactions
                    const transaction=await contract.buyToken(_amount,{
                        value:payAmount.toString()
                    })
                    await transaction.wait();
                    setLoader(false);
                    notifySuccess("Tranaction Completed Successfully");
                    window.location.reload();
                }
            }
            
        } catch (error) {
            console.log(error);
            notifyError("Error , Try again later");
            setLoader(false);
        }
       }

       const TOKEN_WITHDRAW=async()=>{
        try {
            const address =await CHECK_WALLET_CONNECTED();
            setLoader(true);
            if(address){
                const contract=await Token_Ico_Contract();
                const tokenDetails=await contract.getTokenDetails();
                const availableBalanace=ethers.formatEther(tokenDetails.balance.toString());

                if(availableBalanace>1){
                 const transaction=await contract.withdrawAllTokens();
                 await transaction.wait();
                 setLoader(false);
                 notifySuccess("Tranaction Completed Successfully");
                 window.location.reload();
                }
            }
            
            
        } catch (error) {
            console.log(error);
            notifyError("Error , Try again later");

        }
       }

       const UPDATE_TOKEN=async(_tokenAddress)=>{
        try {
            
            const address =await CHECK_WALLET_CONNECTED();
            setLoader(true);
            if(address){
                const contract=await Token_Ico_Contract();
                const transaction =await contract.uptateToken(_tokenAddress);
                await transaction.wait();
                setLoader(false);
                notifySuccess("Tranaction Completed Successfully");
                window.location.reload();

 
            }
        } catch (error) {
            console.log(error);
            notifyError("Error , Try again later");
        }
       }
       
       const UPDATE_TOKEN_PRICE=async(_tokenPrice)=>{
        try {
            
            const address =await CHECK_WALLET_CONNECTED();
            setLoader(true);
            if(address){
                const contract=await Token_Ico_Contract();
                const price=ethers.parseUnits(_tokenPrice.toString(), "ether");
                const transaction =await contract.updateTokenSalePrice(price);
                await transaction.wait();
                setLoader(false);
                notifySuccess("Tranaction Completed Successfully");
                window.location.reload();

 
            }
        } catch (error) {
            console.log(error);
        }
       }

       const  DONATE=async(_amount)=>{
        try {
                        
            const address =await CHECK_WALLET_CONNECTED();
            setLoader(true);
            if(address){
                const contract=await Token_Ico_Contract();
                const price=ethers.parseUnits(_amount.toString(), "ether");
                const transaction =await contract.transferToOwner(price, {
                    value:price.toString()
                });
                await transaction.wait();
                setLoader(false);
                notifySuccess("Tranaction Completed Successfully");
                window.location.reload();
 
            }
            
        } catch (error) {
            console.log(error);
        }
       }

       const  TRANSFER_ETHER=async({_amount , _receiver })=>{
        try {
            const address =await CHECK_WALLET_CONNECTED();
            setLoader(true);
            if(address){
                const contract=await Token_Ico_Contract();
                const price=ethers.parseUnits(_amount.toString(), "ether");
                const transaction =await contract.transferEther(_receiver ,price, {
                    value:price.toString()
                });
                await transaction.wait();
                setLoader(false);
                notifySuccess("Tranaction Completed Successfully");
                window.location.reload();
 
            }
            
        } catch (error) {
            console.log(error);
        }
       }


       const  TRANSFER_TOKEN=async({_sendTo , _amount , _tokenAddress})=>{
            try {
                console.log({_sendTo , _amount , _tokenAddress});
                const address =await CHECK_WALLET_CONNECTED();
                setLoader(true);
                if(address){
                    const contract=await ERC20_contract(_tokenAddress);
                    const price=ethers.parseUnits(_amount.toString(), "ether");

                       // Use BigInt for gas limit
                        // const gasLimit = 8000000n;

                        // const hexGasLimit = ethers.utils.hexlify(gasLimit);

                    const transaction =await contract.transfer(_sendTo ,price);
                    await transaction.wait();
                    setLoader(false);
                    notifySuccess("Tranaction Completed Successfully");
                    window.location.reload();
     
                }
            
        } catch (error) {
            console.log(error);
        }
       }




       //passing the context and propping the index
       return(
        <TOKEN_ICO_CONTEXT.Provider
        value={{
            TOKEN_ICO , 
            BUY_TOKEN , 
            TOKEN_WITHDRAW , 
            UPDATE_TOKEN , 
            UPDATE_TOKEN_PRICE , 
            DONATE , 
            TRANSFER_ETHER , 
            TRANSFER_TOKEN,
            CONNECT_WALLET,
            GET_ACCOUNT_BALANCE,
            ERC20,
            TOKEN_ADDRESS,
            AddTokenToMetaMask,
            DAPP_NAME,
            currency,
            network,
            loader,
            account,
            count,
            setAccount,
            notifySuccess,
            notifyError
        }}
        >
            {children}
        </TOKEN_ICO_CONTEXT.Provider>
       )






}