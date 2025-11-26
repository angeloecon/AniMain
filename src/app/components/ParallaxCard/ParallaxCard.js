'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import styles from './ParallaxCard.module.css';

function ParallaxCard({ title, content, image }) {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ mouseX: 0, mouseY: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mouseLeaveDelay = useRef(null);

  useEffect(() => {
 
    const handleResize = () => {
      if (cardRef.current) {
        setDimensions({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
      const { offsetLeft, offsetTop } = cardRef.current;
    const { width, height } = dimensions;
    
    const mouseX = e.pageX - offsetLeft - width / 2;
    const mouseY = e.pageY - offsetTop - height / 2;

    setMousePos({ mouseX, mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (mouseLeaveDelay.current) {
      clearTimeout(mouseLeaveDelay.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
     mouseLeaveDelay.current = setTimeout(() => {
      setMousePos({ mouseX: 0, mouseY: 0 });
    }, 1000);
  };

   const mousePX = dimensions.width > 0 ? mousePos.mouseX / dimensions.width : 0;
  const mousePY = dimensions.height > 0 ? mousePos.mouseY / dimensions.height : 0;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
    backgroundImage: `url(${image})`,
  };

  return (
    <div
      className={styles.cardWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className={styles.card} style={cardStyle}>
        <div className={styles.cardBg} style={cardBgTransform} />
        <div className={styles.cardInfo}>
          <h1 className={styles.header}>{title}</h1>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(ParallaxCard)