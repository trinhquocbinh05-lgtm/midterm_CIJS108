import { useState, useEffect } from 'react';
import { moviesData, Movie } from '../data/moviesData';
import Header from '../components/Header';
import ExploreBanner from '../components/ExploreBanner';
import NewReleaseList from '../components/NewReleaseList';

interface MoviePageProps {
  onWatchMovie: (movie: Movie) => void;
}

/**
 * MoviePage - Component cha (Parent Component)
 * Đây là component chính quản lý State và điều phối dữ liệu xuống các component con
 */
const MoviePage = ({ onWatchMovie }: MoviePageProps) => {
  /**
   * STATE MANAGEMENT (Quản lý State) - 2đ
   *
   * useState là React Hook để quản lý state trong Functional Component
   * selectedMovie: biến state lưu trữ thông tin phim đang được chọn
   * setSelectedMovie: function để cập nhật state
   *
   * moviesData[0]: Khởi tạo state với phim đầu tiên trong danh sách (theo yêu cầu đề bài)
   */
  const [selectedMovie, setSelectedMovie] = useState<Movie>(moviesData[0]);

  /**
   * AUTO SLIDE EFFECT - Tự động chuyển banner mỗi 5 giây
   * useEffect: React Hook để xử lý side effects
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMovie((currentMovie) => {
        // Tìm index của phim hiện tại
        const currentIndex = moviesData.findIndex(m => m.id === currentMovie.id);
        // Chuyển sang phim tiếp theo, nếu là phim cuối thì quay về phim đầu
        const nextIndex = (currentIndex + 1) % moviesData.length;
        return moviesData[nextIndex];
      });
    }, 5000); // 5000ms = 5 giây

    // Cleanup function: Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  /**
   * CALLBACK FUNCTION - Xử lý sự kiện khi user chọn phim
   *
   * Function này sẽ được truyền xuống component con qua Props
   * Khi user click vào một phim, function này sẽ được gọi để update State
   *
   * @param movie - Thông tin phim được chọn
   */
  const handleMovieSelect = (movie: Movie) => {
    // Cập nhật State với phim mới được chọn
    // Khi State thay đổi, React sẽ tự động re-render component
    // và truyền dữ liệu mới xuống các component con
    console.log('Selected movie:', movie.movieName);
    setSelectedMovie(movie);

    // Scroll lên top để xem banner phim mới
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main>
        {/*
          PROPS TRUYỀN XUỐNG COMPONENT CON (Component Communication) - 2đ

          ExploreBanner Component:
          - Truyền selectedMovie (từ State) xuống ExploreBanner qua Props
          - Mỗi khi selectedMovie thay đổi, ExploreBanner sẽ tự động re-render
            với dữ liệu mới
        */}
        <ExploreBanner movie={selectedMovie} onWatchNow={onWatchMovie} />

        {/*
          NewReleaseList Component:
          - movies: Truyền danh sách tất cả các phim xuống component con
          - onMovieSelect: Truyền callback function để xử lý sự kiện click

          LUỒNG DỮ LIỆU (Data Flow):
          1. User click vào MovieCard trong NewReleaseList
          2. MovieCard gọi onClick callback (nhận từ Props)
          3. onClick callback gọi onMovieSelect (nhận từ Props)
          4. onMovieSelect gọi handleMovieSelect ở MoviePage (component cha)
          5. handleMovieSelect update State (setSelectedMovie)
          6. React re-render và ExploreBanner hiển thị phim mới

          Đây là pattern "Lifting State Up" - State được quản lý ở component cha
          và được chia sẻ xuống các component con qua Props
        */}
        <NewReleaseList
          movies={moviesData}
          onMovieSelect={handleMovieSelect}
          selectedMovieId={selectedMovie.id}
        />
      </main>
    </div>
  );
};

export default MoviePage;
