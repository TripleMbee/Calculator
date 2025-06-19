import React, { useEffect, useState } from 'react';

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    // Generate regular stars
    const generateStars = () => {
      const newStars = [];
      const numberOfStars = 150;

      for (let i = 0; i < numberOfStars; i++) {
        const size = Math.random();
        let starClass = 'star star-small';
        
        if (size > 0.7) {
          starClass = 'star star-large';
        } else if (size > 0.4) {
          starClass = 'star star-medium';
        }

        // Add floating animation to some stars
        if (Math.random() > 0.8) {
          starClass += ' star-float';
        }

        // Add pulsing animation to some stars
        if (Math.random() > 0.9) {
          starClass += ' star-pulse';
        }

        const star = {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          class: starClass,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 3
        };

        newStars.push(star);
      }

      setStars(newStars);
    };

    // Generate shooting stars periodically
    const generateShootingStar = () => {
      const shootingStar = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 50,
        delay: Math.random() * 2
      };

      setShootingStars(prev => [...prev, shootingStar]);

      // Remove shooting star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== shootingStar.id));
      }, 6000);
    };

    generateStars();

    // Generate shooting stars every 3-8 seconds
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance
        generateShootingStar();
      }
    }, 3000 + Math.random() * 5000);

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div className="stars-container">
      {/* Regular twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={star.class}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="star-shooting"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default Stars; 