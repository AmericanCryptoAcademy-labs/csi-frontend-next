import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <div className="w-full mt-2.5  ">
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="w-full px-3 py-1 border border-stroke focus:border-primary outline-none rounded-md "
      />
    </div>
  );
};

export default ColumnFilter;
