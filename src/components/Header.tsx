import { Film, Search } from 'lucide-react';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo và Brand */}
          <div className="flex items-center gap-2">
            <Film className="text-blue-500" size={32} />
            <h1 className="text-white text-2xl font-bold">Anonime</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <button
              onClick={onHomeClick}
              className="text-white hover:text-blue-500 transition-colors font-medium"
            >
              Home
            </button>
            <button className="text-gray-400 hover:text-blue-500 transition-colors font-medium">
              List anime
            </button>
          </nav>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search anime or movie"
              className="bg-gray-800/50 text-gray-300 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
