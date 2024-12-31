import React , {useState , useEffect}from "react";
import {shortAddress} from '../Utils/index'

const UpdateAddress = ({
  details,
  currency,
  setUpdateAddressModel,
  UPDATE_TOKEN,
  ERC20,
  setloader
  } ) => {
 
    const [tokenDetails ,setTokenDetails]=useState();
    const [address ,  setaddress]=useState();

    const [transferToken , setTransferToken]=useState();
    
  useEffect(()=>{
    if(transferToken){
      const loadToken=async()=>{
        setloader(true);
        const token=await ERC20(transferToken);
        if(token==undefined)
          console.log("Kindly paste the token address");
        else{
          setTokenDetails(token);
          console.log(token);
        }
        setloader(false);
      }
      loadToken();
    }

  },[transferToken])


  return  <section className="new-margin ico-contact pos-rel">
       <div className="container">
        <div className="ico-contact__wrap">
          <h2 className="title">Update Token Address<strong className="modelCancel" onClick={()=>setUpdateAddressModel(false)}>X</strong></h2>


        <div className="row">
          <div className="col-lg-12">
          {
              tokenDetails?.name ? 
              (<input type="text" value={`name ${tokenDetails?.name} Balance: ${tokenDetails?.balance} ${tokenDetails?.symbol}`} />):
              (
                <input type="text" 
                placeholder="_tokenAddress"
                onChange={(e)=>{
                  setaddress(e.target.value) , setTransferToken(e.target.value)
                }}
                />
              )  
            }
          </div>
          <p>Facts About TMT<strong>
            Current price:
          </strong>
          {details?.tokenPrice}{currency}
          &nbsp; &nbsp;
          <strong>
            Token Balance:
          </strong>
          {details?.tokenBal}{details?.symbol}
          &nbsp; &nbsp;
          <strong sytle={{cursor:"pointer"}} onClick={()=>navigator.clipboard.writeText(details?.tokenAddress)}>Token Address:</strong>
          &nbsp;{shortAddress(details?.tokenAddress)}
          </p>
          <div className="ico-contract__btn text-center mt-10">
<button onClick={()=>UPDATE_TOKEN(address)} className="thm-btn">Update Address</button>
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

export default UpdateAddress;
