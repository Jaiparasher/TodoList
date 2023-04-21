import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import Modal from "./Modal";

function Card(props) {
  const [showModal,setShowModal]=useState(false)

  return (
    <>
     {showModal&&<Modal card={props.card} boardId={props.boardId} updateCard={props.updateCard} onClose={()=>setShowModal(false)}/>}
    <div
      className="flex flex-col p-[10px] rounded-[5px] bg-white pb-[10px] hover-trigger"
      draggable
      onDragEnd={() => props.handleDragEnter(props.card?.id, props.boardId)}
      onDragEnter={() => props.handleDragEnd(props.card?.id, props.boardId)}
     onClick={()=>setShowModal(true)}
    >
     
      <div className="flex justify-between">
        <div className="text-lg font-bold">{props.card?.title}</div>
        <p
          onClick={() => props.removeCard(props.card?.id, props.boardId)}
          className="relative bottom-1 hidden hover-target"
        >
          <FontAwesomeIcon icon={faXmark} />
        </p>
      </div>
      {
      props.card?.tasks?.length>0&&
      <div className="text-[12px] text-gray-500">{`${props.card?.tasks.filter(item=>item.completed).length} of ${props.card?.tasks?.length} Subtask`}</div>
      }
    </div></>
  );
}

export default Card;
