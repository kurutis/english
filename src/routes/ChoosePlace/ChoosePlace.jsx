import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { showUserName } from '../../features/authorizationSlice';
import s from './ChoosePlace.module.css';
import arrow from '../../assets/arrow-right-long-solid.svg';
import { NavLink } from 'react-router-dom';
import InformationModal from '../../components/informationInputModal/informationModal';
import InfoPlace from '../../components/InfoPlaceModal/InfoPlaceModal';
import arrow_down from '../../assets/chevron-down-solid.svg';

// Кастомный компонент Select с поддержкой disabled состояния
const CustomSelect = ({ options, value, onChange, placeholder, className, disabled, disabledColor = '#585D6B' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleClickOutside = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={selectRef}
      className={`${s.customSelect} ${className} ${isOpen ? s.open : ''} ${disabled ? s.disabled : ''}`}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      style={disabled ? { pointerEvents: 'none' } : {}}
    >
      <div className={s.selectHeader}>
        <span 
          className={s.selectedValue}
          style={!value && disabled ? { color: disabledColor } : {}}
        >
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </span>
        <img 
          src={arrow_down} 
          alt="▼" 
          className={s.arrowIcon} 
          style={disabled ? { opacity: 0.5 } : {}} 
        />
      </div>
      {isOpen && !disabled && (
        <div className={s.selectOptions}>
          {options.map(option => (
            <div
              key={option.value}
              className={`${s.option} ${value === option.value ? s.selected : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ChoosePlace = () => {
    const dispatch = useDispatch();
    const [auditorium, setAuditorium] = useState(null);
    const [row, setRow] = useState('');
    const [seat, setSeat] = useState('');

    const auditoriumOptions = [
        { value: '0001', label: '0001'},
        { value: '0002', label: '0002' },
        { value: '0003', label: '0003' },
        { value: '0004', label: '0004' },
        { value: '0023', label: '0023' },
        { value: '0024', label: '0024' },
        { value: '0025', label: '0025' },
        { value: '0026', label: '0026' },
        { value: '0027', label: '0027' },
        { value: '0028', label: '0028' },
        { value: '0029', label: '0029' },
        { value: '0030', label: '0030' },
        { value: '0031', label: '0031' },
        { value: '0032', label: '0032' },
        { value: '0033', label: '0033' },
        { value: '0034', label: '0034' },
        { value: '0035', label: '0035' },
    ];

    const rowOptions = [
        { value: 'А', label: 'А' },
        { value: 'Б', label: 'Б' },
        { value: 'В', label: 'В' }
    ];

    const seatOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }
    ];

    useEffect(() => {
        dispatch(showUserName());
    }, []);

    return (
        <div className={s.ChoosePlace}>
            <h1>Авторизация участника экзамена</h1>
            <h2><div><p>2</p></div> Выберите номер аудитории и место, за которым Вы сдаёте экзамен</h2>
            <form className={s.PlaceForm}>
                <div className={s.auditorium}>
                    <div className={s.form_group}>
                        <h3>№ Аудитории</h3>
                        <CustomSelect 
                            options={auditoriumOptions} 
                            value={auditorium} 
                            onChange={setAuditorium} 
                            placeholder="Выберите номер"
                            className={s.auditoriumSelect}
                        />
                    </div> 
                </div>
                <h3>№ Места</h3>
                <div className={s.place}>
                    <div className={s.form_group}>
                        <label>Ряд (буква)</label>
                        <CustomSelect 
                            options={rowOptions} 
                            value={row} 
                            onChange={setRow} 
                            placeholder="Выберите ряд"
                            className={s.rowSelect}
                            disabled={!auditorium}
                            disabledColor="#585D6B"
                        />
                    </div>
                    <div className={s.form_group}>
                        <label>Место (цифра)</label>
                        <CustomSelect 
                            options={seatOptions} 
                            value={seat} 
                            onChange={setSeat} 
                            placeholder="Выберите место"
                            className={s.seatSelect}
                            disabled={!auditorium}
                            disabledColor="#585D6B"
                        />
                    </div>
                </div>
                <div className={s.footer}>
                    <button>Продолжить <img src={arrow} alt="" /></button>
                </div>
            </form>
            <InformationModal>
                <InfoPlace />
            </InformationModal>
        </div>
    );
};

export default ChoosePlace;