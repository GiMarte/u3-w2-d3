import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbear from "./components/Navbear";
import Main from "./components/Main";
import TvShows from "./components/TvShows";
import Error from "./components/Error";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbear></Navbear>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/TvShows/:id" element={<TvShows></TvShows>} />
        <Route path="/*" element={<Error></Error>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
