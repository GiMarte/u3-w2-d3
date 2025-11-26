import { useState, useEffect } from "react";
import Footer from "./Footer";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

/* class Main extends Component */
const Main = () => {
  /* state = {
    trendingNow: [],
    watchAgain: [],
    newReleases: [],
    loading: true,
  }; */
  const [trendingNow, setTrendingNow] = useState([]);
  const [watchAgain, setWatchAgain] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const americanPie = "American%20Pie";
  const interstellar = "Interstellar";
  const starWars = "Star%20Wars";
  const URL = `https://www.omdbapi.com/?apikey=b4fec95c&s=`;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchMovies = (query, category, shouldShuffle) => {
    fetch(URL + query)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        const movies = shouldShuffle ? shuffle([...data.Search]) : data.Search;
        /* this.setState({ [category]: movies, loading: false }); */
        if (category === "trendingNow") setTrendingNow(movies);
        if (category === "watchAgain") setWatchAgain(movies);
        if (category === "newReleases") setNewReleases(movies);

        setLoading(false);
      })
      .catch((e) => {
        console.log(`Abbiamo un errore: ${e}`);
      });
  };
  /*  componentDidMount() {
    this.fetchMovies(this.americanPie, "trendingNow", false);
    this.fetchMovies(this.interstellar, "watchAgain", true);
    this.fetchMovies(this.starWars, "newReleases", true);
  } */

  useEffect(() => {
    fetchMovies(americanPie, "trendingNow", false);
    fetchMovies(interstellar, "watchAgain", true);
    fetchMovies(starWars, "newReleases", true);
  }, []);

  return (
    <div>
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h2 className="mb-4">TV Shows</h2>
            <div className="btn-group" role="group">
              <div className="dropdown ms-4 mt-1">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm dropdown-toggle rounded-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "#221f1f" }}>
                  Genres
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Comedy
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Drama
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Thriller
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <i className="bi bi-grid icons"></i>
            <i className="bi bi-grid-3x3 icons"></i>
          </div>
        </div>
        <h4>Trending Now</h4>
        <div className="scroll-row mb-4">
          {loading && <Loader></Loader>}
          {trendingNow.map((movie) => (
            <div className="col-auto text-center px-1" key={movie.imdbID}>
              <img
                className="netflix-card"
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => {
                  navigate(`/TvShows/${movie.imdbID}`);
                }}
              />
            </div>
          ))}
        </div>
        <h4>Watch it Again</h4>
        <div className="scroll-row mb-4">
          {loading && <Loader></Loader>}
          {watchAgain.map((movie) => (
            <div className="col-auto text-center px-1" key={movie.imdbID}>
              <img
                className="netflix-card"
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => {
                  navigate(`/TvShows/${movie.imdbID}`);
                }}
              />
            </div>
          ))}
        </div>
        <h4>New Releases</h4>
        {loading && <Loader></Loader>}
        <div className="scroll-row mb-4">
          {newReleases.map((movie) => (
            <div className="col-auto text-center px-1" key={movie.imdbID}>
              <img
                className="netflix-card"
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => {
                  navigate(`/TvShows/${movie.imdbID}`);
                }}
              />
            </div>
          ))}
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
