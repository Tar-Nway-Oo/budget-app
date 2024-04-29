import { ReactNode, createContext, useContext, useState } from "react"
import {v4 as uuidV4} from "uuid"

type BudgetContextType = {
   budgets: budget[]
   addBudget: ({name, max}: Partial<budget>) => void;
   expenses: expense[]
   addExpense: ({budgetId, description, amount}: Partial<expense>) => void;
   viewExpenses: (budgetId: string) => expense[];
}

type BudgetContextProviderProps = {
   children: ReactNode
}

export type budget = {
   id: string
   name: string
   max: number
}

export type expense = {
   id: string
   budgetId: string
   description: string
   amount: number
}

const initContext = {
   budgets: [],
   addBudget: () => {},
   expenses: [],
   addExpense: () => {},
   viewExpenses: () => []
};

const BudgetContext = createContext<BudgetContextType>(initContext);

export function useBudgets() {
   return useContext(BudgetContext);
}

export default function BudgetContextProvider({children}: BudgetContextProviderProps) {

   const [budgets, setBudget] = useState<budget[]>([]);
   const [expenses, setExpenses] = useState<expense[]>([]);

   function addBudget({name, max}: Partial<budget>) {
      if (name == null || max == null) return;
      setBudget(prevBudgets => {
         if (prevBudgets.find(budget => budget.name === name) == null) {
            return [...prevBudgets, {id: uuidV4(), name, max}];
         } else {
            return prevBudgets;
         }
      });
   }

   function addExpense({budgetId, description, amount}: Partial<expense>) {
      if (budgetId == null || description == null || amount == null) return;
      setExpenses(prevExpenses => ([...prevExpenses, {id: uuidV4(), budgetId, description, amount}]));
   }

   function viewExpenses(budgetId: string) {
      return expenses.filter(expense => expense.budgetId === budgetId)
   }

   return (
      <BudgetContext.Provider value={{budgets, addBudget, expenses, addExpense, viewExpenses}}>
         {children}
      </BudgetContext.Provider>
   )
}


