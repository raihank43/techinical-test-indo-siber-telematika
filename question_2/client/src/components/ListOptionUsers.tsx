import { IUser } from "@/interfaces/user-interface";
import { instance } from "@/utils/axios";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ListOptionUsers({
  handleClick,
  clickedId,
}: {
  handleClick: (id: number) => void;
  clickedId: number | null;
}) {
  const [users, setUsers] = React.useState<IUser[]>([]);

  const fetchUserDocuments = async () => {
    try {
      const response = await instance.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUserDocuments();
  }, []);
  return (
    <div className="flex flex-col gap-4 overflow-auto max-h-[500px]">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => handleClick(user.id)}
          className={`flex items-center justify-between p-4 rounded-lg ${
            clickedId === user.id ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/8.x/adventurer/png?seed=${user.name}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
