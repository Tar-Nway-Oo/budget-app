import { ReactNode, createContext, useContext, useState } from "react"
import {v4 as uuidV4} from "uuid"

type BudgetContextType = {
   budgets: budgets[]
   addBudget: ({name, max}: Partial<budgets>) => void;
}

type BudgetContextProviderProps = {
   children: ReactNode
}

export type budgets = {
   id: string
   name: string
   max: number
}

const initContext = {
   budgets: [],
   addBudget: () => {}
}

const BudgetContext = createContext<BudgetContextType>(initContext);

export function useBudgets() {
   return useContext(BudgetContext);
}

export default function BudgetContextProvider({children}: BudgetContextProviderProps) {

   const [budgets, setBudget] = useState<budgets[]>([]);

   function addBudget({name, max}: Partial<budgets>) {
      if (name == null || max == null) return;
      setBudget(prevBudgets => ([...prevBudgets, {id: uuidV4(), name, max}]));
   }

   return (
      <BudgetContext.Provider value={{budgets, addBudget}}>
         {children}
      </BudgetContext.Provider>
   )
}


