import { ReactNode, createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import {v4 as uuidV4} from "uuid"

type BudgetContextType = {
   budgets: budget[]
   addBudget: ({name, max}: Partial<budget>) => void
   expenses: expense[]
   addExpense: ({budgetId, description, amount}: Partial<expense>) => void
   getExpenses: (budgetId: string) => expense[]
   deleteBudget: (budgetId: string) => void
   deleteExpense: (expenseId: string) => void
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

const KEYS = {
   BUDGETS: "budgets",
   EXPENSES: "expenses"
};

const initContext = {
   budgets: [],
   addBudget: () => {},
   expenses: [],
   addExpense: () => {},
   getExpenses: () => [],
   deleteBudget: () => {},
   deleteExpense: () => {}
};

const BudgetContext = createContext<BudgetContextType>(initContext);

export function useBudgets() {
   return useContext(BudgetContext);
}

export default function BudgetContextProvider({children}: BudgetContextProviderProps) {

   const [budgets, setBudgets] = useLocalStorage<budget[]>(KEYS.BUDGETS, []);
   const [expenses, setExpenses] = useLocalStorage<expense[]>(KEYS.EXPENSES, []);

   function addBudget({name, max}: Partial<budget>) {
      if (name == null || max == null) return;
      setBudgets(prevBudgets => {
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

   function getExpenses(budgetId: string) {
      return expenses.filter(expense => expense.budgetId === budgetId);
   }

   function deleteBudget(budgetId: string) {
      setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== budgetId));
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.budgetId !== budgetId));
   }

   function deleteExpense(expenseId: string) {
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
   }

   return (
      <BudgetContext.Provider value={{budgets, addBudget, expenses, addExpense, getExpenses, deleteBudget, deleteExpense}}>
         {children}
      </BudgetContext.Provider>
   )
}


