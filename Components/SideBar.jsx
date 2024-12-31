import React from "react";

const SideBar = ({setownerModel, setSide}) => {
  const handleClick = (e , tag) => { e.preventDefault(); // Prevent the default anchor behavior 
    setownerModel(false); // Perform the first action 
    document.getElementById(tag).scrollIntoView({ behavior: 'smooth' }); // Perform the redirection 
    };
  return(
    <aside className="slide-bar">
      <div className="close-mobile-menu" onClick={()=>{setSide(false)}}>
        <a href="/" className="tx-close"></a>
      </div>
      <nav className="side-mobile-menu">
        <a href="/" className="header__logo mb-30">
        <img src="assets/img/logo/logo.svg" alt="" /></a>
        <div className="header-mobile-search">
          <form action="#" role="search">
            <input type="text"  placeholder="search Keywords"/>
            <button type="submit">
              <i className="ti-search"></i>
            </button>
          </form>
        </div>
        <ul id="mobile-menu-active">
          <li>
            <a style={{cursor:"pointer"}} className="scrollspy-btn" onClick={(e)=>{handleClick(e,"heros")}}>Home</a>
          </li>
          <li>
            <a   style={{cursor:"pointer"}} onClick={(e)=>{handleClick(e,"about")}} className="scrollspy-btn">About</a>
          </li>
          <li>
            <a  style={{cursor:"pointer"}} className="scrollspy-btn"  onClick={(e)=>{handleClick(e,"contact")}}>Contact</a>
          </li>
          <li>
            <a  style={{cursor:"pointer"}} className="scrollspy-btn"  onClick={(e)=>{handleClick(e,"resource")}}>Resource</a>
          </li>
          <li>
            <a className="scrollspy-btn"  style={{cursor:"pointer" , color:"#0d6efd" , fontWeight:"600"}}   onClick={()=>{setownerModel(true) }}>Tools</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
};

export default SideBar;
