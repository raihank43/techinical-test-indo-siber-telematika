import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { instance } from "@/utils/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
export default function LoginPage() {
  document.title = "Login - ShareFlow";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setLoginData({
      ...loginData,
      [key]: value,
    });
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await instance.post("/auth/login", loginData);
      if (response.status === 201) {
        toast({
          title: "Login Success!",
          description: "Welcome to ShareFlow",
        });
        localStorage.setItem("token", response.data.access_token);
        navigate("/");
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        // Check if error is an object and not null
        const err = error as { response: { data: { message: unknown } } }; // Type assertion
        if (typeof err.response.data.message === "string") {
          // Check if message is a string
          toast({
            variant: "destructive",
            title: "Login Failed.",
            description: err.response.data.message,
          });
        } else if (Array.isArray(err.response.data.message)) {
          // Check if message is an array of strings
          (err.response.data.message as string[]).map((er: string) => {
            toast({
              variant: "destructive",
              title: "Login Failed.",
              description: er,
            });
          });
        }
      }
    }
  };
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

          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>
              <Input
                className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChangeInput}
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
                name="password"
                onChange={handleChangeInput}
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
