import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";

const AddCard = (props) => {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [task,setTask]=useState("");
  const [bid,setbid]=useState(props.board[0]?.id)
  if (!props.open) return null;
  return (
    <div
      onClick={props.onClose}
      className="bg-black bg-opacity-70 absolute flex justify-center items-center w-full h-full "
    >
      <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(title,desc,task,bid);
            setDesc("");
            setTask("");
            setTitle("")
            setbid(props.board[0]?.id);
            props.onClose();
            }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-[#171717] flex flex-col rounded-lg w-[410px] p-4 px-6 text-white min-h-[380px]"
      >
        <div className="flex justify-between">
          <h2 className="text-xl mb-1 font-semibold">Add New Task</h2>{" "}
          <p onClick={props.onClose} className="p-1">
            <FontAwesomeIcon icon={faXmark} />
          </p>{" "}
        </div>
        <label className="pl-[2px] py-1">Title</label>
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          type="text"
          className="bg-[#171717] border-[#414141] border rounded-md pl-2 p-[2px] placeholder:text-sm placeholder:text-gray-500"
          placeholder="e.g. Take coffee break"
        >
        </input>
        <label className="pl-[2px] py-1">Description</label>
        <textarea
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          rows="4"
          className="bg-[#171717] border-[#414141] border rounded-md pl-2 p-[2px] placeholder:text-sm placeholder:text-gray-500"
          name="title"
          placeholder="e.g. It's always good to take a break.This 15 minutes break will recharge the batteries a little."
        ></textarea>
      
        <label className="pl-[2px] py-1">Status</label>
        <select 
         value={bid}
         onChange={(e)=>setbid(e.target.value)}
         className="bg-[#171717] border-[#414141] border text-sm rounded-md pl-2 block focus:ring-blue-500 p-[2px]">
          {
            props.board.map((item)=>{
            return  <option value={item.id}>{item.title}</option>
            })
          }
        </select>
        <button
          className="bg-[#343333] text-white mt-5 p-1 font-medium rounded-2xl"
          type="submit"
        >
          Create Task
        </button>
      </div> 
      </form>
    </div>
  );
};

export default AddCard;
