
import React, { useState } from 'react'
import "./style/App.less"
import check from "./icon/check.svg";
import circle from "./icon/circle.svg";
import left from "./icon/left.svg";
import plus from "./icon/plus.svg";
import right from "./icon/right.svg";


function App() {
  const [state, setState] = useState([
    { itemName: "item 1", quantity: 4, isCoplete: false },
    { itemName: "item 1", quantity: 2, isCoplete: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const [totalItemCount, setTotalItemCount] = useState(0);

  const totalItemCountTodo = () => {
    const totalItemCount = state.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  };

  
  const hendleBtnAdd = () => {
    if (inputValue) {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
      };
      setState([...state, newItem]);
      setInputValue("");
    }
  };
  const hendleBtnLeft = (index) => {
    const itemNew = [...state];
    if (itemNew[index].quantity > 1) {
      itemNew[index].quantity--;
      setState(itemNew);
    }
    totalItemCountTodo();
  };

  const hendleBtnRight = (index) => {
    const itemNew = [...state];
    itemNew[index].quantity++;
    setState(itemNew);
    totalItemCountTodo();
  };

  const hendleComplete = (index) => {
    const newItem = [...state];
    newItem[index].isCoplete = !newItem[index].isCoplete;
    setState(newItem);

  };


  return (
    <div className="todo">
      <div className="todo_input">
        <input
          className="input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          placeholder="Добавить задачу..."
        />
        <img
          src={plus}
          width="17"
          alt="alt"
          onClick={() => hendleBtnAdd()}
        />
      </div>
      {state.map((item, index) => {
        return (
          <div className="todo_item" key={index}>
            <div onClick={() => hendleComplete(index)}>
              {item.isCoplete ? (
                <div className=" todo_item_check">
                  <img src={check} width="17" alt="ALT" />
                  <span>{item.itemName}</span>
                </div>
              ) : (
                <div className="todo_item_title">
                  <img src={circle} width="17" alt="ALT" />
                  <span>{item.itemName}</span>
                </div>
              )}
            </div>
            <div className="todo_item_btn">
              <img
                src={left}
                width="11"
                alt="alt"
                onClick={() => hendleBtnLeft(index)}
              />
              <span>{item.quantity}</span>
              <img
                src={right}
                width="11"
                alt="alt"
                onClick={() => hendleBtnRight(index)}
              />
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
