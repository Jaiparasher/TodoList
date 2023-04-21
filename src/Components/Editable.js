import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Editable = (props) => {
  const [openAddColumn, setOpenAddColumn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  if (!openAddColumn) {
    return (
      <div
        className="max-h-full rounded-lg font-semibold min-w-[250px] flex items-center justify-center bg-gray-50"
        onClick={() => setOpenAddColumn(true)}
      >
        <p>+ Add new board</p>
      </div>
    );
  } else {
    return (
      <div className="max-h-full rounded-lg p-3 w-[250px] bg-gray-100">
        <div className="flex justify-between">
          {" "}
          <p className="font-semibold mb-2">Add new board</p>{" "}
          <p onClick={() => setOpenAddColumn(false)}>
            {" "}
            <FontAwesomeIcon icon={faXmark} />{" "}
          </p>{" "}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenAddColumn(false);
            setInputValue("");
            props.onSubmit(inputValue);
            Editable();
          }}
        >
          <input
            autoFocus
            required
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            className="bg-gray-200 border-black border text-black rounded-lg p-1 px-2 text-sm w-full focus:border-white"
            type="text"
          />
          <div>
            <button
              className="bg-white rounded-lg w-full py-1 mt-2"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default Editable;
