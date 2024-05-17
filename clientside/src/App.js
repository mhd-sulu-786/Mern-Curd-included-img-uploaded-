import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateResume from "./Components/CreateResume";
import ShowResumes from "./Components/ShowResumes";
import EdithResume from "./Components/EdithResume";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/add" element={<CreateResume />} />
          <Route path="/" element={<ShowResumes />} />
=======
          <Route path="/" element={<ShowResumes />} />
          <Route path="/add" element={<CreateResume />} />
>>>>>>> 747eeb6 (update edith .jsx)
          <Route path="/edit/:id" element={<EdithResume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
