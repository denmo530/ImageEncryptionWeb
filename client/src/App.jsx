import "./App.css";
import FileUpload from "./components/FileUpload";
import DecryptComponent from "./components/DecryptComponent";

function App() {
  return (
    <div className="App">
      <h1>File Upload and Encryption</h1>
      <FileUpload />
      <DecryptComponent />
    </div>
  );
}

export default App;
