import React, { useState, useEffect } from "react";
import "./style/App.less";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";

function App() {
  const [state, setState] = useState([
    { itemName: "Задача 1", quantity: 4, isCoplete: false },
    { itemName: "Задача 2", quantity: 2, isCoplete: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleBtnAdd = () => {
    if (inputValue) {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
      };
      setState([...state, newItem]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBtnAdd(e);
    }
  };

  const handleBtnLeft = (index) => {
    const itemNew = [...state];
    if (itemNew[index].quantity > 1) {
      itemNew[index].quantity--;
      setState(itemNew);
    }
    totalItemCountTodo();
  };

  const handleBtnRight = (index) => {
    const itemNew = [...state];
    itemNew[index].quantity++;
    setState(itemNew);
    totalItemCountTodo();
  };

  const handleComplete = (index) => {
    const newItem = [...state];
    newItem[index].isCoplete = !newItem[index].isCoplete;
    setState(newItem);
  };

  const totalItemCountTodo = () => {
    const totalCount = state.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalCount);
  };

  useEffect(() => {
    totalItemCountTodo();
  });

  const handleItemDelete = (index) => {
    const newItem = [...state];
    if(window.confirm('Вы действительно хотите удалить задачу?')){
      const del = newItem.filter((_, i) => i !== index);
      setState(del);
    }
    
  
  };

  return (
    <div className="todo">
      <div className="todo_head">
        <h2>To-do List</h2>
        <div className="todo_input">
          <input
            className="input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            type="text"
            placeholder="Добавить задачу..."
            onKeyDown={handleKeyPress}
          />
          <AiOutlinePlus
            onClick={() => handleBtnAdd()}
            className="plus"
            width="2em"
            height="2em"
          />
        </div>
      </div>
      {state.map((item, index) => {
        return (
          <div className="todo_item" key={index}>
            <div onClick={() => handleComplete(index)}>
              {item.isCoplete ? (
                <div className=" todo_item_check">
                  <BsCheckCircle className="check_circle" />
                  <span>{item.itemName}</span>
                </div>
              ) : (
                <div className="todo_item_title">
                  <BsCircle />
                  <span>{item.itemName}</span>
                </div>
              )}
              {/* <span>{new Date().toLocaleDateString()}</span> */}
            </div>
            <div className="todo_btn_wrap">
              <div className="todo_item_btn">
                <AiOutlineLeft onClick={() => handleBtnLeft(index)} />
                <span>{item.quantity}</span>
                <AiOutlineRight onClick={() => handleBtnRight(index)} />
              </div>
              <div className="todo_item_delete">
                <BsTrash onClick={() => handleItemDelete(index)} />
              </div>
            </div>
          </div>
        );
      })}
      <hr></hr>
      <div className="todo_total ">Количество: {totalItemCount}</div>
    </div>
  );
}

export default App;
