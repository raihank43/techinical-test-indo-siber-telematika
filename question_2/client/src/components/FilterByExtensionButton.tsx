import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function FilterByExtensionButton({
  setFilterValue,
}: {
  setFilterValue: Dispatch<SetStateAction<string | null>>;
}) {
  const handleFilter = (value: string) => {
    setFilterValue(value);
  };
  return (
    <div className="flex items-center gap-3">
      <Select onValueChange={handleFilter}>
        <SelectTrigger className="w-[180px] bg-cyan-600 text-white">
          <SelectValue placeholder="Filter By Extension" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="jpeg">JPEG</SelectItem>
          <SelectItem value="png">PNG</SelectItem>
          <SelectItem value="zip">ZIP</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="doc">DOC</SelectItem>
          <SelectItem value="docx">DOCX</SelectItem>
          <SelectItem value="xls">XLS</SelectItem>
          <SelectItem value="xlsx">XLSX</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
