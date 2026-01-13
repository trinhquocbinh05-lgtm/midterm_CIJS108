import { Movie } from '../data/moviesData';

// Props interface - định nghĩa kiểu dữ liệu cho Props
// Props là cách truyền dữ liệu từ component cha xuống component con
interface MovieCardProps {
  movie: Movie;  // PROPS: Nhận thông tin phim từ component cha (NewReleaseList)
  onClick: (movie: Movie) => void;  // PROPS: Nhận function callback từ component cha để xử lý sự kiện click
  isSelected?: boolean;  // PROPS: Để biết phim này có đang được chọn hay không
}

const MovieCard = ({ movie, onClick, isSelected }: MovieCardProps) => {
  return (
    <div
      // Khi user click vào card, gọi function onClick được truyền từ component cha
      // và truyền movie hiện tại làm tham số
      onClick={() => onClick(movie)}
      className={`cursor-pointer group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
        isSelected ? 'ring-4 ring-blue-500 scale-105' : ''
      }`}
    >
      {/* Hiển thị poster phim */}
      <img
        src={movie.image}
        alt={movie.movieName}
        className="w-full h-[280px] object-cover rounded-lg"
      />

      {/* Overlay hiển thị thông tin khi hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <p className="text-white text-xs mb-1">Episode {movie.episode}</p>
          <h3 className="text-white font-semibold text-sm line-clamp-2">{movie.movieName}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
