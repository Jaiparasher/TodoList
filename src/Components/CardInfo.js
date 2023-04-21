import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Cardinfo(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`flex gap-3 ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            className="px-2 bg-[#2e2e2e] border-[#414141] w-[80%] mt-[2px] rounded-lg"
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="flex gap-3 items-center justify-center">
            <button type="submit" className="bg-white py-[1.5px] text-xs font-semibold px-2 text-black rounded-lg">{props.buttonText || "Add"}</button>
            <FontAwesomeIcon onClick={() => setIsEditable(false)} icon={faXmark}/>
          </div>
        </form>
      ) : (
        <p
          className={`px-2 w-full rounded-lg  ${
            props.displayClass ? props.displayClass : "bg-[#2e2e2e]"
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Cardinfo;