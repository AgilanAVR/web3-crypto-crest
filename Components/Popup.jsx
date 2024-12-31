import React ,{useState, useEffect} from "react";
import {shortAddress} from '../Utils/index'

const Popup = (
  {
    setBuyModel,
    BUY_TOKEN,
    currency,
    details,
    account,
    ERC20,
    TOKEN_ADDRESS,
    setloader
  }
) =>{
   const [amount , setAmount]=useState({
    _amount:0
   });
  const [transferToken , setTransferToken]=useState();

  useEffect(()=>{
    setloader(true);
    ERC20(TOKEN_ADDRESS).then((items)=>{
      setTransferToken(items)
      setloader(false);
    });

  },[])


  return  <section className="new-margin ico-contact pos-rel">
       <div className="container">
        <div className="ico-contact__wrap">
          <h2 className="title">Buy Token <strong className="modelCancel" onClick={()=>setBuyModel(false)}>X</strong></h2>


        <div className="row">

          <div className="col-lg-6">
            <input type="text" placeholder={`Token Balance: ${details?.tokenBal} ${details?.symbol}`} onChange={(e)=>setAmount({...amount ,_amount:e.target.value })} />
          </div>

          <div className="col-lg-6">
            <input type="text" 
            value={amount._amount?`${amount._amount * details?.tokenPrice} ${currency}`:"Calculated amount"}
            />
          </div>

          <div className="col-lg-12">
 <textarea name="message" disabled={true} id="" cols={30} rows={10} placeholder={`Available Tokens: ${details?.tokenBal}${details?.symbol} Token Address: ${shortAddress(details?.tokenAddress)}`}></textarea>
          </div>


        <div className="ico-contract__btn text-center mt-10">
<button onClick={()=>BUY_TOKEN(amount)} className="thm-btn">Buy Token</button>
        </div>

        </div>

        <div className="ico-contact__shape-img">
          <div className="shape shape--1">
            <div className="">
              <img src="assets/img/shape/c_shape1.png" alt="" />
            </div>
          </div>
          <div className="shape shape--2">
          <div className="">
              <img src="assets/img/shape/c_shape2.png" alt="" />
            </div>
            </div>
        </div>
        </div>
       </div>
  </section>
};


export default Popup;
