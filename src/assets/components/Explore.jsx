import React, { useState, useRef } from 'react';
// Fandom Images
import hpImage from '../../Images/hp.png';
import animeImage from '../../Images/anime.png';

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const itemsPerPage = 6; 

  const fandoms = [
  { id: 'A', name: 'HARRY POTTER', description: 'Hey Wizard and Witches! Step into the wizarding world where magic, friendship, and destiny collide.', image: hpImage, members: '12.5K', color: 'from-blue-500 to-purple-600' },
  { id: 'B', name: 'ANIME', description: 'Hey fellow freak! Dive into worlds of imagination, emotion, and epic storytelling.', image: animeImage, members: '8.2K', color: 'from-red-500 to-pink-600' },
  { id: 'C', name: 'MARVEL(MCU)', description: 'Hey Superhero! Heroes unite to save worlds and redefine destiny across the multiverse.', image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=MARVEL', members: '15.3K', color: 'from-green-500 to-teal-600' },
  { id: 'D', name: 'BOLLYWOOD', description: 'Hey Film Buff! Lights, music, drama—experience the heartbeat of Indian cinema.', image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=BOLLYWOOD', members: '22.1K', color: 'from-yellow-500 to-orange-600' },
  { id: 'E', name: 'F.R.I.E.N.D.S', description: 'Hey Coffee Lover! Laugh, cry, and sip coffee with the most iconic friend group ever.', image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=FRIENDS', members: '9.7K', color: 'from-purple-500 to-indigo-600' },
  { id: 'F', name: 'MS-DHONI', description: 'Hey Cricket Fan! Celebrate the calm, composed, and legendary Captain Cool of cricket.', image: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=MS-DHONI', members: '18.9K', color: 'from-cyan-500 to-blue-600' },
  { id: 'G', name: 'DISNEY', description: 'Hey Dreamer! Where dreams, laughter, and timeless stories come alive.', image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=DISNEY', members: '11.4K', color: 'from-pink-500 to-rose-600' },
  { id: 'H', name: 'WEB SERIES', description: 'Hey Binge-Watcher! Binge-worthy stories that keep you hooked till the very end.', image: 'https://via.placeholder.com/400x300/f97316/ffffff?text=WEB+SERIES', members: '25.6K', color: 'from-orange-500 to-red-600' },
  { id: 'I', name: 'NOVELS', description: 'Hey Bookworm! Lose yourself in words that build worlds and stir emotions.', image: 'https://via.placeholder.com/400x300/059669/ffffff?text=NOVELS', members: '7.8K', color: 'from-emerald-500 to-green-600' },
  { id: 'J', name: 'MUSIC', description: 'Hey Music Lover! Feel every beat, lyric, and rhythm that defines your soul.', image: 'https://via.placeholder.com/400x300/7c3aed/ffffff?text=MUSIC', members: '14.2K', color: 'from-violet-500 to-purple-600' },
  { id: 'K', name: 'TAYLOR SWIFT', description: 'Hey Swiftie! Join the Swiftie era—where lyrics tell stories of love and power.', image: 'https://via.placeholder.com/400x300/0d9488/ffffff?text=TAYLOR+SWIFT', members: '10.1K', color: 'from-teal-500 to-cyan-600' },
  { id: 'L', name: 'FITNESS', description: 'Hey Fitness Enthusiast! Push limits, chase strength, and celebrate every small victory.', image: 'https://via.placeholder.com/400x300/d97706/ffffff?text=FITNESS', members: '16.5K', color: 'from-amber-500 to-yellow-600' },
  { id: 'M', name: 'KPOP', description: 'Hey KPOP Fan! Unmatched energy, style, and fandom power that moves the world.', image: 'https://via.placeholder.com/400x300/e11d48/ffffff?text=KPOP', members: '13.8K', color: 'from-rose-500 to-pink-600' },
  { id: 'N', name: 'TOLLYWOOD', description: 'Hey Anna and Akka! From soulful stories to mass moments—cinema with heart and heroism.', image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=TOLLYWOOD', members: '19.3K', color: 'from-indigo-500 to-blue-600' },
  { id: 'O', name: 'GAMING', description: 'Hey O.P.! Level up your world with action, adventure, and endless fun.', image: 'https://via.placeholder.com/400x300/64748b/ffffff?text=GAMING', members: '21.7K', color: 'from-slate-500 to-gray-600' }
];

  // Filter fandoms based on search query
  const filteredFandoms = fandoms.filter((fandom) =>
    fandom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fandom.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFandoms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFandoms = filteredFandoms.slice(startIndex, endIndex);

  const handleFandomClick = (fandom) => {
    console.log(`Exploring ${fandom.name}`);
    // Add navigation logic here
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    console.log(`Searching for: ${searchQuery}`);
    // Focus the input field to show cursor
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when typing
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Explore Fandoms
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover amazing communities and connect with fellow fans around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search fandoms..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-2xl px-6 py-4 pr-40 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 bottom-4 bg-red-400 hover:bg-red-500 text-white px-6 rounded-xl transition-colors duration-200 font-semibold text-sm uppercase flex items-center gap-1.5"
            >
              <span>🔍</span> 
            </button>
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-400 text-center">
              Found {filteredFandoms.length} fandom{filteredFandoms.length !== 1 ? 's' : ''} matching "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2 text-purple-400 hover:text-purple-300"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Fandoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentFandoms.map((fandom) => (
            <div
              key={fandom.id}
              onClick={() => handleFandomClick(fandom)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Fandom Image */}
                <div className="w-full h-48 rounded-2xl mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={fandom.image} 
                    alt={fandom.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                
                {/* Fandom Info */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {fandom.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  <span className="font-bold text-gray-300">
                    {fandom.description.split('!')[0]}!
                  </span>
                  {fandom.description.split('!')[1]}
                </p>
                
                {/* Members Count */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    👥 {fandom.members} members
                  </span>
                  <a 
                    href={`/fandom/${fandom.id.toLowerCase()}`}
                    className="text-purple-400 text-sm font-medium group-hover:text-purple-300 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explore →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          {/* Page Info */}
          <div className="text-gray-400 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredFandoms.length)} of {filteredFandoms.length} fandoms
          </div>
          
          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-purple-600 hover:scale-105'
              }`}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-purple-600 text-white scale-110'
                        : 'bg-gray-700 text-gray-300 hover:bg-purple-500 hover:text-white hover:scale-105'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-purple-600 hover:scale-105'
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Page Input (Jump to page) */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <span>Jump to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  goToPage(page);
                }
              }}
              className="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-center focus:outline-none focus:border-purple-500"
            />
            <span>of {totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;