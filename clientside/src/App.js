import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateResume from "./Components/CreateResume";
import ShowResumes from "./Components/ShowResumes";
import EdithResume from "./Components/EdithResume";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<ShowResumes />} />
          <Route path="/add" element={<CreateResume />} />
          <Route path="/edit/:id" element={<EdithResume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
