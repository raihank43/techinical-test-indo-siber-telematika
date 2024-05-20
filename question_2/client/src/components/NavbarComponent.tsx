import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ImExit } from "react-icons/im";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-xl rounded-b-2xl">
      <div className="text-black">ShareFlow</div>
      <div>
        <Link to="/login" className="text-white mr-4">
          Login
        </Link>
        <Link to="/register" className="text-white">
          Register
        </Link>
      </div>
      <Button
        onClick={handleLogout}
        className="flex gap-2 items-center bg-transparent  hover:bg-yellow-200 hover:text-black text-yellow-500 font-bold py-2 px-4 rounded"
      >
        <ImExit /> Logout
      </Button>
    </nav>
  );
}
