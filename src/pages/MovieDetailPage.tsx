import { Play } from 'lucide-react';
import { Movie, moviesData } from '../data/moviesData';
import Header from '../components/Header';
import PopularAnime from '../components/PopularAnime';

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  onMovieSelect: (movie: Movie) => void;
}

const MovieDetailPage = ({ movie, onBack, onMovieSelect }: MovieDetailPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header onHomeClick={onBack} />

      <main className="px-8 py-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Movie Title */}
            <h1 className="text-white text-3xl font-bold mb-6">
              {movie.movieName} - Episode {movie.episode}
            </h1>

            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden mb-6" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={movie.image}
                  alt={movie.movieName}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <button className="relative z-10 bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-6 transition-colors duration-200">
                  <Play size={48} fill="white" className="text-white" />
                </button>
              </div>
            </div>

            {/* Movie Details Section */}
            <div className="flex gap-6">
              {/* Left - Movie Poster and Details */}
              <div className="w-48 flex-shrink-0">
                <img
                  src={movie.image}
                  alt={movie.movieName}
                  className="w-full rounded-lg mb-4"
                />
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-400">Type :</p>
                    <p className="text-white">TV Series</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status :</p>
                    <p className="text-white">Ongoing</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Studios :</p>
                    <p className="text-white">Toei Animation</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Duration :</p>
                    <p className="text-white">24 Min</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Genres :</p>
                    <p className="text-white">Action, Adventure, Fantasy</p>
                  </div>
                </div>
              </div>

              {/* Right - Synopsis */}
              <div className="flex-1">
                <h2 className="text-white text-xl font-bold mb-3">Synopsis :</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {movie.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Popular Anime */}
          <div className="w-80 flex-shrink-0">
            <PopularAnime
              movies={moviesData.filter(m => m.id !== movie.id)}
              onMovieClick={onMovieSelect}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetailPage;
