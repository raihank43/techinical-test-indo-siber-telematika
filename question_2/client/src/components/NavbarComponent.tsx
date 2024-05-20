import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ImExit } from "react-icons/im";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-slate-100 p-4 flex justify-between items-center shadow-xl rounded-b-2xl">
      <img src="/logo.png" className="w-32 ml-5" alt="logo" />
      <div>
        <p className="font-bold italic"> Making Document Sharing a Breeze</p>
     
      </div>
      <Button
        onClick={handleLogout}
        className="flex gap-2 items-center bg-transparent  hover:bg-yellow-200 hover:text-black text-yellow-700 font-bold py-2 px-4 rounded"
      >
        <ImExit /> Logout
      </Button>
    </nav>
  );
}
