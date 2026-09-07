import { useState } from "react";
import { Parent } from "./Day01/Day01";
import ToDoList from "./Day02/TodoList";
import ShoppingCart from "./Day03/ShoppingCart";
import { StopWatch } from "./Day04/StopWatch";
import "./App.css";
import { ParentForm } from "./Day05/Registration";
import { Day06 } from "./Day06/Day06";
import { Day07 } from "./Day07/Day07";
import CartManager from "./Day08/CartManager";

function App() {
  const [day, setDay] = useState(0);

  return (
    <div className="app">
      <header className="appHeader">
        <h1>React Mastery Challenge</h1>
        <p>7 Days of React • Learn by Building</p>
      </header>

      <nav className="dayNavigation">
        <button className={day === 1 ? "dayButton active" : "dayButton"} onClick={() => setDay(1)} >
          <span>Day 1</span>
          <small>User Profile Card</small>
        </button>

        <button className={day === 2 ? "dayButton active" : "dayButton"} onClick={() => setDay(2)}>
          <span>Day 2</span>
          <small>User Registration Form</small>
        </button>

        <button className={day === 3 ? "dayButton active" : "dayButton"} onClick={() => setDay(3)}>
          <span>Day 3</span>
          <small>Notification & Settings</small>
        </button>

        <button className={day === 4 ? "dayButton active" : "dayButton"} onClick={() => setDay(4)}>
          <span>Day 4</span>
          <small>To Do List</small>
        </button>

        <button className={day === 5 ? "dayButton active" : "dayButton"} onClick={() => setDay(5)}>
          <span>Day 5</span>
          <small>User Directory</small>
        </button>

        <button className={day === 6 ? "dayButton active" : "dayButton"} onClick={() => setDay(6)}>
          <span>Day 6</span>
          <small>Cart Manager</small>
        </button>

        <button className={day === 7 ? "dayButton active" : "dayButton"} onClick={() => setDay(7)}>
          <span>Day 7</span>
          <small>Shopping Cart</small>
        </button>

        <button className={day === 8 ? "dayButton active" : "dayButton"} onClick={() => setDay(8)}>
          <span>Day 8</span>
          <small>Stop Watch</small>
        </button>
      </nav>

      <main className="challengeContent">
        {day === 1 && <Parent />}
        {day === 2 && <ParentForm />}
        {day === 3 && <Day06 />}
        {day === 4 && <ToDoList />}
        {day === 5 && <Day07 />}
        {day === 6 && <CartManager />}
        {day === 7 && <ShoppingCart />}
        {day === 8 && <StopWatch />}
      </main>
    </div>
  );
}

export default App;