import { useExpenseStore } from "@/stores/expenseStore";
import { Button } from "../ui/button";

const DeleteExpenseButton = ({ expId }: { expId: string }) => {
  
    const {deleteExpense} = useExpenseStore();
    const handleDelete = async() => {
    await deleteExpense(expId);

  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-white"
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteExpenseButton;
