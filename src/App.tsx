import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<NotesListPage />} />
          <Route path="/notes/:id" element={<NotePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
