import { FormEvent, useRef } from "react"
import { budgets, useBudgets } from "../contexts/useBudget"
import "./components.css"

type AddBudgetModalProps = {
   showModal: boolean
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>
   addBudget: ({ name, max }: Partial<budgets>) => void
}

export default function AddBudgetModal({showModal, setShowModal}: AddBudgetModalProps) {

  const {addBudget} = useBudgets();
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameRef.current == null || maxRef.current == null) return;
    addBudget({name: nameRef.current.value, max: parseInt(maxRef.current.value)});
    setShowModal(false);
  }

  return (
    <form className={`modal ${showModal ? "show" : "hide"}`} onSubmit={handleSubmit}>
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
        <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
