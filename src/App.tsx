import { useState } from "react";
import { useBudget } from "./contexts/useBudget"
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetModal";
import "./App.css"

export default function App() {
  const {budgets, addBudget} = useBudget();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <AddBudgetModal showModal={showModal} setShowModal={setShowModal} addBudget={addBudget} />
      <div className="header">
        <h1 className="heading">Budget App</h1>
        <div className="btn-group">
          <button onClick={() => setShowModal(true)}>Add Budget</button>
          <button>Add Expense</button>
        </div>
      </div>
      <div className="card-container">
        {budgets.map(budget => (
          <BudgetCard {...budget} />
        ))}
      </div>
    </div>
  )
}
