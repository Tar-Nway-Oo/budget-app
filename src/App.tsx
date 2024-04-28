import { useState } from "react";
import { useBudgets } from "./contexts/useBudget"
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetModal";
import "./App.css"

export default function App() {
  const { budgets } = useBudgets();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <div className="app">
      <AddBudgetModal showBudgetModal={showBudgetModal} setShowBudgetModal={setShowBudgetModal} />
      <div className="header">
        <h1 className="heading">Budget App</h1>
        <div className="btn-group">
          <button onClick={() => setShowBudgetModal(true)}>Add Budget</button>
          <button>Add Expense</button>
        </div>
      </div>
      <div className="card-container">
        {budgets.map(budget => (
          <BudgetCard key={budget.id} {...budget} showExpenseModal={showExpenseModal} setShowExpenseModal={setShowExpenseModal} />
        ))}
      </div>
    </div>
  )
}
