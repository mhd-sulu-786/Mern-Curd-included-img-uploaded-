import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateResume from "./Components/CreateResume";
import ShowResumes from "./Components/ShowResumes";
import EdithResume from "./Components/EdithResume";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateResume />} />
          <Route path="/show" element={<ShowResumes />} />
          <Route path="/edit/:id" element={<EdithResume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;