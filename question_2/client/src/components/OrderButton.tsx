import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function SortButton({
  setOrderValue,
}: {
  setOrderValue: Dispatch<SetStateAction<string | null>>;
}) {
  const handleOrder = (value: string) => {
    setOrderValue(value);
  };
  return (
    <div className="flex items-center gap-3">
      <Select onValueChange={handleOrder}>
        <SelectTrigger className="w-[180px] bg-purple-600 text-white">
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
