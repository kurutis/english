import React from 'react';
import { useSelector } from 'react-redux';
import s from './Header.module.css';
import calendar from '../../assets/calendar-days-regular.svg';
import book from '../../assets/book-bookmark-solid.svg';
import profile from '../../assets/user-regular.svg'

const Header = () => {
    const currentDate = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

     const formData = useSelector(state => state.authorization.formData);
    const { surname, name } = formData;
    const showName = useSelector(state => state.authorization.showName);
    return (
        <header className={s.header}>
            <p>
                Экзамен: <img className={s.icon} src={calendar} alt="" /> {currentDate} <img className={s.icon} src={book} alt="" /> ОГЭ Английский язык в компьютерной форме
            </p>
            {showName && (
                <div className={s.user}>
                    <p>{`${name} ${surname}`}</p> <img className={s.icon} src={profile} alt="" />
                </div>
            )}
        </header>
 );
};

export default Header;
