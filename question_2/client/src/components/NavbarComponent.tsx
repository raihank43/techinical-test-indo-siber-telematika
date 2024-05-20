import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ImExit } from "react-icons/im";
import { FaShareAltSquare } from "react-icons/fa";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-xl rounded-b-2xl">
      <Link to="/" className="flex items-end gap-2">
        <img src="/logo.png" className="w-32 ml-5" alt="logo" />
        <p className=" italic font-bold text-sm text-yellow-500"> Making Document Sharing a Breeze</p>
      </Link>

    
      <div className="flex items-center self-end gap-10">
        <Link to="/shared-document" className="font-bold text-yellow-700 flex items-center gap-2 hover:text-black">
          <FaShareAltSquare />
          Shared Document
        </Link>
        <Button
          onClick={handleLogout}
          className="flex gap-2 items-center bg-transparent  hover:bg-white hover:text-black text-yellow-700 font-bold py-2 px-4 rounded"
        >
          <ImExit /> Logout
        </Button>
      </div>
    </nav>
  );
}
