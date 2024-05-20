import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NavbarComponent() {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-2xl">
      <div className="text-black">ShareFlow</div>
      <div>
        <Link to="/login" className="text-white mr-4">
          Login
        </Link>
        <Link to="/register" className="text-white">
          Register
        </Link>
      </div>
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </Button>
    </nav>
  );
}
