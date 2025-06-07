import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <h1>My Microservices App</h1>
      <Login />
      <hr style={{ margin: "50px 0", borderColor: "#ccc" }} />{" "}
      {/* Đường phân cách */}
      <Register />
    </div>
  );
}

export default App;
