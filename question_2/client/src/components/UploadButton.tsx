import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaUpload } from "react-icons/fa";
import { instance } from "@/utils/axios";
import { useToast } from "./ui/use-toast";
import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function UploadButton({
  fetchUserDocuments,
}: {
  fetchUserDocuments: () => void;
}) {
  const [progress, setProgress] = React.useState(0);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await instance.post("/document", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
          );
          console.log(percentCompleted);
          setProgress(percentCompleted);
        },
      });
      // loading
      if (response.status === 201) {
        // Handle successful upload
        console.log(response, "<<<<<<<< upload");
        toast({
          title: "Document Uploaded",
          description: "Document has been uploaded successfully",
        });
        setProgress(100);
        fetchUserDocuments();
      }
      // Reset progress bar
      setProgress(0);
    } catch (error: unknown) {
      console.log(error);
      // Handle error
    }
  };
  return (
    <Drawer>
      <DrawerTrigger className="text-white flex gap-2 items-center hover:bg-green-700 bg-green-600 p-3 rounded-lg">
        <FaCloudUploadAlt />
        Upload Document
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upload Document</DrawerTitle>
          <DrawerDescription>
            Any format (zip, txt, jpeg, png) are accepted.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              // Handle file upload here
              if (file) {
                handleUpload(file);
              }
            }}
          />
          <Progress value={progress} className="w-[100%]" />
          <label
            htmlFor="fileUpload"
            className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaUpload />
            Choose File
          </label>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
