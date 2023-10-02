import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateUser } from "./pages/CreateUser";
import { UserView } from "./pages/UserView";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="user-view/:id" element={<UserView/>}/>
      </Routes>
    </div>
  );
}

export default App;
