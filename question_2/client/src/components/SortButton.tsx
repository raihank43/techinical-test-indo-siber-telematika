import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function SortButton({
  setSortValue,
}: {
  setSortValue: Dispatch<SetStateAction<string | null>>;
}) {
  const handleSort = (value: string) => {
    setSortValue(value);
  };
  return (
    <div className="flex items-center gap-3">
      <Select onValueChange={handleSort}>
        <SelectTrigger className="w-[180px] bg-purple-600 text-white">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
