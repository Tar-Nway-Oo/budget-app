import { useState } from "react"
import { useBudgets } from "../contexts/useBudget"
import ViewExpensesModal from "./ViewExpensesModal"
import { formatCurrency } from "../utils"
import "./components.css"

type BudgetCardProps = {
   id: string
   name: string
   max: number
}

export default function BudgetCard({id, name, max}: BudgetCardProps) {

  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const {expenses, deleteBudget} = useBudgets();

  const hasExpenses = expenses.some(expense => expense.budgetId === id);

  const filteredExpenses = expenses.filter(expense => expense.budgetId === id);

  const amount = filteredExpenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  const amountIsFull = amount >= max;

  return (
    <div className="card">
      <div className="head">
         <p className="name">{name}</p>
         <p className={amountIsFull ? "full-amount" : ""}>{formatCurrency(amount)} / {formatCurrency(max)}</p>
      </div>
      <div className="btn-group">
         <button className="view-expenses-btn" onClick={() => setShowViewExpensesModal(true)} disabled={!hasExpenses} >View Expenses</button>
         <button className="delete-budget-btn" onClick={() => deleteBudget(id)}>Delete Budget</button>
      </div>
      <ViewExpensesModal budgetId={id} showViewExpensesModal={showViewExpensesModal} setShowViewExpensesModal={setShowViewExpensesModal} />
    </div>
  )
}
