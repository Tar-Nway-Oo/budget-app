import { useBudgets } from "../contexts/useBudget"
import "./components.css"

type ViewExpensesModalProps = {
  budgetId: string
  showViewExpensesModal: boolean
  setShowViewExpensesModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ViewExpensesModal({budgetId, showViewExpensesModal, setShowViewExpensesModal}: ViewExpensesModalProps) {

  const {viewExpenses} = useBudgets();

  const filteredExpenses = viewExpenses(budgetId);

  return (
    <div className={`view-expenses-modal ${showViewExpensesModal ? "show" : ""}`} onClick={() => setShowViewExpensesModal(false)}>
      {filteredExpenses.map(expense => (
           <p key={expense.id}>{expense.description} <span>{expense.amount}</span></p>
      ))}
    </div>
  )
}
