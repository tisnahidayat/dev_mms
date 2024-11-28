import React from "react";

const BackgroundLayouts = ({ bgImage }) => {
  return (
    <>
      <div className="absolute top-[6%] left-[10%] flex flex-col">
        <img
          src="/images/logo-bsi.png"
          className="w-32 max-w-xs md:w-52"
          alt="logo-bsi"
        />
      </div>
      <div className="absolute bottom-0 left-0 flex flex-col">
        <img
          src="/images/bg-green.png"
          className="w-24 max-w-xs md:w-52"
          alt=""
        />
      </div>
      <div className="absolute top-0 right-0 flex flex-col">
        <img
          src="/images/bg-orange.png"
          className="w-24 max-w-xs md:w-52"
          alt=""
        />
      </div>
      <img
        src="/images/bg-login.png"
        alt="cover-login"
        className="w-full h-full object-cover"
      />
      {bgImage}
    </>
  );
};

export default BackgroundLayouts;
