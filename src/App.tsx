import { useState } from 'react';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { Movie, moviesData } from './data/moviesData';

function App() {
  const [currentView, setCurrentView] = useState<'browse' | 'detail'>('browse');
  const [selectedMovie, setSelectedMovie] = useState<Movie>(moviesData[0]);

  const handleWatchMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBrowse = () => {
    setCurrentView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentView === 'browse' ? (
        <MoviePage onWatchMovie={handleWatchMovie} />
      ) : (
        <MovieDetailPage
          movie={selectedMovie}
          onBack={handleBackToBrowse}
          onMovieSelect={handleWatchMovie}
        />
      )}
    </>
  );
}

export default App;
