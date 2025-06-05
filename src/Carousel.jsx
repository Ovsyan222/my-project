import React, { useState, useRef, useEffect } from "react";
import './Carousel.css';

const images = Array.from({ length: 15 }, (_, i) => `/images/all/${i + 1}.png`);

const Carousel = ({ direction }) => {
    const carouselRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const requestIdRef = useRef(null);
    const startPositionRef = useRef(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const closeModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const carousel = carouselRef.current;

        const animate = () => {
            if (!isHovered) {
                startPositionRef.current += direction === 'left' ? -0.3 : 0.3;
                if (startPositionRef.current >= carousel.scrollWidth / 2) {
                    startPositionRef.current = 0;
                } else if (startPositionRef.current <= 0) {
                    startPositionRef.current = carousel.scrollWidth / 2;
                }
                carousel.scrollLeft = startPositionRef.current;
            }
            requestIdRef.current = requestAnimationFrame(animate);
        };

        requestIdRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestIdRef.current);
    }, [direction, isHovered]);

    return (
        <div className="carousel-container"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="carousel-content">
                {images.map((image, index) => (
                    <img key={index} src={image} className="carousel-image" onClick={() => setSelectedImage(image)} />
                ))}
                {images.map((image, index) => (
                    <img key={index} src={image} className="carousel-image" onClick={() => setSelectedImage(image)} />
                ))}
            </div>
            {selectedImage && (
                <div className="modal-window-image" onClick={closeModal}>
                    <div style={{ display: 'flex' }} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="" className="modal-image" />
                        <p>
                            <button onClick={closeModal} className="modal-image-close-button">&#10005;</button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;
