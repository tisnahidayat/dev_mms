const Input = ({ type, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="px-3 py-1 rounded-md border border-[#00a78e] focus:outline-none focus:ring-2 focus:ring-[#00a78e] focus:shadow-md focus:ring-offset-2 w-full max-w-md mt-2 mb-4"
    />
  );
};

export default Input;
