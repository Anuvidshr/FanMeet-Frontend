import React, { useState } from 'react';

const RestrictedWords = () => {
  const [restrictedWords, setRestrictedWords] = useState([
    { id: 1, word: 'boar', addedDate: '2025-10-18' },
    { id: 2, word: 'xyz', addedDate: '2025-10-18' },
    { id: 3, word: 'abc', addedDate: '2025-10-18' }
  ]);

  const [newWord, setNewWord] = useState('');

  const handleAddWord = () => {
    if (newWord.trim() && !restrictedWords.some(item => item.word.toLowerCase() === newWord.toLowerCase())) {
      const newItem = {
        id: restrictedWords.length + 1,
        word: newWord.trim().toLowerCase(),
        addedDate: new Date().toISOString().split('T')[0]
      };
      setRestrictedWords([...restrictedWords, newItem]);
      setNewWord('');
    }
  };

  const handleDeleteWord = (id) => {
    setRestrictedWords(restrictedWords.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/40 to-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            🚫 Restricted Words
          </h1>
          <p className="text-purple-200 text-lg">
            Manage words that are not allowed in posts and comments
          </p>
        </div>

        {/* Add New Word Box */}
        <div className="bg-white/10 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 mb-6 hover:border-red-400 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            ➕ Add New Restricted Word
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
              placeholder="Enter word to restrict..."
              className="flex-1 bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 outline-none focus:border-red-400 transition-all"
            />
            <button
              onClick={handleAddWord}
              disabled={!newWord.trim()}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Add Word
            </button>
          </div>
        </div>

        {/* Restricted Words List */}
        <div className="bg-white/10 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📋 Current Restricted Words ({restrictedWords.length})
          </h2>
          
          {restrictedWords.length === 0 ? (
            <div className="text-center py-8 text-purple-300">
              No restricted words added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {restrictedWords.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex-1">
                    <span className="text-white font-semibold text-lg">
                      {item.word}
                    </span>
                    <span className="text-purple-400 text-sm ml-4">
                      Added: {item.addedDate}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteWord(item.id)}
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 opacity-0 group-hover:opacity-100"
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-300 text-sm flex items-start gap-2">
            <span className="text-lg">ℹ️</span>
            <span>
              Words added here will be automatically filtered from all posts, tweets, and comments across the platform.
              Users attempting to use these words will be notified.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestrictedWords;