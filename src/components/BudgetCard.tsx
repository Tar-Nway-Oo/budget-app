import "./components.css"

type BudgetCard = {
   name: string
   amount: number
   max: number
}

export default function BudgetCard({name, amount = 0, max}: Partial<BudgetCard>) {
  return (
    <div className="card">
      <div className="head">
         <p className="name">{name}</p>
         <p>{amount} / {max}</p>
      </div>
      <div className="btn-group">
         <button>Add Expense</button>
         <button>View Expenses</button>
      </div>
    </div>
  )
}
