import { FunctionComponent, useEffect } from "react";
import { IMovie } from "../../interfaces/Interfaces";
import MovieListItem from "./MovieListItem";

interface MoviesListProps {
  movies: IMovie[];
}

const MoviesList: FunctionComponent<MoviesListProps> = ({ movies }) => {
  return (
    <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieListItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MoviesList;
