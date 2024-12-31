import React , {useState , useEffect}from "react";

const UpdatePrice = ({
  details,
  currency,
  setUPdatePriceModel,
  UPDATE_TOKEN_PRICE
  } ) => {
 

    const [updatePrice ,  setUpdatePrice]=useState();


  return  <section className="new-margin ico-contact pos-rel">
       <div className="container">
        <div className="ico-contact__wrap">
          <h2 className="title">Update Token Price<strong className="modelCancel" onClick={()=>setUPdatePriceModel(false)}>X</strong></h2>


        <div className="row">
          <div className="col-lg-12">
            {
      
                <input type="text" 
                placeholder="_price"
                onChange={(e)=>{
                  setUpdatePrice(e.target.value)
                   
                }}
                />
  
            }
          </div>
          <p><strong>
            Current price:
          </strong>
          {details?.tokenPrice}{currency}
          &nbsp; &nbsp;
          <strong>
            Token Balance:
          </strong>
          {details?.matricBal}{details?.symbol}
          </p>
          <div className="ico-contract__btn text-center mt-10">
<button onClick={()=>UPDATE_TOKEN_PRICE(updatePrice)} className="thm-btn">Update Price</button>
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

export default UpdatePrice;
