import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cardinfo from "./CardInfo";
import { useState } from "react";
import { useEffect } from "react";
import "./Board.css";

const Modal = (props) => {
  const [values, setValues] = useState({ ...props.card });

  const calculatePercent = () => {
    if (values.tasks?.length === 0) return "0";
    const completed = values.tasks?.filter((item) => item.completed)?.length;

    return (completed / values.tasks?.length) * 100 + "";
  };

  useEffect(() => {
    props.updateCard(values.id, props.boardId, values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const addTask=(value)=>{
    const task={
      id:Date.now()+Math.random(),
      text:value,
      completed:false
    }
    setValues({...values,tasks:[...values.tasks,task]})
  }

  const removeTask=(id)=>{
    const index=values.tasks?.findIndex(item=>item.id===id);
    if(index<0)return

    const tempTasks=values.tasks?.splice(index,1);
    setValues({...values,tasks:tempTasks})
  }

  const updateTask=(id,completed)=>{
    const index=values.tasks?.findIndex(item=>item.id===id);
    if(index<0)return;

    const tempTask=[...values.tasks];
    tempTask[index].completed=completed;
    setValues({...values,tasks:tempTask})
   }

  return (
    <div
      onClick={() => props.onClose()}
      className="modal fixed top-0 left-0 h-[100vh] w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal_content w-[500px] pb-[20px] overflow-y-auto max-h-[95vh] flex flex-col p-4 gap-4 bg-[#171717] text-white z-10 rounded-lg custom-scroll"
      >
        <div className="gap-1 flex flex-col">
          <h2 className="font-semibold text-xl">Title</h2>
          <Cardinfo
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            buttonText="Set Title"
            onSubmit={(value) => {
              setValues({ ...values, title: value });
            }}
          />
        </div>
        <div className="gap-1 flex flex-col">
          <h2 className="font-semibold text-xl">Description</h2>
          <Cardinfo
            defaultValue={values.desc}
            text={values.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={(value) => {
              setValues({ ...values, desc: value });
            }}
          />
        </div>
        <div className="gap-1 flex flex-col">
          <h2 className="font-semibold text-xl">Date</h2>
          <input
            type="date"
            className="px-2 bg-[#2e2e2e] text-white border-[#414141] rounded-lg"
            defaultValue={
              values.date ? new Date().toISOString().substr(0, 10) : ""
            }
            onChange={(event)=>setValues({...values,date:event.target.value})}
          ></input>
        </div>
        <div className="gap-[6px] flex flex-col">
          <h2 className="font-semibold text-xl">Task</h2>
          <div className="progress h-[10px] rounded-3xl w-full border-white border-solid border">
            <div
              style={{ width: calculatePercent() + "%",
              backgroundColor:calculatePercent()=="100"?"limegreen":""}}
              className="progress_bar relative bottom-[0.5px] bg-cyan-300 h-[8.7px] rounded-3xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            {values.tasks?.map((item) => (
              <div
                key={item.id}
                className="flex gap-2 rounded-lg p-[6px] py-[4px] bg-[#2e2e2e] items-center"
              >
                <input
                  defaultChecked={item.completed}
                  className="w-[15px] mt-[3px] h-[16px]"
                  type="checkbox"
                  onChange={(event)=>updateTask(item.id,event.target.checked)}
                />
                <p className="flex leading-5 flex-1">{item.text}</p>
                <FontAwesomeIcon onClick={()=>removeTask(item.id)} icon={faXmark} />
              </div>
            ))}
          </div>
          <Cardinfo
            text={"Add a Task"}
            placeholder="Enter task"
            displayClass={
              "bg-white text-black flex justify-center font-semibold"
            }
            editClass={"ml-1 flex items-center "}
            onSubmit={(value)=>addTask(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
