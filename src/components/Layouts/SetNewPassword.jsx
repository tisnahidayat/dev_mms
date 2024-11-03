import BackgroundLayouts from "./Asset/BackgroundLayouts";

const NewPasswordLayouts = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="relative hidden md:flex w-3/5 h-full flex-col">
        <BackgroundLayouts />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white flex flex-col justify-center items-center p-6 md:p-14">
        <div className="flex flex-col justify-center items-center h-full">
          {" "}
          <img
            src="/images/logo-mms.png"
            alt="logo-mms"
            className="w-64 md:w-80 mb-10"
          />
          <div className="w-3/4 flex flex-col">
            <form action="#">
              <h2 className="text-lg md:text-xl font-bold my-3 text-[#00a78e]">
                Set A New Password
              </h2>
              <p className="text-xs md:text-sm text-black my-3">
                New password must be different from your previous used
                passwords.
              </p>
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordLayouts;