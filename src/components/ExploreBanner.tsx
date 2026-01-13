import { Movie } from '../data/moviesData';
import { Play } from 'lucide-react';

// Props interface - định nghĩa Props nhận từ component cha
interface ExploreBannerProps {
  movie: Movie;  // PROPS: Nhận thông tin phim đang được chọn từ component cha (MoviePage)
  // Props này sẽ thay đổi mỗi khi user click vào một phim khác
  onWatchNow: (movie: Movie) => void;  // PROPS: Callback để navigate đến trang detail
}

// Component con - Nhận Props từ component cha
const ExploreBanner = ({ movie, onWatchNow }: ExploreBannerProps) => {
  return (
    <section className="px-8 py-8">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-white text-3xl font-bold mb-2">Explore</h1>
        <p className="text-gray-400 text-sm">What are you gonna watch today?</p>
      </div>

      {/* Banner chính - Hiển thị thông tin phim được truyền qua Props */}
      <div key={movie.id} className="relative h-[400px] rounded-2xl overflow-hidden transition-all duration-500">
        {/* Background image của phim */}
        <img
          src={movie.image}
          alt={movie.movieName}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient để text dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Nội dung thông tin phim - Dữ liệu từ Props */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          {/* Tên phim - Dữ liệu từ movie.movieName (Props) */}
          <h2 className="text-white text-4xl font-bold mb-4">{movie.movieName}</h2>

          {/* Mô tả phim - Dữ liệu từ movie.description (Props) */}
          <p className="text-gray-200 text-sm max-w-2xl mb-6 line-clamp-3">
            {movie.description}
          </p>

          {/* Thông tin episode và button */}
          <div className="flex items-center gap-4">
            {/* Hiển thị số tập - Dữ liệu từ movie.episode (Props) */}
            <span className="text-gray-300 text-sm">Episode {movie.episode}</span>

            {/* Button xem phim */}
            <button
              onClick={() => onWatchNow(movie)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors duration-200"
            >
              <Play size={18} fill="white" />
              <span className="font-medium">Watch Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreBanner;
