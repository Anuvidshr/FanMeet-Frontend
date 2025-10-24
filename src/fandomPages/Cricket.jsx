import React from 'react';

const Cricket = () => {
  const characters = [
    { name: 'MS Dhoni', role: 'Captain Cool', avatar: '🏏' },
    { name: 'Virat Kohli', role: 'Chase Master', avatar: '⚡' },
    { name: 'Rohit Sharma', role: 'Hitman', avatar: '💪' },
  ];

  const externalLinks = [
    { name: 'Official Website', url: 'https://www.msdhoni.com', icon: '🌐' },
    { name: 'Watch Highlights', url: 'https://www.youtube.com', icon: '📺' },
    { name: 'Cricket News', url: 'https://www.espncricinfo.com', icon: '📰' },
  ];

  const handleTalkToCharacter = (character) => {
    console.log(`Starting chat with ${character.name}`);
    // Add your chat logic here
    alert(`Starting conversation with ${character.name}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            MS Dhoni Fandom
          </h1>
          <p className="text-cyan-200 text-lg md:text-xl max-w-3xl mx-auto">
            Hey Cricket Fan! Celebrate the calm, composed, and legendary Captain Cool of cricket.
          </p>
        </div>

        {/* Talk to Characters Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            💬 Talk to Characters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {character.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {character.name}
                  </h3>
                  <p className="text-cyan-300 text-sm mb-4">
                    {character.role}
                  </p>
                  <button
                    onClick={() => handleTalkToCharacter(character)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Start Chat 💬
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Links Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            🔗 Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {externalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group flex items-center gap-4"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-cyan-400 text-sm flex items-center gap-1">
                    Visit <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-cyan-500/30 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/20 hover:border-cyan-400 transition-all duration-200"
          >
            ← Back to Explore
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cricket;
