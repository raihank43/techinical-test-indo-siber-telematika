import { FaSlideshare } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import ListOptionUsers from "./ListOptionUsers";
import { instance } from "@/utils/axios";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";

export default function ShareButton({ documentId }: { documentId: number }) {
  const [clickedId, setClickedId] = React.useState(null as number | null);
  const { toast } = useToast();

  const handleClick = (id: number | null) => {
    if (id !== null) {
      setClickedId(id);
    }
  };

  const handleShare = async () => {
    try {
      console.log({ documentId, clickedId });
      const data = { documentId, targetUserId: clickedId };
      const response = await instance.post("/share-document", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "<<<<<<<<");
      if (response.status === 201) {
        toast({
          title: "Document Shared",
          description: "Document has been shared successfully",
        });
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        // Check if error is an object and not null
        const err = error as { response: { data: { message: unknown } } }; // Type assertion
        if (typeof err.response.data.message === "string") {
          // Check if message is a string
          toast({
            variant: "destructive",
            title: "Sharing Failed.",
            description: err.response.data.message,
          });
        } else if (Array.isArray(err.response.data.message)) {
          // Check if message is an array of strings
          (err.response.data.message as string[]).map((er: string) => {
            toast({
              variant: "destructive",
              title: "Sharing Failed.",
              description: er,
            });
          });
        }
      }
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="bg-green-800 flex items-center gap-2 text-white p-2 rounded-lg text-sm hover:bg-green-950 ease-in-out duration-500 w-24 justify-center">
        {" "}
        <FaSlideshare />
        Share
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Share Document with other people</SheetTitle>
          <SheetDescription>
            You can share document with other people by selecting the list of
            people you want to share with
          </SheetDescription>

          <ListOptionUsers handleClick={handleClick} clickedId={clickedId} />
        </SheetHeader>
        {/* <ListOptionUsers /> */}
        <SheetFooter className="mt-3">
          <SheetClose asChild>
            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </Button>
          </SheetClose>

          <Button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Share
          </Button>
        </SheetFooter>
        <div className="flex flex-col gap-4 p-4"></div>
      </SheetContent>
    </Sheet>
  );
}
