import { FormEvent, useRef } from "react"
import { useBudgets } from "../contexts/useBudget"
import "./components.css"

type AddExpenseModalProps = {
   showBudgetModal: boolean
   showExpenseModal: boolean
   setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseModal({ showBudgetModal, showExpenseModal, setShowExpenseModal }: AddExpenseModalProps) {

  const {budgets, addExpense} = useBudgets();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (budgetRef.current == null || descriptionRef.current == null || amountRef.current == null) return;
    addExpense({budgetId: budgetRef.current.value, description: descriptionRef.current.value, amount: parseInt(amountRef.current.value)});
    setShowExpenseModal(false);
    descriptionRef.current.value = "";
  }

  return (
    <form className={`modal ${(showExpenseModal && !showBudgetModal) ? "show" : ""}`} onSubmit={handleSubmit}>
      <p className="form-heading">New Expense</p>
      <div className="input-group">
        <label htmlFor="description">Description: </label>
        <input ref={descriptionRef} id="description" type="text" required autoFocus />
      </div>
      <div className="input-group">
        <label htmlFor="amount">Amount: </label>
        <input ref={amountRef} id="amount" defaultValue={100} type="number" required />
      </div>
      <select ref={budgetRef}>
        {budgets.map(budget => (
          <option key={budget.id} value={budget.id}>{budget.name}</option>
        ))}
      </select>
      <div className="btn-group">
        <button type="button" onClick={() => setShowExpenseModal(false)}>Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
