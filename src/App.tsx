import { useState } from "react";
import { useBudgets } from "./contexts/useBudget"
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import "./App.css"

export default function App() {
  const { budgets } = useBudgets();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const hasNobudgets = budgets.length === 0;

  return (
    <div className="app">
      <AddBudgetModal showBudgetModal={showBudgetModal} setShowBudgetModal={setShowBudgetModal} />
      <AddExpenseModal showBudgetModal={showBudgetModal} showExpenseModal={showExpenseModal} setShowExpenseModal={setShowExpenseModal} />
      <div className="header">
        <h1 className="heading">Budget App</h1>
        <div className="btn-group">
          <button className="add-budget-btn" onClick={() => setShowBudgetModal(prevState => !prevState)}>Add Budget</button>
          <button className="add-expense-btn" onClick={() => setShowExpenseModal(prevState => !prevState)} disabled={hasNobudgets}>Add Expense</button>
        </div>
      </div>
      <div className="card-container">
        {budgets.map(budget => (
          <BudgetCard key={budget.id} {...budget} />
        ))}
      </div>
    </div>
  )
}
