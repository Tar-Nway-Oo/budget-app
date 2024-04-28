import { FormEvent, useRef } from "react"
import { useBudgets } from "../contexts/useBudget"
import "./components.css"

type AddExpenseModalProps = {
   budgetId: string | undefined
   showExpenseModal: boolean | undefined
   setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

export default function AddExpenseModal({budgetId, showExpenseModal, setShowExpenseModal}: AddExpenseModalProps) {

  const {addExpense} = useBudgets();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (descriptionRef.current == null || amountRef.current == null) return;
    addExpense({budgetId, description: descriptionRef.current.value, amount: parseInt(amountRef.current.value)});
    setShowExpenseModal && setShowExpenseModal(false);
    descriptionRef.current.value = "";
  }

  return (
    <form className={`modal ${showExpenseModal ? "show" : "hide"}`} onSubmit={handleSubmit}>
      <p className="form-heading">New Expense</p>
      <div className="input-group">
        <label htmlFor="description">Description: </label>
        <input ref={descriptionRef} id="description" type="text" autoFocus required />
      </div>
      <div className="input-group">
        <label htmlFor="amount">Amount: </label>
        <input ref={amountRef} id="amount" defaultValue={100} type="number" required />
      </div>
      <div className="btn-group">
        <button type="button" onClick={() => setShowExpenseModal && setShowExpenseModal(false)}>Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
