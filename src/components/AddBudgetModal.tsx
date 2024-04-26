import { budgets } from "../contexts/useBudget"
import "./components.css"

type AddBudgetModalProps = {
   showModal: boolean
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>
   addBudget: ({ name, max }: Partial<budgets>) => void
}

export default function AddBudgetModal({showModal, setShowModal}: AddBudgetModalProps) {
  return (
    <div className={`modal ${showModal ? "show" : "hide"}`}>
      <h3>Modal <span onClick={() => setShowModal(false)}>&times;</span></h3>
    </div>
  )
}
