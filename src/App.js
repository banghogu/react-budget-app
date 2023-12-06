import React, { useState } from "react";
import "./App.css";
import Alert from "./components/Alerttext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setexpenses] = useState([]);

  const [charge, setcharge] = useState("");
  const [amount, setamount] = useState(0);
  const [alert, setalert] = useState({ show: false });
  const [id, setid] = useState("");
  const [edit, setedit] = useState(false);

  const handleCharge = (e) => {
    setcharge(e.target.value);
  };

  const handleAmount = (e) => {
    setamount(e.target.valueAsNumber);
  };

  const Delete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setexpenses(newExpenses);
    handleAlert({ type: "danger", text: "삭제되었습니다." });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge: charge, amount: amount } : item;
        });
        setexpenses(newExpenses);
        setedit(false);
        handleAlert({ type: "success", text: "수정되었습니다." });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge: charge, amount: amount };
        const newExpenses = [...expenses, newExpense];
        setexpenses(newExpenses);
        handleAlert({ type: "success", text: "추가되었습니다." });
      }
      setcharge("");
      setamount(0);
    } else {
      handleAlert({ type: "danger", text: "지출항목은 항상 존재해야 하며, 비용은 0보다 커야합니다" });
    }
  };

  const handleAlert = ({ type, text }) => {
    setalert({ show: true, type: type, text: text });
    setTimeout(() => {
      setalert({ show: false });
    }, 3000);
  };

  const onClick = (e) => {
    e.target.value = "";
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setid(id);
    setcharge(charge);
    setamount(amount);
    setedit(true);
  };

  const clearitems = () => {
    setexpenses([]);
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>가계부</h1>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          onClick={onClick}
          edit={edit}
        />
      </div>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseList expenses={expenses} Delete={Delete} handleEdit={handleEdit} clearitems={clearitems} />
      </div>

      <div style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <p style={{ fontSize: "2rem" }}>
          총지출:
          <span>
            {expenses.reduce((a, b) => {
              return (a += b.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};
export default App;
