import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { instance } from "@/utils/axios";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteButton({
  id,
  fetchUserDocuments,
}: {
  id: number;
  fetchUserDocuments: () => void;
}) {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/document/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        toast({
          title: "Document Deleted",
          description: "Document has been deleted successfully",
        });
        fetchUserDocuments();
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleDelete}
      className="text-white flex gap-2 hover:bg-red-700 bg-red-600"
    >
      <MdDelete />
      Delete
    </Button>
  );
}
