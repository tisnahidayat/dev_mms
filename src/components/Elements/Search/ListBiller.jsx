import Dropdown from "./Dropdown";
import Search from "./Search";
import Button from "../Button/Button";

const ListBiller = ({
  searchTerm,
  setSearchTerm,
  dropdownOpen,
  setDropdownOpen,
  handleSortStatus,
  currentStatus,
}) => {
  return (
    <div className="flex gap-3 my-2 items-center">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Dropdown
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        handleSortStatus={handleSortStatus}
        currentStatus={currentStatus}
      />
      <Button className={"w-[20%]"}>Submit</Button>
    </div>
  );
};

export default ListBiller;
