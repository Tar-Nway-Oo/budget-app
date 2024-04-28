import AddExpenseModal from "./AddExpenseModal"
import "./components.css"

type BudgetCardProps = {
   id: string
   name: string
   amount: number
   max: number
   showExpenseModal: boolean
   setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BudgetCard({id, name, amount, max, showExpenseModal, setShowExpenseModal}: Partial<BudgetCardProps>) {

  return (
    <div className="card">
      <AddExpenseModal budgetId={id} showExpenseModal={showExpenseModal} setShowExpenseModal={setShowExpenseModal} />
      <div className="head">
         <p className="name">{name}</p>
         <p>{amount} / {max}</p>
      </div>
      <div className="btn-group">
         <button onClick={() => setShowExpenseModal && setShowExpenseModal(true)}>Add Expense</button>
         <button>View Expenses</button>
      </div>
    </div>
  )
}
