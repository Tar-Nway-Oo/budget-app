import { FormEvent, useRef } from "react"
import { useBudgets } from "../contexts/useBudget"
import "./components.css"

type AddBudgetModalProps = {
   showBudgetModal: boolean
   setShowBudgetModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddBudgetModal({showBudgetModal, setShowBudgetModal}: AddBudgetModalProps) {

  const {addBudget} = useBudgets();
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameRef.current == null || maxRef.current == null) return;
    addBudget({name: nameRef.current.value, max: parseInt(maxRef.current.value)});
    setShowBudgetModal(false);
    nameRef.current.value = "";
  }

  return (
    <form className={`modal ${showBudgetModal ? "show" : ""}`} onSubmit={handleSubmit}>
      <p className="form-heading">New Budget</p>
      <div className="input-group">
        <label htmlFor="name">Name: </label>
        <input ref={nameRef} id="name" type="text" autoFocus required />
      </div>
      <div className="input-group">
        <label htmlFor="maximum-amount">Maximum Amount: </label>
        <input ref={maxRef} id="maximum-amount" defaultValue={100} type="number" required />
      </div>
      <div className="btn-group">
        <button className="cancel-btn" type="button" onClick={() => setShowBudgetModal(false)}>Cancel</button>
        <button className="add-btn" type="submit">Add</button>
      </div>
    </form>
  )
}
