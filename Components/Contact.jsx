import React from "react";
import toast from "react-hot-toast";
// import {useForm} from "@formspree/react";

const Contact = () => {
    //toaster function
    const notifySuccess=(msg)=>{
      toast.success(msg,{duration :2000});
    }
    const notifyError=(msg)=>{
      toast.error(msg,{duration :2000});
    }

    // const [state , handleSubmit]=useForm("Agilan");
    // if(state.succeeded){
    //   notifySuccess("Successfully sent");
    //   window.location.reload();
    // }
  return (
    <section id="contact" className="ico-contact pos-rel">
    <div className="container">
      <div className="ico-contact__wrap">
        <h2 className="title">
          Contact with CryptoCrest
        </h2>

     <form action=''>
      <div className="row">
        <div className="col-lg-6">
          <input type="text" id="name" name="name" placeholder="Enter name" />
        </div>
        <div className="col-lg-6">
          <input type="email" id="email" name="email" placeholder="Enter email" />
        </div>
        <div className="col-lg-12">
          <textarea type="message" id="message" name="message" placeholder="Write Your thoughts" />
        </div>

        <div className="ico-contact__btn text-center mt-10">
           <button className="thm-btn" type="submit" >Send Message</button>
        </div>
      </div>
     </form>
      <div className="ico-contact__shape-img">
        <div className="shape shape--1">
          <div className="" data-parallax='{"y":-50}'>
            <img src="assets/img/shape/c_shape1.png" alt="" />
          </div>
          </div>
          <div className="shape shape--2">
          <div className="" data-parallax='{"y":60}'>
            <img src="assets/img/shape/c_shape2.png" alt="" />
          </div>
          </div>
    
      </div>
    </div>
    </div>
    <div className="ico-contact__shape">
      <div className="shape shape--1">
        <img src="assets/img/shape/f_shape1.png" alt="" />
      </div>
      <div className="shape shape--2">
        <img src="assets/img/shape/f_shape2.png" alt="" />
      </div>
      <div className="shape shape--3">
        <img src="assets/img/shape/f_shape3.png" alt="" />
      </div>
    </div>
    </section>
  )
};

export default Contact;
