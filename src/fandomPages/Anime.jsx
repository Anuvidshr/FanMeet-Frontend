import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../assets/utils/ThemeContext';

const Anime = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Theme-specific styles
  const themeStyles = {
    dark: {
      background: "bg-gradient-to-br from-gray-900 via-pink-950 to-black",
      text: "text-white",
      subtext: "text-pink-200",
      cardBg: "bg-white/10",
      cardBorder: "border-pink-500/30",
      cardHoverBorder: "hover:border-pink-400",
      cardShadow: "hover:shadow-pink-500/20",
      buttonBg: "bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500",
      backButtonBg: "bg-white/10 hover:bg-white/20",
      backButtonBorder: "border-pink-500/30 hover:border-pink-400",
      headerGradient: "from-pink-400 to-orange-500",
    },
    light: {
      background: "bg-gradient-to-br from-green-300 via-purple-200 to-pink-200",
      text: "text-gray-900",
      subtext: "text-purple-700",
      cardBg: "bg-white/80",
      cardBorder: "border-purple-300/50",
      cardHoverBorder: "hover:border-purple-400",
      cardShadow: "hover:shadow-purple-500/30",
      buttonBg: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500",
      backButtonBg: "bg-white/80 hover:bg-white/90",
      backButtonBorder: "border-purple-300/50 hover:border-purple-400",
      headerGradient: "from-purple-600 to-blue-600",
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.dark;

  console.log('Anime component loaded'); // Add this line for debugging

  const characters = [
    { name: 'Naruto Uzumaki', role: 'Seventh Hokage', avatar: '🍥' },
    { name: 'Monkey D. Luffy', role: 'Future Pirate King', avatar: '👒' },
    { name: 'Goku', role: 'Saiyan Warrior', avatar: '💪' },
  ];

  const externalLinks = [
    { name: 'Crunchyroll', url: 'https://www.crunchyroll.com', icon: '📺' },
    { name: 'MyAnimeList', url: 'https://myanimelist.net', icon: '📋' },
    { name: 'Anime News Network', url: 'https://www.animenewsnetwork.com', icon: '📰' },
  ];

  const handleTalkToCharacter = (character) => {
    console.log(`Starting chat with ${character.name}`);
    alert(`Starting conversation with ${character.name}!`);
  };

  // Animated particle background effect with sun
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let sunX = 100;
    let sunDirection = 1;
    const sunSpeed = 0.5;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Calculate parabolic Y position based on X
    const getParabolicY = (x) => {
      const width = canvas.width;
      const maxHeight = 400;
      const minHeight = 250;
      
      const normalizedX = (x / width) * 2 - 1;
      const y = minHeight + (maxHeight - minHeight) * (1 - normalizedX * normalizedX);
      return y;
    };

    // Get background color based on sun position and theme
    const getBackgroundColor = (x) => {
      const width = canvas.width;
      const progress = x / width; // 0 to 1
      
      if (theme === 'light') {
        // Light mode: Pastel gradient (green to purple to pink)
        if (progress < 0.3) {
          const t = progress / 0.3;
          const r = Math.floor(100 + t * 100);
          const g = Math.floor(200 + t * 20);
          const b = Math.floor(150 + t * 30);
          return `rgb(${r}, ${g}, ${b})`;
        }
        else if (progress < 0.7) {
          const t = (progress - 0.3) / 0.4;
          const r = Math.floor(200 - t * 20);
          const g = Math.floor(220 - t * 50);
          const b = Math.floor(180 + t * 50);
          return `rgb(${r}, ${g}, ${b})`;
        }
        else {
          const t = (progress - 0.7) / 0.3;
          const r = Math.floor(180 + t * 60);
          const g = Math.floor(170 - t * 50);
          const b = Math.floor(230 - t * 50);
          return `rgb(${r}, ${g}, ${b})`;
        }
      } else {
        // Dark mode: Dark blue gradient
        if (progress < 0.3) {
          const t = progress / 0.3;
          const r = Math.floor(10 + t * 20);
          const g = Math.floor(15 + t * 30);
          const b = Math.floor(30 + t * 60);
          return `rgb(${r}, ${g}, ${b})`;
        }
        else if (progress < 0.7) {
          const t = (progress - 0.3) / 0.4;
          const r = Math.floor(30 + t * 20);
          const g = Math.floor(45 + t * 35);
          const b = Math.floor(90 + t * 50);
          return `rgb(${r}, ${g}, ${b})`;
        }
        else {
          const t = (progress - 0.7) / 0.3;
          const r = Math.floor(50 - t * 40);
          const g = Math.floor(80 - t * 65);
          const b = Math.floor(140 - t * 110);
          return `rgb(${r}, ${g}, ${b})`;
        }
      }
    };

    // Draw bird
    const drawBird = () => {
      const birdY = getParabolicY(sunX);
      const birdSize = 40;
      
      // Adjust bird color based on theme
      const birdBodyColor = theme === 'light' ? '#34495E' : '#2C3E50';
      const birdHeadColor = theme === 'light' ? '#2C3E50' : '#34495E';
      
      // Bird body (ellipse)
      ctx.fillStyle = birdBodyColor;
      ctx.beginPath();
      ctx.ellipse(sunX, birdY, birdSize * 0.6, birdSize * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird head (circle)
      ctx.fillStyle = birdHeadColor;
      ctx.beginPath();
      ctx.arc(sunX + birdSize * 0.4 * sunDirection, birdY - birdSize * 0.2, birdSize * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird beak
      ctx.fillStyle = '#F39C12';
      ctx.beginPath();
      ctx.moveTo(sunX + birdSize * 0.6 * sunDirection, birdY - birdSize * 0.2);
      ctx.lineTo(sunX + birdSize * 0.9 * sunDirection, birdY - birdSize * 0.15);
      ctx.lineTo(sunX + birdSize * 0.6 * sunDirection, birdY - birdSize * 0.1);
      ctx.closePath();
      ctx.fill();
      
      // Bird eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(sunX + birdSize * 0.45 * sunDirection, birdY - birdSize * 0.25, birdSize * 0.08, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(sunX + birdSize * 0.45 * sunDirection, birdY - birdSize * 0.25, birdSize * 0.04, 0, Math.PI * 2);
      ctx.fill();
      
      // Wing animation
      const wingFlap = Math.sin(Date.now() * 0.01) * 15;
      
      // Wings
      ctx.fillStyle = birdHeadColor;
      ctx.beginPath();
      ctx.ellipse(sunX - birdSize * 0.2, birdY - birdSize * 0.1, birdSize * 0.8, birdSize * 0.2, wingFlap * Math.PI / 180, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(sunX - birdSize * 0.2, birdY + birdSize * 0.1, birdSize * 0.8, birdSize * 0.2, -wingFlap * Math.PI / 180, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird tail
      ctx.fillStyle = birdBodyColor;
      ctx.beginPath();
      ctx.moveTo(sunX - birdSize * 0.6, birdY);
      ctx.lineTo(sunX - birdSize * 1.2, birdY - birdSize * 0.3);
      ctx.lineTo(sunX - birdSize * 1.2, birdY + birdSize * 0.3);
      ctx.closePath();
      ctx.fill();
    };

    // Update sun position
    const updateSun = () => {
      sunX += sunSpeed * sunDirection;
      
      if (sunX >= canvas.width - 100) {
        sunDirection = -1;
      } else if (sunX <= 100) {
        sunDirection = 1;
      }
    };

    // Animation loop
    const animate = () => {
      const bgColor = getBackgroundColor(sunX);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBird();
      updateSun();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Add theme as dependency

  return (
    <div className={`min-h-screen relative overflow-hidden ${currentTheme.background}`}>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${currentTheme.headerGradient} bg-clip-text text-transparent mb-4`}>
            Anime Fandom
          </h1>
          <p className={`${currentTheme.subtext} text-lg md:text-xl max-w-3xl mx-auto`}>
            <span className="font-bold">Welcome Otaku!</span> Dive into the world of anime where dreams, adventure, and friendship come alive.
          </p>
        </div>

        {/* Talk to Characters Section */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold ${currentTheme.text} mb-6 flex items-center gap-2`}>
            💬 Talk to Characters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character, index) => (
              <div
                key={index}
                className={`${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.cardBorder} ${currentTheme.cardHoverBorder} rounded-2xl p-6 hover:shadow-2xl ${currentTheme.cardShadow} transition-all duration-300 group`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {character.avatar}
                  </div>
                  <h3 className={`text-2xl font-bold ${currentTheme.text} mb-2`}>
                    {character.name}
                  </h3>
                  <p className={`${theme === 'light' ? 'text-purple-600' : 'text-pink-300'} text-sm mb-4`}>
                    {character.role}
                  </p>
                  <button
                    onClick={() => handleTalkToCharacter(character)}
                    className={`w-full ${currentTheme.buttonBg} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105`}
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
          <h2 className={`text-3xl font-bold ${currentTheme.text} mb-6 flex items-center gap-2`}>
            🔗 Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {externalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.cardBorder} ${currentTheme.cardHoverBorder} rounded-2xl p-6 hover:shadow-2xl ${currentTheme.cardShadow} transition-all duration-300 group flex items-center gap-4`}
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 ${theme === 'light' ? 'group-hover:text-purple-600' : 'group-hover:text-pink-300'} transition-colors`}>
                    {link.name}
                  </h3>
                  <p className={`${theme === 'light' ? 'text-purple-600' : 'text-pink-400'} text-sm flex items-center gap-1`}>
                    Visit <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/explore')}
            className={`inline-flex items-center gap-2 ${currentTheme.backButtonBg} backdrop-blur-md border ${currentTheme.backButtonBorder} ${currentTheme.text} font-semibold py-3 px-8 rounded-xl transition-all duration-200`}
          >
            ← Back to Explore
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Anime;
