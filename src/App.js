import React, { useState } from "react";
import { useEffect } from "react";
import AddCard from "./Components/AddCard";
import Board from "./Components/Board";
import Editable from './Components/Editable';

function App() {
  const [openAddCard,setOpenAddCard]=useState(false);
  const [target,setTarget]=useState({
    cid:"",
    bid:""
  })
  const [boards,setBoards]=useState([
    {
      id:Date.now()+Math.random()*2,
      title:"Todo",
      cards:[
       { 
        id:Date.now()+Math.random(),
        title:"Card 1",
        tasks:[],
        desc:"make a coffee",
        date:""
      },
      { 
        id:Date.now()+Math.random(),
        title:"Card 2",
        tasks:[],
        desc:"learn es6",
        date:""
      },
      ]
    }
  ]);
 
  const addCard=(title,desc,task,bid)=>{
    const card={
      id:Date.now()+Math.random(),
      title,
      tasks:task,
      desc,
      date:""
    }

    // eslint-disable-next-line eqeqeq
    const index=boards.findIndex((item)=>item.id==bid)
    if(index<0) return;

    const tempBoards=[...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  }
  
  const removeCard=(cid,bid)=>{
    const bIndex=boards.findIndex((item)=>item.id===bid);
    if(bIndex<0) return;

    const cIndex=boards[bIndex].cards.findIndex((item)=>item.id===cid);
    if(cIndex<0) return;

    const tempBoards=[...boards];
    tempBoards[bIndex].cards.splice(cIndex,1);
    setBoards(tempBoards);
  }
    const addBoard=(title)=>{
      setBoards([
        ...boards,
        {
          id:Date.now()+Math.random(),
          title,
          cards:[],
        },
      ]);
    }
  
  const removeBoard=(bid)=>{
    const tempBoards=boards.filter(items=>items.id!==bid);

    setBoards(tempBoards )

  }

  const handleDragEnter=(cid,bid)=>{
    let s_bIndex,s_cIndex,t_bIndex,t_cIndex;

    s_bIndex=boards.findIndex(item=>item.id===bid)
    if(s_bIndex<0) return;

    s_cIndex=boards[s_bIndex].cards?.findIndex(item=>item.id===cid);
     if(s_cIndex<0)return;

     t_bIndex=boards.findIndex(item=>item.id===target.bid)
    if(t_bIndex<0) return;

    t_cIndex=boards[t_bIndex].cards?.findIndex(item=>item.id===target.cid);
     if(t_cIndex<0)return;
     
   console.log(s_bIndex,s_cIndex,t_bIndex,t_cIndex);
     const tempboards=[...boards];
     const tempCard=tempboards[s_bIndex].cards[s_cIndex];

     tempboards[s_bIndex].cards.splice(s_cIndex,1);
     tempboards[t_bIndex].cards.splice(t_cIndex,0,tempCard);

     setBoards(tempboards);
  }

  const handleDragEnd=(cid,bid)=>{
  setTarget({
    cid,
    bid
  });

  }  

  const updateCard=(cid,bid,card)=>{
    const bIndex=boards.findIndex((item)=>item.id===bid);
    if(bIndex<0) return;

    const cIndex=boards[bIndex].cards.findIndex((item)=>item.id===cid);
    if(cIndex<0) return;

    const tempBoards=[...boards];
    tempBoards[bIndex].cards[cIndex]=card;
    setBoards(tempBoards);
  }

 useEffect(()=>{
  localStorage.setItem('kanban',JSON.stringify(boards));
 },[boards])

return (
    <div>
    <AddCard open={openAddCard} board={boards} onClose={()=>setOpenAddCard(false)} onSubmit={addCard}/>
    <div className="h-[100vh] w-full flex flex-col -z-10">
     <div className="app_nav w-full px-[30px] py-[20px] border-solid flex justify-between bg-black border-b-2">
      <h2 className="text-white text-3xl">Kanban</h2>
      <button onClick={()=>setOpenAddCard(true)} className="text-white bg-[#343333] text-sm rounded-md p-2">+ Add New Task</button>
     </div>
     <div className="app_outer w-full flex-1 overflow-x-auto ">
      <div className="app_board p-5 pb-0 min-w-fit h-[90%] flex gap-8">
        {
          boards.map((item)=><Board
          key={item.id}
          board={item}
          removeBoard={removeBoard}
          removeCard={removeCard}
          handleDragEnd={handleDragEnd}
          handleDragEnter={handleDragEnter}
          updateCard={updateCard}
          />)
        }
        <Editable
        onSubmit={value=>addBoard(value)} 
        />
      </div>
     </div>
    </div>
    </div>
  );
}

export default App;
