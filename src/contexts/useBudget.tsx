import { ReactNode, createContext, useContext, useState } from "react"
import {v4 as uuidV4} from "uuid"

type BudgetContextType = {
   budgets: budgets[]
   addBudget: ({name, max}: Partial<budgets>) => void;
   expenses: expenses[]
   addExpense: ({budgetId, description, amount}: Partial<expenses>) => void;
   viewExpenses: (budgetId: string) => expenses[];
}

type BudgetContextProviderProps = {
   children: ReactNode
}

export type budgets = {
   id: string
   name: string
   max: number
}

export type expenses = {
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

   const [budgets, setBudget] = useState<budgets[]>([]);
   const [expenses, setExpenses] = useState<expenses[]>([]);

   function addBudget({name, max}: Partial<budgets>) {
      if (name == null || max == null) return;
      setBudget(prevBudgets => {
         if (prevBudgets.find(budget => budget.name === name) == null) {
            return [...prevBudgets, {id: uuidV4(), name, max}];
         } else {
            return prevBudgets;
         }
      });
   }

   function addExpense({budgetId, description, amount}: Partial<expenses>) {
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


