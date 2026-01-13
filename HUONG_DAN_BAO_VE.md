# Hướng Dẫn Bảo Vệ Bài Tập - Movie Website

## Tổng Quan Dự Án

Dự án này xây dựng chức năng hiển thị chi tiết phim với các kiến thức trọng tâm:
- **State Management** (Quản lý State)
- **Props Communication** (Truyền dữ liệu qua Props)
- **Component Structure** (Cấu trúc Component)

## Cấu Trúc Thư Mục

```
src/
├── data/
│   └── moviesData.ts          # Dữ liệu phim (7 phim theo đề bài)
├── components/
│   ├── Header.tsx             # Header navigation
│   ├── ExploreBanner.tsx      # Banner hiển thị chi tiết phim
│   ├── NewReleaseList.tsx     # Danh sách phim
│   └── MovieCard.tsx          # Card từng phim
├── pages/
│   └── MoviePage.tsx          # Component cha (quản lý State)
└── App.tsx                     # Entry point
```

## Giải Thích Chi Tiết Các Kiến Thức

### 1. STATE MANAGEMENT (2đ)

**File:** `src/pages/MoviePage.tsx`

**Code quan trọng:**
```typescript
const [selectedMovie, setSelectedMovie] = useState<Movie>(moviesData[0]);
```

**Giải thích khi bảo vệ:**
- `useState` là React Hook để quản lý state trong Functional Component
- `selectedMovie`: biến state lưu trữ phim đang được chọn
- `setSelectedMovie`: function để cập nhật state
- `moviesData[0]`: Khởi tạo với phim đầu tiên (theo yêu cầu đề bài)
- Khi state thay đổi, React tự động re-render component

### 2. PROPS COMMUNICATION (2đ)

#### 2.1 Truyền Props xuống ExploreBanner

**File:** `src/pages/MoviePage.tsx`
```typescript
<ExploreBanner movie={selectedMovie} />
```

**Giải thích:**
- Truyền `selectedMovie` (từ State) xuống ExploreBanner qua Props
- ExploreBanner nhận Props và hiển thị thông tin phim
- Mỗi khi state thay đổi, ExploreBanner tự động cập nhật

#### 2.2 Truyền Callback Function

**File:** `src/pages/MoviePage.tsx`
```typescript
const handleMovieSelect = (movie: Movie) => {
  setSelectedMovie(movie);
};

<NewReleaseList
  movies={moviesData}
  onMovieSelect={handleMovieSelect}
/>
```

**Giải thích:**
- `handleMovieSelect`: callback function xử lý khi user chọn phim
- Truyền function này xuống NewReleaseList qua Props
- NewReleaseList truyền tiếp xuống MovieCard
- Khi MovieCard được click, callback được gọi và update State

### 3. LUỒNG DỮ LIỆU (Data Flow)

**Khi user click vào một phim:**

1. User click MovieCard
2. MovieCard gọi `onClick(movie)`
3. `onClick` gọi `onMovieSelect` (từ Props)
4. `onMovieSelect` gọi `handleMovieSelect` ở MoviePage
5. `handleMovieSelect` update State bằng `setSelectedMovie(movie)`
6. React re-render và ExploreBanner hiển thị phim mới

**Pattern sử dụng:** Lifting State Up
- State được quản lý ở component cha (MoviePage)
- Dữ liệu flow xuống qua Props
- Events bubble up qua callback functions

## Các Điểm Cần Nhấn Mạnh Khi Bảo Vệ

### Câu Hỏi 1: Em giải thích về State trong dự án này?

**Trả lời:**
- State là dữ liệu động của component, có thể thay đổi theo thời gian
- Trong dự án, em dùng `selectedMovie` state để lưu phim đang được chọn
- State được khởi tạo với phim đầu tiên: `useState<Movie>(moviesData[0])`
- Khi state thay đổi qua `setSelectedMovie()`, React tự động re-render
- State được quản lý tập trung ở component cha (MoviePage)

