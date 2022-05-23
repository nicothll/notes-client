import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<NotesListPage />} />
        <Route path="/notes/:id" element={<NotePage />} />
      </Routes>
    </div>
  );
}

export default App;
