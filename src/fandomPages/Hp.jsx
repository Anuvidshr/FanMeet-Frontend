import React, { useEffect, useRef } from 'react';

const Hp = () => {
  const canvasRef = useRef(null);

  const characters = [
    { name: 'Harry Potter', role: 'The Chosen One', avatar: '⚡' },
    { name: 'Hermione Granger', role: 'Brightest Witch', avatar: '📚' },
    { name: 'Ron Weasley', role: 'Loyal Friend', avatar: '♟️' },
  ];

  const externalLinks = [
    { name: 'Wizarding World', url: 'https://www.wizardingworld.com', icon: '🪄' },
    { name: 'Watch Movies', url: 'https://www.hbomax.com', icon: '🎬' },
    { name: 'Hogwarts Legacy', url: 'https://www.hogwartslegacy.com', icon: '🎮' },
  ];

  const handleTalkToCharacter = (character) => {
    console.log(`Starting chat with ${character.name}`);
    alert(`Starting conversation with ${character.name}!`);
  };

  // Animated particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for magical effects
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkle = Math.random() * 0.02 + 0.01;
        this.twinkleDirection = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Twinkling effect
        this.opacity += this.twinkle * this.twinkleDirection;
        if (this.opacity >= 0.8 || this.opacity <= 0.3) {
          this.twinkleDirection *= -1;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(147, 51, 234, ${this.opacity})`; // Purple magic
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between nearby particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-950 to-black">
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
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Harry Potter Fandom
          </h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-3xl mx-auto">
            <span className="font-bold">Hey Wizard and Witches!</span> Step into the wizarding world where magic, friendship, and destiny collide.
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
                className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {character.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {character.name}
                  </h3>
                  <p className="text-purple-300 text-sm mb-4">
                    {character.role}
                  </p>
                  <button
                    onClick={() => handleTalkToCharacter(character)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
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
                className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group flex items-center gap-4"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-purple-400 text-sm flex items-center gap-1">
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
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-purple-500/30 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/20 hover:border-purple-400 transition-all duration-200"
          >
            ← Back to Explore
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hp;
