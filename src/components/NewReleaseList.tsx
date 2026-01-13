import { Movie } from '../data/moviesData';
import MovieCard from './MovieCard';

// Props interface - định nghĩa Props nhận từ component cha
interface NewReleaseListProps {
  movies: Movie[];  // PROPS: Nhận danh sách phim từ component cha (MoviePage)
  onMovieSelect: (movie: Movie) => void;  // PROPS: Nhận callback function để xử lý khi user chọn phim
  selectedMovieId?: string;  // PROPS: ID của phim đang được chọn
}

// Component con - Nhận Props từ component cha
const NewReleaseList = ({ movies, onMovieSelect, selectedMovieId }: NewReleaseListProps) => {
  return (
    <section className="px-8 py-8">
      {/* Tiêu đề section */}
      <h2 className="text-white text-2xl font-bold mb-6">New Release</h2>

      {/* Grid layout hiển thị danh sách phim */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/*
          Map qua danh sách movies (nhận từ Props)
          Render MovieCard cho mỗi phim
        */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}  // PROPS: Truyền thông tin phim xuống MovieCard
            onClick={onMovieSelect}  // PROPS: Truyền callback function xuống MovieCard
            isSelected={movie.id === selectedMovieId}  // PROPS: Check xem phim này có đang được chọn không
            // Khi MovieCard được click, nó sẽ gọi onMovieSelect
            // onMovieSelect sẽ bubble up về MoviePage để update State
          />
        ))}
      </div>
    </section>
  );
};

export default NewReleaseList;
