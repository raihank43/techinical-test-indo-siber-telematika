import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function LoginPage() {
  document.title = "Login - ShareFlow";
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-purple-500 w-screen h-screen">
      <div className="flex gap-2 p-12 bg-white rounded-lg shadow-2xl">
        <div>
          <img className="w-28 h-10" src="/logo.png"></img>
          <div className="h-full  flex justify-center items-center">
            <img
              className="w-96 h-64"
              src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-18636.jpg?t=st=1716212096~exp=1716215696~hmac=16746597643534ffd43a5368cd531e533344619f8e2df442739279719ff50d7a&w=900"
            ></img>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome to ShareFlow
            </h2>
            <p className="text-gray-500 text-sm">
              Making Document Sharing a Breeze
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>
              <Input
                className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                type="text"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>
              <Input
                className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </Button>
            </div>
            <div className="flex justify-center">
              <p>
                Belum punya akun? Silahkan{" "}
                <Link to={"/register"} className="text-blue-500 underline">
                  Register.
                </Link>
              </p>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs">
            &copy;2024 ShareFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
