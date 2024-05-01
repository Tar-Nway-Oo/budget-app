import { useBudgets } from "../contexts/useBudget"
import { formatCurrency } from "../utils"
import "./components.css"

type ViewExpensesModalProps = {
  budgetId: string
  showViewExpensesModal: boolean
  setShowViewExpensesModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ViewExpensesModal({budgetId, showViewExpensesModal, setShowViewExpensesModal}: ViewExpensesModalProps) {

  const {budgets, getExpenses, deleteExpense} = useBudgets();
  const selectedBudget = budgets.find(budget => budget.id === budgetId);
  const filteredExpenses = getExpenses(budgetId);

  return (
    <div className={`view-expenses-modal ${showViewExpensesModal ? "show" : ""}`}>
      <div className="header">
        <p className="name">Expenses for {selectedBudget?.name}</p>
        <span className="remove-icon" onClick={() => setShowViewExpensesModal(false)}>&times;</span>
      </div>
      <div className="list">
        {filteredExpenses.map(expense => (
          <div className="list-item" key={expense.id}>
            <p>{expense.description}</p> 
            <p>{formatCurrency(expense.amount)}</p>
            <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
