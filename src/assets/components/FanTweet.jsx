import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const FanTweet = () => {
  const user = useSelector((state) => state.user); // Get logged-in user from Redux
  const [tweetText, setTweetText] = useState('');
  const [restrictedWords] = useState(['boar', 'xyz', 'abc']); // Restricted words list
  const [warningMessage, setWarningMessage] = useState('');
  const [tweets, setTweets] = useState([
    {
      id: 1,
      user: 'Harry Potter Fan',
      username: '@potterhead',
      avatar: '⚡',
      content: 'Just finished reading The Prisoner of Azkaban for the 10th time! Still gives me chills! 🪄',
      likes: 234,
      retweets: 45,
      replies: 12,
      time: '2h ago',
      fandom: 'Harry Potter'
    },
    {
      id: 2,
      user: 'Marvel Enthusiast',
      username: '@marvelgeek',
      avatar: '🦸',
      content: 'That ending in Endgame still hits different every time. I\'m not crying, you\'re crying! 😭',
      likes: 567,
      retweets: 89,
      replies: 34,
      time: '4h ago',
      fandom: 'Marvel'
    },
    {
      id: 3,
      user: 'Anime Lover',
      username: '@otaku_life',
      avatar: '🎌',
      content: 'Just discovered this hidden gem anime! The animation is absolutely stunning! 🌟',
      likes: 123,
      retweets: 34,
      replies: 8,
      time: '6h ago',
      fandom: 'Anime'
    }
  ]);

  // Check if text contains restricted words
  const checkRestrictedWords = (text) => {
    const lowerText = text.toLowerCase();
    const foundWords = restrictedWords.filter(word => 
      lowerText.includes(word.toLowerCase())
    );
    return foundWords;
  };

  const handlePostTweet = () => {
    if (tweetText.trim()) {
      // Check for restricted words
      const foundRestrictedWords = checkRestrictedWords(tweetText);
      
      if (foundRestrictedWords.length > 0) {
        setWarningMessage(`This can't be texted. Please remove  "${foundRestrictedWords.join(', ')}" before posting.`);
        setTimeout(() => setWarningMessage(''), 5000); // Clear warning after 5 seconds
        return;
      }

      const newTweet = {
        id: Date.now(),
        user: user?.firstname && user?.lastname 
          ? `${user.firstname} ${user.lastname}` 
          : user?.firstname || 'FanMeet User',
        username: `@${user?.firstname?.toLowerCase() || 'fanmeet_user'}`,
        avatar: user?.photoUrl || '👤',
        content: tweetText,
        likes: 0,
        retweets: 0,
        replies: 0,
        time: 'Just now',
        fandom: 'General',
        userId: user?._id || 'guest'
      };
      setTweets([newTweet, ...tweets]);
      setTweetText('');
      setWarningMessage('');
    }
  };
  

  const handleLike = (id) => {
    setTweets(tweets.map(tweet => 
      tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/40 to-black py-2 sm:py-4 md:py-6">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-1 animate-fade-in-once radiant-glow inline-flex items-center gap-2">
            FanTweet <span className="animate-fly-in">🕊️</span>
          </h1>
        </div>

        {/* Animation CSS */}
        <style jsx>{`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes flyIn {
            0% {
              opacity: 0;
              transform: translateX(-100px) translateY(-20px);
            }
            60% {
              opacity: 1;
              transform: translateX(10px) translateY(0);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }

          .animate-fade-in-once {
            animation: fadeInOut 1.5s ease-in-out forwards;
          }

          .animate-fly-in {
            display: inline-block;
            animation: flyIn 2s ease-out forwards;
          }

          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }

          .radiant-glow {
            text-shadow: 0 0 15px rgba(96, 165, 250, 0.6),
                         0 0 25px rgba(96, 165, 250, 0.4),
                         0 0 35px rgba(96, 165, 250, 0.2);
          }
        `}</style>

        {/* Warning Message */}
        {warningMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 animate-shake">
            <p className="text-red-300 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>{warningMessage}</span>
            </p>
          </div>
        )}

        {/* Post Tweet Box */}
        <div className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 mb-6 hover:border-purple-400 transition-all duration-300">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl overflow-hidden">
                {user?.photoUrl ? (
                  <img 
                    src={user.photoUrl} 
                    alt={user.firstname} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>👤</span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                placeholder="What's on your mind, fan?"
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none text-lg"
                rows="3"
                maxLength="280"
              />
              <div className="flex justify-between items-center mt-4 border-t border-gray-700/50 pt-4">
                <div className="flex items-center gap-3 text-blue-400">
                  <button className="hover:bg-blue-500/10 p-2 rounded-full transition-all">📷</button>
                  <button className="hover:bg-blue-500/10 p-2 rounded-full transition-all">😊</button>
                  <button className="hover:bg-blue-500/10 p-2 rounded-full transition-all">📍</button>
                  <span className="text-gray-400 text-sm ml-auto">
                    {tweetText.length}/280
                  </span>
                </div>
                <button
                  onClick={handlePostTweet}
                  disabled={!tweetText.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-all duration-200"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tweets Feed */}
        <div className="space-y-0">
          {tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="bg-white/5 backdrop-blur-md border-b border-gray-700/50 p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl overflow-hidden">
                    {tweet.avatar && (tweet.avatar.startsWith('http') || tweet.avatar.startsWith('https')) ? (
                      <img 
                        src={tweet.avatar} 
                        alt={tweet.user} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                      />
                    ) : (
                      <span>{tweet.avatar || '👤'}</span>
                    )}
                  </div>
                </div>

                {/* Tweet Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-white font-bold hover:underline cursor-pointer">{tweet.user}</span>
                    <span className="text-gray-400 text-sm">{tweet.username}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 text-sm hover:underline cursor-pointer">{tweet.time}</span>
                    {tweet.fandom && (
                      <span className="ml-auto bg-blue-500/20 border border-blue-500/40 px-3 py-0.5 rounded-full text-xs text-blue-300">
                        #{tweet.fandom}
                      </span>
                    )}
                  </div>

                  <p className="text-white text-base mb-3 leading-relaxed break-words">
                    {tweet.content}
                  </p>

                  {/* Action Buttons - Twitter Style */}
                  <div className="flex justify-between max-w-md text-gray-400 mt-3 pt-2 border-t border-gray-700/50">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                      <span className="text-lg group-hover:bg-blue-500/10 rounded-full p-2 transition-all">💬</span>
                      <span className="text-sm">{tweet.replies || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                      <span className="text-lg group-hover:bg-green-500/10 rounded-full p-2 transition-all">🔄</span>
                      <span className="text-sm">{tweet.retweets}</span>
                    </button>
                    <button
                      onClick={() => handleLike(tweet.id)}
                      className="flex items-center gap-2 hover:text-pink-400 transition-colors group"
                    >
                      <span className="text-lg group-hover:bg-pink-500/10 rounded-full p-2 transition-all">❤️</span>
                      <span className="text-sm">{tweet.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors group">
                      <span className="text-lg group-hover:bg-yellow-500/10 rounded-full p-2 transition-all">🔖</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-400 transition-colors group">
                      <span className="text-lg group-hover:bg-purple-500/10 rounded-full p-2 transition-all">📤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Fandoms */}
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🔥 Trending Fandoms
          </h3>
          <div className="space-y-3">
            {['Harry Potter', 'Marvel', 'Anime', 'K-Pop', 'Star Wars'].map((fandom, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <span className="text-white font-medium">{fandom}</span>
                <span className="text-purple-400 text-sm">{Math.floor(Math.random() * 1000)}+ tweets</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanTweet;
