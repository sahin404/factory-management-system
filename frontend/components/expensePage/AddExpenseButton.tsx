import { Plus } from "lucide-react"
import { Button } from "../ui/button"

const AddExpenseButton = () => {
  return (
    <div>
        <Button
           
            className="bg-green-800 text-md text-white hover:bg-green-700 py-5 flex items-center gap-2"
          >
            <Plus />
            Add New Expense
          </Button>
    </div>
  )
}

export default AddExpenseButton