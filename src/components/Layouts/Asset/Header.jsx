const Header = ({title, subTitle}) => {
  return (
    <div className="flex flex-col gap-1 p-2 border-2 rounded-md border-[#00a78e] mb-3">
      <h1 className="text-lg font-bold text-[#00a78e]">{title}</h1>
      <p className="text-sm text-slate-400">
        {subTitle}
      </p>
    </div>
  );
};

export default Header;
