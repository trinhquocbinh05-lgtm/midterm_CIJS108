import { Movie } from '../data/moviesData';

interface PopularAnimeProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const PopularAnime = ({ movies, onMovieClick }: PopularAnimeProps) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-white text-xl font-bold mb-4">Popular Anime</h2>
      <div className="grid grid-cols-2 gap-4">
        {movies.slice(0, 6).map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="cursor-pointer group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <img
              src={movie.image}
              alt={movie.movieName}
              className="w-full h-[140px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-xs font-semibold line-clamp-2">{movie.movieName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAnime;
