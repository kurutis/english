import React, { useState, useRef, useEffect } from 'react';
import s from './informationModal.module.css';
import info2 from '../../assets/circle-info-solid.svg';
import moving from '../../assets/arrows-up-down-left-right-solid.svg';

const InformationModal = ({ children, surnameInputId = "surname" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const modalStartPos = useRef({ x: 0, y: 0 });

  const calculateInitialPosition = () => {
    const surnameInput = document.getElementById(surnameInputId);
    if (!surnameInput) return;

    const inputRect = surnameInput.getBoundingClientRect();
    const modalWidth = 300;
    
    setPosition({
      x: inputRect.right + 10,
      y: inputRect.top
    });
    setIsInitialized(true);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY
    };
    modalStartPos.current = {
      x: position.x,
      y: position.y
    };
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    const newX = modalStartPos.current.x + (e.clientX - dragStartPos.current.x);
    const newY = modalStartPos.current.y + (e.clientY - dragStartPos.current.y);
    
    setPosition({
      x: newX,
      y: newY
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    calculateInitialPosition();
    window.addEventListener('resize', calculateInitialPosition);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('resize', calculateInitialPosition);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isInitialized) return null;

  return (
    <div
      ref={modalRef}
      className={s.informationInputModal}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={s.dragHandle}>
        <h3>
          <img className={s.information} src={info2} alt="Информация" />
          Информация
          <img className={s.moving} src={moving} alt="Перемещение" />
        </h3>
      </div>
      <div className={s.content}>
        {children}
      </div>
    </div>
  );
};

export default InformationModal;