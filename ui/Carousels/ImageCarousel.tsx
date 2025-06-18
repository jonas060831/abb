'use client'
import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState<number>(0);
  const length = images.length;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [current, length]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goPrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // Touch swipe handlers for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // swipe left -> next
      goNext();
    } else if (diff < -50) {
      // swipe right -> prev
      goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (length === 0) return null;

  return (
    <div className='container' >
      <div
       className={styles.carousel_container}
      >
        <div
            className={styles.carousel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            >
            <div
                className={styles.slides}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, index) => (
                <div className={styles.slide} key={index}>
                    <img src={img} alt={`Slide ${index + 1}`} className={styles.image} />
                </div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className={styles.dots}>
                {images.map((_, idx) => (
                <button
                    key={idx}
                    className={`${styles.dot} ${current === idx ? styles.active : ''}`}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    type="button"
                />
                ))}
            </div>

            
            {/* Thumbnails */}
            <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                    <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`${styles.thumbnailWrapper} ${current === idx ? styles.activeThumb : ''}`}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className={styles.thumbnail} />
                    </button>
                ))}
            </div>


            {/* Desktop arrows */}
            <button
                className={styles.prev}
                onClick={goPrev}
                aria-label="Previous Slide"
                type="button"
            >
                &#10094;
            </button>
            <button
                className={styles.next}
                onClick={goNext}
                aria-label="Next Slide"
                type="button"
            >
                &#10095;
            </button>
        </div>
        
      </div>
        
    </div>
  );
};

export default ImageCarousel;
