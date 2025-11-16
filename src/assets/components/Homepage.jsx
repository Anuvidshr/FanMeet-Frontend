import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

const Homepage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  // Subtle animated star background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.baseSpeedY = Math.random() * 0.1 + 0.05; // Very slow downward drift
        this.speedY = this.baseSpeedY;
        this.opacity = Math.random() * 0.4 + 0.1; // Lower opacity
        this.twinkleSpeed = Math.random() * 0.015 + 0.005;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
        this.color = Math.random() > 0.7 ? 'rgba(200, 180, 255,' : 'rgba(255, 255, 255,'; // Some purple tint
      }

      update(mouseX, mouseY) {
        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Subtle reaction to mouse - stars fall a bit faster near cursor
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.3;
          this.speedY = this.baseSpeedY + force;
        } else {
          this.speedY = this.baseSpeedY;
        }

        // Very slow downward drift
        this.y += this.speedY;

        // Wrap around when reaching bottom
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }

        // Gentle twinkling effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity >= 0.5 || this.opacity <= 0.05) {
          this.twinkleDirection *= -1;
        }
      }
      //star drawing
      draw() {
        // Draw star with subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = `${this.color.slice(0, -1)} ${this.opacity})`;
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create fewer stars (50 instead of 200)
    for (let i = 0; i < 50; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update(mousePos.x, mousePos.y);
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  // Theme-specific styles
  const themeStyles = {
    dark: {
      background: "bg-gradient-to-br from-gray-950 via-purple-950/40 to-black",
      text: "text-white",
      subtext: "text-purple-200",
      card: "bg-white/10",
      cardHover: "hover:bg-white/15",
      button: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500",
      buttonSecondary: "bg-white/10 hover:bg-white/20",
      heading: "bg-gradient-to-r from-blue-400 via-yellow-200 to-red-400 bg-clip-text text-transparent"
    },
    light: {
      background: "bg-gradient-to-br from-green-300 via-purple-200 to-pink-200",
      text: "text-gray-900",
      subtext: "text-purple-700",
      card: "bg-white/80 shadow-lg",
      cardHover: "hover:bg-white",
      button: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
      buttonSecondary: "bg-white/80 hover:bg-white shadow-md",
      heading: "bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-900 bg-clip-text text-transparent"
    },
    harryPotter: {
      background: "bg-gradient-to-br from-[#740001] via-[#372e29] to-[#1a472a]",
      text: "text-[#d3a625]",
      subtext: "text-[#eeba30]",
      card: "bg-[#2a2a2a]/80 border-[#d3a625]",
      cardHover: "hover:bg-[#2a2a2a]/90",
      button: "bg-gradient-to-r from-[#740001] to-[#1a472a] hover:from-[#8b0001] hover:to-[#2a573a]",
      buttonSecondary: "bg-[#d3a625]/90 hover:bg-[#d3a625]",
      heading: "bg-gradient-to-r from-[#ffd700] via-[#d3a625] to-[#eeba30] bg-clip-text text-transparent"
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.dark;

  return (
    <div className={`min-h-screen ${currentTheme.background} relative overflow-hidden`}>
      {/* Show animated canvas only in dark mode */}
      {theme === 'dark' && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      )}

      {/* Add floating elements for Harry Potter theme */}
      {theme === 'harryPotter' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-12 h-12 animate-float-slow" style={{ top: '10%', left: '5%' }}>
            ⚡
          </div>
          <div className="absolute w-12 h-12 animate-float-slower" style={{ top: '30%', right: '10%' }}>
            🦉
          </div>
          <div className="absolute w-12 h-12 animate-float-slowest" style={{ bottom: '20%', left: '15%' }}>
            🪄
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-6xl md:text-8xl font-bold ${currentTheme.heading} mb-6 animate-pulse-slow`}>
            చҽӀçօʍҽ էօ ƑąղⱮҽҽէ
          </h1>
          <p className={`text-xl md:text-2xl ${currentTheme.subtext} mb-8 max-w-3xl mx-auto animate-slide-up`}>
            Connect with fellow fans, explore your favorite fandoms, and make meaningful connections
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => navigate('/login')}
              className={`group relative ${currentTheme.button} text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden`}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="group relative bg-white/10 backdrop-blur-md border-2 border-purple-500/50 hover:border-purple-400 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              <span className="relative z-10">Explore Fandoms</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`group ${currentTheme.card} backdrop-blur-md border ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'} rounded-2xl p-8 ${currentTheme.cardHover} transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
            <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">💬</div>
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3 group-hover:text-purple-400 transition-colors`}>Connect with Fans</h3>
            <p className={`${currentTheme.subtext} group-hover:opacity-80 transition-all`}>
              Meet people who share your passions and interests across various fandoms
            </p>
          </div>

          <div className={`group ${currentTheme.card} backdrop-blur-md border ${theme === 'dark' ? 'border-purple-500/30' : 'border-blue-200'} rounded-2xl p-8 ${currentTheme.cardHover} transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🌟</div>
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3 group-hover:text-blue-400 transition-colors`}>Explore Fandoms</h3>
            <p className={`${currentTheme.subtext} group-hover:opacity-80 transition-all`}>
              Discover communities from Harry Potter to Marvel, K-pop to Anime, and more
            </p>
          </div>

          <div className={`group ${currentTheme.card} backdrop-blur-md border ${theme === 'dark' ? 'border-purple-500/30' : 'border-pink-200'} rounded-2xl p-8 ${currentTheme.cardHover} transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/30 animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
            <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">❤️</div>
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3 group-hover:text-pink-400 transition-colors`}>Find Your Match</h3>
            <p className={`${currentTheme.subtext} group-hover:opacity-80 transition-all`}>
              Connect with like-minded individuals who share your fandoms and interests
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`group text-center ${currentTheme.card} backdrop-blur-md border ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'} rounded-2xl p-12 ${currentTheme.cardHover} transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>
          <h2 className={`text-4xl font-bold ${currentTheme.text} mb-4 group-hover:scale-105 transition-transform duration-300`}>
            Ready to Join the Community?
          </h2>
          <p className={`text-xl ${currentTheme.subtext} mb-6 group-hover:opacity-80 transition-all`}>
            Start your journey and connect with fans worldwide
          </p>
          <button
            onClick={() => navigate('/login')}
            className={`relative ${currentTheme.button} text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/50 animate-bounce-slow overflow-hidden group`}
          >
            <span className="relative z-10">Join Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(40px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }

        @keyframes float-slowest {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 6s ease-in-out infinite;
        }

        .animate-float-slowest {
          animation: float-slowest 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Homepage;