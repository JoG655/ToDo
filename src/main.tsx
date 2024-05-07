import "./index.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ToDoList } from "./components/ToDoList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToDoList />
  </StrictMode>,
);
