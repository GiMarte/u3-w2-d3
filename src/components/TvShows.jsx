import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
const TvShows = () => {
  const [singleMovie, setSingleMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=b4fec95c&i=${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`AIUTOOO${r.status}`);
        return r.json();
      })
      .then((data) => {
        console.log(data);
        setSingleMovie(data);
      })
      .catch((e) => e);
  }, [id]);

  if (!singleMovie) return <Loader></Loader>;

  return (
    <Container>
      <Row>
        <Col md={6} className="justify-content-center align-items-center gap-5">
          <h1>{singleMovie ? singleMovie.Title : <Loader></Loader>}</h1>
          <img
            className="netflix-card"
            src={singleMovie && singleMovie.Poster}
            alt={singleMovie && singleMovie.Title}
            style={{ width: "100%" }}
          />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="col-auto text-center px-1">
            <div className="fs-1 text-wrap">
              Ratio:{" "}
              {singleMovie ? singleMovie.Ratings[0].Value : <Loader></Loader>}
            </div>
            <div className="fs-1 text-wra">
              Genre: {singleMovie ? singleMovie.Genre : <Loader></Loader>}
            </div>
            <div className="fs-1 text-wrap">
              Year: {singleMovie ? singleMovie.Year : <Loader></Loader>}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TvShows;
