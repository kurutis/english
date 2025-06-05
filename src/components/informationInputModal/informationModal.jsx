import React, { useState, useRef } from 'react';
import s from './informationModal.module.css';
import info2 from '../../assets/circle-info-solid.svg';
import moving from '../../assets/arrows-up-down-left-right-solid.svg';

const InformationModal = () => {
  const [position, setPosition] = useState({ x: 1110, y: -520});
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const startPosition = useRef({ x: -306, y: 0 });
  
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    setPosition({
      x: e.clientX - startPosition.current.x,
      y: e.clientY - startPosition.current.y
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={modalRef}
        className={s.informationInputModal}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="drag-handle">
          <h3>
            <img className={s.information} src={info2} alt="Информация" />
            Информация
            <img className={s.moving} src={moving} alt="Перемещение" />
          </h3>
        </div>
        <div className="content">
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
