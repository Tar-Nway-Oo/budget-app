import { useBudgets } from "../contexts/useBudget"
import { formatCurrency } from "../utils"
import "./components.css"

type ViewExpensesModalProps = {
  budgetId: string
  showViewExpensesModal: boolean
  setShowViewExpensesModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ViewExpensesModal({budgetId, showViewExpensesModal, setShowViewExpensesModal}: ViewExpensesModalProps) {

  const {budgets, getExpenses} = useBudgets();
  const selectedBudget = budgets.find(budget => budget.id === budgetId);
  const filteredExpenses = getExpenses(budgetId);

  return (
    <div className={`view-expenses-modal ${showViewExpensesModal ? "show" : ""}`}>
      <div className="header">
        <p className="heading">Expenses for {selectedBudget?.name}</p>
        <span className="remove-icon" onClick={() => setShowViewExpensesModal(false)}>&times;</span>
      </div>
      <div className="list">
        {filteredExpenses.map(expense => (
          <p className="list-item" key={expense.id}>{expense.description} <span style={{marginLeft: "1em"}}>{formatCurrency(expense.amount)}</span></p>
        ))}
      </div>
    </div>
  )
}
