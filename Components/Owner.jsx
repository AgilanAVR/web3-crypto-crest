import React from "react";
import {FaPlus} from "react-icons/fa6";

const Owner = ({
    setownerModel ,
    currency,
    details,
    account,
    setTransaferModel,
    setTransCurrModel,
    setDonateCurrModel,
    TOKEN_WITHDRAW,
    setUPdatePriceModel,
    setUpdateAddressModel
  }) => {
  return(
  <section className="team pos-rel">
      <div className="container">
        <div className="new-owner team__wrap ul_li">
          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/shape/c_shape1.png" alt="" />
            </div>

            <div className="team__info text-center mb-20">
              <h3>TOKEN TRANSFER</h3>
              <span>Any ERC 20</span>
            </div>

            <div className="team__social ul_li_center">
              <span onClick={()=>{(setownerModel(false) , setTransaferModel(true)) }} 
                className="h-icon" style={{cursor:"pointer"}}
                ><FaPlus/></span>
            </div>
          </div>

          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/token/t_info_img.png" alt="" />
            </div>

            <div className="team__info text-center mb-20">
              <h3>TRANSFER FUND</h3>
              <span>{details?.matricBal.slice(0,6)} {currency}</span>
            </div>

            <div className="team__social ul_li_center">
              <span onClick={()=>{(setownerModel(false) , setTransCurrModel(true)) }} 
                className="h-icon" style={{cursor:"pointer"}}
                ><FaPlus/></span>
            </div>
          </div>

          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/shape/c_shape2.png" alt="" />
            </div>

            <div className="team__info text-center mb-20">
              <h3>DONATE FUND</h3>
              <span>If you can</span>
            </div>

            <div className="team__social ul_li_center">
              <span onClick={()=>{(setownerModel(false) , setDonateCurrModel(true)) }} 
                className="h-icon" style={{cursor:"pointer"}}
                ><FaPlus/></span>
            </div>

          </div>

                      {/* ----------only show to the owner */}
                      {
              account==details?.owner && (
                <>
            <div className="team__item">
            <div className="avatar">
              <img src="assets/img/token/t_info_img.png" alt="" />
            </div>

            <div className="team__info text-center mb-20">
              <h3>WITHDRAW</h3>
              <span>ICO Token , Only Owner</span>
            </div>

            <div className="team__social ul_li_center">
              <span onClick={()=>{TOKEN_WITHDRAW()}} 
                className="h-icon" style={{cursor:"pointer"}}
                ><FaPlus/></span>
            </div>

          </div>

          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/token/t_info_img.png" alt="" />
            </div>

            <div className="team__info text-center mb-20">
              <h3>UPDATE TOKEN</h3>
              <span>ICO Token , Only Owner</span>
            </div>

            <div className="team__social ul_li_center">
              <span onClick={()=>{(setownerModel(false) , setUpdateAddressModel(true)) }} 
                className="h-icon" style={{cursor:"pointer"}}
                ><FaPlus/></span>
            </div>

          </div>

          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/token/t_info_img.png" alt="" />
            </div>

            <div className="team__info text-center mb-20">
              <h3>UPDATE TOKEN PRICE</h3>
              <span>ICO Token , Only Owner</span>
            </div>

            <div className="team__social ul_li_center">
              <span onClick={()=>{(setownerModel(false) , setUPdatePriceModel(true)) }} 
                className="h-icon" style={{cursor:"pointer"}}
                ><FaPlus/></span>
            </div>

          </div>
                </>
              )
            }
        </div>
      </div>

  </section>
  )
};

export default Owner;
