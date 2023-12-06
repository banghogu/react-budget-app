import React from "react";
import "./ExpenseList.css";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ Delete, expenses, handleEdit, clearitems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return <ExpenseItem key={expense.id} expense={expense} Delete={Delete} handleEdit={handleEdit} />;
        })}
      </ul>

      {expenses.length > 0 && (
        <button className="btn" onClick={clearitems}>
          목록 지우기
          <MdDelete />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
