import React,{useContext, useEffect, useState} from "react";

//importing the cmponents
import {
  Footer,Header,About,Brand,Contact, Faq , Features ,Hero ,Loader, Progress,
  SideBar, Team , TokenInfo ,Token, Roadmap ,Popup ,TransferToken ,Owner, TransferCurrency ,Donate ,UpdatePrice ,UpdateAddress

} from '../../Components/index';


//importing the context
import {TOKEN_ICO_CONTEXT} from '../../context/index';
import {shortAddress} from '../../Utils/index';
import { setLocal } from "web3modal";
import Error from "../../Components/Error";


const index = () => {


//checking for metamask
const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true); 
useEffect(() => { 
  if (typeof window.ethereum === 'undefined') { 
    setIsMetaMaskInstalled(false); 
  } });



  //importing the data from the context
  const {
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
    setAccount
}=useContext(TOKEN_ICO_CONTEXT);

//modals for each functionalities
const [ownerModel, setownerModel] = useState(false);
const [buyModel, setBuyModel] = useState(false);   //buying token
const [transferModel, setTransaferModel] = useState(false);  //transafering token
const [transCurrModel, setTransCurrModel] = useState(false);   //transafering currency
const [donateModel, setDonateCurrModel] = useState(false);   //donating currency
const [updatePriceModel, setUPdatePriceModel] = useState(false);
const [side , setSide]=useState(false);
const [updateAddressModel, setUpdateAddressModel] = useState(false);
const [Details, setDetails] = useState({
  tokenBal:"",
  name:"",
  symbol:"",
  supply:"",
  tokenPrice:"",
  tokenAddress: "",
  matricBal: "",
  address:"",
  owner:"",
  soldTokens:0,
});

const [_Loader , setloader]=useState(false);


//loading the data
useEffect(()=>{
  const fetchData=async()=>{
     const items=await TOKEN_ICO();
     setDetails(items);
  }

 fetchData();
},[account]);

  return (<>
  { isMetaMaskInstalled ?<div className="body_wrap">
      {
        ownerModel&& <Owner 
        setownerModel={setownerModel}
        currency={currency}
        details={Details}
        account={account}
        setTransaferModel={setTransaferModel}
        setTransCurrModel={setTransCurrModel}
        setDonateCurrModel={setDonateCurrModel}
        TOKEN_WITHDRAW={TOKEN_WITHDRAW}
        setUPdatePriceModel={setUPdatePriceModel}
        setUpdateAddressModel={setUpdateAddressModel}

        />
      }

      {buyModel && <Popup
      setBuyModel={setBuyModel}
      BUY_TOKEN={BUY_TOKEN}
      currency={currency}
      details={Details}
      account={account}
      ERC20={ERC20}
      TOKEN_ADDRESS={TOKEN_ADDRESS}
      setloader={setloader}
      
      />}


{/* //-------------------this fucntion need to be done third-------------------------- */}

      { 
        transferModel && <TransferToken
        setTransaferModel={setTransaferModel}
        TRANSFER_TOKEN={TRANSFER_TOKEN}
        ERC20={ERC20}
        setloader={setLocal}
        />
      }
      {
        transCurrModel&& <TransferCurrency
        setTransCurrModel={setTransCurrModel}
        TRANSFER_ETHER={TRANSFER_ETHER}
        details={Details}
        currency={currency}
        GET_ACCOUNT_BALANCE={GET_ACCOUNT_BALANCE}
        setloader={setloader}
        />
      }
      {
        donateModel&& <Donate
        details={Details}
        currency={currency}
        setDonateCurrModel={setDonateCurrModel}
        DONATE={DONATE}
        />
      }


      {/* //--------------------second thing to update the token price */}

      {
      updatePriceModel && <UpdatePrice
      details={Details}
      currency={currency}
      setUPdatePriceModel={setUPdatePriceModel}
      UPDATE_TOKEN_PRICE={UPDATE_TOKEN_PRICE}
      />
      }

{/* //--------------------first thing to update the token address */}
      {
        updateAddressModel&& <UpdateAddress
        details={Details}
        currency={currency}
        setUpdateAddressModel={setUpdateAddressModel}
        UPDATE_TOKEN={UPDATE_TOKEN}
        ERC20={ERC20}
        setloader={setloader}
        />

      }


      {_Loader && <Loader/>}


      <Header
      account={account}
      CONNECT_WALLET={CONNECT_WALLET}
      setAccount={setAccount}
      setownerModel={setownerModel}
      shortAddress={shortAddress}
      details={Details}
      currency={currency}
      ownerModel={ownerModel}
      setSide={setSide}
      />

      <SideBar 
      setownerModel={setownerModel} 
      setSide={setSide}
      />
       <Hero
        setBuyModel={setBuyModel}
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setloader={setloader}
        details={Details}
        AddTokenToMetaMask={AddTokenToMetaMask}
    
          />
      <TokenInfo details={Details} currency={currency}/>
      <Contact/> 
      <Footer/> 
    </div> : <div className=""><Error/></div>
    }
</>

  )
};



export default index;
