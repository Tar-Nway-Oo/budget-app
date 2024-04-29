import { useState } from "react"
import { useBudgets } from "../contexts/useBudget"
import ViewExpensesModal from "./ViewExpensesModal"
import "./components.css"

type BudgetCardProps = {
   id: string
   name: string
   max: number
}

export default function BudgetCard({id, name, max}: BudgetCardProps) {

  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const {expenses} = useBudgets();

  const hasExpenses = expenses.some(expense => expense.budgetId === id);

  return (
    <div className="card">
      <div className="head">
         <p className="name">{name}</p>
         <p>0 / {max}</p>
      </div>
      <div className="btn-group">
         <button onClick={() => setShowViewExpensesModal(true)} disabled={!hasExpenses} >View Expenses</button>
      </div>
      <ViewExpensesModal budgetId={id} showViewExpensesModal={showViewExpensesModal} setShowViewExpensesModal={setShowViewExpensesModal} />
    </div>
  )
}
