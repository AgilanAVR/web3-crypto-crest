import React, { useEffect , useState } from "react";
import Link from 'next/link';

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setownerModel,
  shortAddress,
  details,
  currency,
  ownerModel,
  setSide
}) => {





//------------------------------->this is the funciton to handle the user to chamge the accoungts manually
  const [isMetamaskConnected, setMetaMaskConnected] = useState(false);
  useEffect(() => { 
    if (typeof window.ethereum !== "undefined") { 
      setMetaMaskConnected(true); 
      window.ethereum.on("accountsChanged", handleAccountsChanged);
     } else {
       alert("MetaMask is not installed. Please install MetaMask to use this DApp."); } 
       return () => { if (typeof window.ethereum !== "undefined") { 
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged); 
      } }; 
    }, []);

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts[0]);
  };



  //----------------------------------------->this is to connect the user to the wallet and the dapp.
  //connecting metamask
  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts", //requesting the selected one
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install the metamask");
    }
  };

  const logoStyle={
    width: '100%', 
    height: '45px', 
    maxWidth: '100%', 
    objectFit: 'cover', 
  }


  const handleClick = (e , tag) => { e.preventDefault(); // Prevent the default anchor behavior 
  setownerModel(false); // Perform the first action 
  document.getElementById(tag).scrollIntoView({ behavior: 'smooth' }); // Perform the redirection 
  };

  return (
    <header className="site-header header--transparent ico-header">
      <div className="header__main-wrap">
        <div className="container mxw_1640">
          <div className="header__main ul_li_between">
            <div className="header__left ul_li">
              <div className="header__logo">
                <a href="/">
                  <img style={logoStyle} src="assets/img/logo/CryptoCrest.png" alt="" />
                </a>
              </div>
            </div>
            <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li onClick={(e)=>{handleClick(e,"heros")}} className="has-mega-menu">
                    <Link href="/" >
                       Home
                    </Link>
                  </li>
                  <li onClick={(e)=>{handleClick(e,"about")}} >
                    <a className="scrollspy-btn"  >About</a>
                  </li>
                  <li onClick={(e)=>{handleClick(e,"contact")}}>
                    <a  className="scrollspy-btn"  >Contact</a>
                  </li>

                  <li onClick={(e)=>{handleClick(e,"resource")}}>
                    <a className="scrollspy-btn">Resource</a>
                  </li>
                  {/* ---only visible to owner---- */}
                  <li >
                    <a style={{cursor:"pointer" , color:"#0d6efd" , fontWeight:"600"}} onClick={()=>{ownerModel ?setownerModel(false):setownerModel(true)}}>Tools</a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              <div className="d-xl-none">
                <a className="header__bar hamburger_menu" onClick={()=>{setSide(true)}}>
                   <div className="header__bar-icon" >
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                   </div>
                </a>
              </div>

              {account?(
                <div className="header__account">
                  <a href="">
                {shortAddress(details?.address)} : {details?.matricBal.slice(0,6)}  {currency} 

                  </a>
          
                </div>
              ):(
                <div className="header__account">
                  <a onClick={()=>{
                    connectMetamask()
                  }}>Connect Wallet</a>
                </div>
              )

              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
