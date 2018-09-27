import React from "react";
import "./Loader.css";
import preloader from "../../../assets/img/preloader.gif";

const loader = () => {
  return (
    <div className="loader text-center">
      <img id="config_data_loader" src={preloader} alt="loader" />
      <br/>
      <span style={{color:'#4c4f54'}}>Loading</span>
    </div>
  );
};

export default loader;
