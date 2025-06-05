import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showUserName } from '../../features/authorizationSlice';
import s from './ChoosePlace.module.css';
import arrow from '../../assets/arrow-right-long-solid.svg'
import { NavLink } from 'react-router-dom';
import InformationModal from '../../components/informationInputModal/informationModal';
import InfoPlace from '../../components/InfoPlaceModal/InfoPlaceModal';
import arrow_down from '../../assets/chevron-down-solid.svg'


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
    ]
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
                        <Select options={auditoriumOptions} onChange={(selectedOption) => setAuditorium(selectedOption)} placeholder='Выберите номер' />
                    </div> 
                </div>
                <div className={s.place}>
                    <h3>№ Места</h3>
                    <div className={s.form_group}>
                        <label>Ряд (буква)</label>
                        <select value={row} onChange={(e) => setRow(e.target.value)}>
                            <option value="А">А</option>
                            <option value="Б">Б</option>
                            <option value="В">В</option>
                        </select>
                    </div>
                    <div className={s.form_group}>
                        <label>Место (цифра)</label>
                        <select value={seat} onChange={(e) => setSeat(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className={s.footer}>
                    <NavLink><button>Продолжить <img src={arrow} alt="" /></button></NavLink>
                </div>
            </form>
            <InformationModal>
                <InfoPlace />
            </InformationModal>
        </div>
    );
};

export default ChoosePlace;
