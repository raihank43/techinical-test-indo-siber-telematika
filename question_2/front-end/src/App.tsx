import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p className="">adasdasda</p>
      </div>
      <div>
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
