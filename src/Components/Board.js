import React from "react";
import Card from "./Card";
import "./Board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Board = (props) => {
  return (
    <div className="min-w-[250px] max-h-full flex flex-col gap-5 group">
      <div className="flex justify-between">
        <div className="top flex ">
          <p className="title flex-1 flex items-center font-bold">
            {props.board?.title}
            <span className="text-[14px] text-gray-400 ml-1 mt-[0.5px]">
              {props.board?.cards?.length}
            </span>
          </p>
        </div>
        <p
          onClick={() => props.removeBoard(props.board?.id)}
          className="relative top-[2px] right-1 hidden group-hover:block"
        >
          <FontAwesomeIcon icon={faXmark} />
        </p>
      </div>
      <div className="card max-h-full bg-gray-100 flex flex-col gap-[10px] p-[10px] rounded-lg overflow-y-auto custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