### Câu Hỏi 2: Props hoạt động như thế nào trong dự án?

**Trả lời:**
- Props là cách truyền dữ liệu từ component cha xuống component con
- Props là read-only, component con không thể thay đổi Props
- Trong dự án có 2 loại Props:
  1. **Data Props**: Truyền dữ liệu (vd: `movie={selectedMovie}`)
  2. **Callback Props**: Truyền function (vd: `onMovieSelect={handleMovieSelect}`)

### Câu Hỏi 3: Tại sao phải dùng callback function?

**Trả lời:**
- Component con không thể thay đổi State của component cha trực tiếp
- Callback function cho phép component con "thông báo" lên component cha
- Component cha nhận thông báo và update State
- Đây là cách React maintain one-way data flow (dữ liệu một chiều)

### Câu Hỏi 4: Giải thích cấu trúc component?

**Trả lời:**
```
MoviePage (Cha - Quản lý State)
├── ExploreBanner (Con - Nhận movie qua Props)
└── NewReleaseList (Con - Nhận movies và onMovieSelect)
    └── MovieCard (Con - Nhận movie và onClick)
```

- **MoviePage**: Component cha, quản lý State và điều phối dữ liệu
- **ExploreBanner**: Hiển thị chi tiết phim (nhận dữ liệu qua Props)
- **NewReleaseList**: Hiển thị danh sách phim (truyền callback xuống)
- **MovieCard**: Component nhỏ nhất (trigger callback khi click)

## Code Demo Khi Bảo Vệ

### Demo 1: Giải thích State
```typescript
// File: MoviePage.tsx
const [selectedMovie, setSelectedMovie] = useState<Movie>(moviesData[0]);
//      ^state         ^updater function    ^hook  ^initial value
```

### Demo 2: Giải thích Props xuống ExploreBanner
```typescript
// File: MoviePage.tsx - Truyền Props
<ExploreBanner movie={selectedMovie} />
//             ^prop name  ^prop value (từ state)

// File: ExploreBanner.tsx - Nhận Props
interface ExploreBannerProps {
  movie: Movie;  // Props type definition
}

const ExploreBanner = ({ movie }: ExploreBannerProps) => {
  return <h2>{movie.movieName}</h2>;  // Sử dụng Props
}
```

### Demo 3: Giải thích Callback Flow
```typescript
// 1. MoviePage - Định nghĩa callback
const handleMovieSelect = (movie: Movie) => {
  setSelectedMovie(movie);  // Update State
};

// 2. MoviePage - Truyền callback xuống
<NewReleaseList onMovieSelect={handleMovieSelect} />

// 3. NewReleaseList - Nhận và truyền tiếp
<MovieCard onClick={onMovieSelect} />

// 4. MovieCard - Gọi callback khi click
onClick={() => onClick(movie)}
```

## Tech Stack Sử Dụng

- **React 18**: Functional Components, Hooks
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling (theo yêu cầu)
- **Lucide React**: Icons (theo project template)
- **Vite**: Build tool

## Chạy Dự Án

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Checklist Trước Khi Bảo Vệ

- [ ] Hiểu rõ State là gì và cách hoạt động
- [ ] Hiểu Props và cách truyền dữ liệu
- [ ] Hiểu callback function và data flow
- [ ] Biết giải thích từng dòng code quan trọng
- [ ] Hiểu cấu trúc component và tại sao chia như vậy
- [ ] Test chức năng click vào phim và thay đổi banner
- [ ] Code clean, có comment đầy đủ

## Điểm Cộng

1. **Code Organization**: Chia component rõ ràng, mỗi file một trách nhiệm
2. **TypeScript**: Sử dụng interface cho Props và Data
3. **Comments**: Comment chi tiết giải thích State và Props
4. **UI/UX**: Hover effects, transitions, responsive design
5. **Best Practices**: Theo đúng React patterns (Lifting State Up)

Chúc em bảo vệ tốt!
