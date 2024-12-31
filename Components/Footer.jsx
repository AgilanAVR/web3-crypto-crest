import React from "react";
import {TiSocialFacebook,TiSocialTwitter,TiSocialLinkedin,TiSocialInstagram,TiSocialGithub} from 'react-icons/ti';
import {IoCloudDownload} from 'react-icons/io5';
import {IoIosSend} from 'react-icons/io';

const Footer = () => {
  
  const logoStyle={
    width: '100%', 
    height: '45px', 
    maxWidth: '100%', 
    objectFit: 'cover', 
  }
  return (
    <footer id="resource" className="site-footer footer__ico pos-rel" data-backgroud="assets/img/bg/footer_bg.png">
      <div className="container">
      <div className="row mt-none-30">
        <div className="col-lg-4 mt-30">
            <div className="footer__widget footer__subscribe">
              <h2>Subscribe newsletter</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ut laboriosam voluptatibus ducimus dolor eligendi corporis consectetur inventore doloremque accusamus.</p>
              <form action="">
                <input type="text" placeholder="agilankawin50k@gmail.com" />
                <button>
                  <IoIosSend/>
                </button>
              </form>
            </div>
        </div>
          <div className="col-lg-8 mt-30">
            <div className="footer__widget text-lg-end">
              <h2>Download Document</h2>
              <div className="footer__document ul_li_right">
                <a href="#" className="footer__document-item text-center">
                  <div className="icon">
                    <img src="assets/img/icon/pdf.svg" alt="" />
                  </div>
                  <span className="title">
                     <IoCloudDownload/>
                     WHITE PAPER
                  </span>
                </a>
                <a href="#" className="footer__document-item text-center">
                  <div className="icon">
                    <img src="assets/img/icon/pdf.svg" alt="" />
                  </div>
                  <span className="title">
                     <IoCloudDownload/>
                     ONE PAPER

                  </span>
                </a>
                <a href="#" className="footer__document-item text-center">
                  <div className="icon">
                    <img src="assets/img/icon/pdf.svg" alt="" />
                  </div>
                  <span className="title">
                     <IoCloudDownload/>
                     PRIVACY POLICY
                  </span>
                </a>
                <a href="#" className="footer__document-item text-center">
                  <div className="icon">
                    <img src="assets/img/icon/pdf.svg" alt="" />
                  </div>
                  <span className="title">
                     <IoCloudDownload/>
                     TERMS AND CONDITIONS
                  </span>
                </a>
              </div>
            </div>
          </div>
      </div>

      <div className="footer__bottom ul_li_between mt-50">
          <div className="footer__logo mt-20">
            <a href="#">
              <img style={logoStyle} src="assets/img/logo/CryptoCrest.png" alt="" />
            </a>
          </div>
          <ul className="footer__social ul_li mt-20">
            <li><a href="#">
              <TiSocialFacebook/>
              </a></li>
              <li><a href="#">
              <TiSocialTwitter/>
              </a></li>
              <li><a href="#">
              <TiSocialLinkedin/>
              </a></li>
              <li><a href="#">
              <TiSocialInstagram/>
              </a></li>
              <li><a href="#">
              <TiSocialGithub/>
              </a></li>
          </ul>
      </div>
      </div>
      <div className="footer__copyright mt-35">
      <div className="container">
        <div className="footer__copyright-inner ul_li_between">
        <div className="footer__copyright-text mt-15">
      Copyright @ 2024 @agilan.All rights reserved
        </div>

        <ul className="footer__links ul_li_right mt-15">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Term</a></li>
            <li><a href="#">About</a></li>
        </ul>
        </div>
      </div>
      </div>
      <div className="footer__icon-shape">
        <div className="icon icon--1">
          <div className="">
            <img src="assets/img/shape/f_icon1.png" alt="" />
          </div>
        </div>
        <div className="icon icon--2">
          <div className="">
            <img src="assets/img/shape/f_icon2.png" alt="" />
          </div>
        </div>

      </div>
    </footer>
  )
};

export default Footer;
