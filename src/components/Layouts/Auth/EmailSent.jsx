import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendEmailGif from "/images/send-email.gif";
import successEmailGif from "/images/email-success.gif";
import BackgroundLayouts from "../Asset/BackgroundLayouts";

const EmailSent = () => {
  const [gifSource, setGifSource] = useState(sendEmailGif);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGifSource(successEmailGif);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full h-screen items-center justify-between">
      <div className="relative hidden md:flex w-3/5 h-full flex-col">
        <BackgroundLayouts />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white flex flex-col justify-center items-center p-6 md:p-14">
        <div className="w-3/4 flex flex-col md:block">
          <img
            src={gifSource}
            alt="Sending email..."
            className="mb-5 w-40 mx-auto"
          />
          <h1 className="text-xl md:text-2xl font-bold mt-10 text-[#00a78e] text-center">
            Check Your Email
          </h1>
          <p className="text-xs md:text-sm text-black my-2 text-center">
            We sent a password reset link to your email. Please check your
            inbox.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="py-1 rounded-md bg-[#00a78e] hover:bg-[#46BCB0] transition-colors duration-300 font-bold mt-1 text-white w-5/6 text-center focus:outline-none focus:ring-2 focus:ring-[#46BCB0] focus:shadow-lg focus:ring-opacity-50"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
