import React, { useState } from 'react';
import s from './AuthorizationForm.module.css'
import info from '../../assets/info.svg'
import arrow from '../../assets/arrow-right-long-solid.svg'
import question from '../../assets/circle-question-regular.svg'
import InformationModal from '../informationInputModal/informationModal'
import { useDispatch, useSelector } from 'react-redux';
import { setFieldValue, setErrors, clearForm } from '../../features/authorizationSlice';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink, Outlet } from 'react-router-dom'
import InfoInputModal from '../infoInputModal/InfoinputModal';

const AuthorizationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector(state => state.authorization.formData);
    const errors = useSelector(state => state.authorization.errors);

    const handleInputChange = (e) => {
    const { name, value } = e.target;

     if (name === 'documentSeries') {
      if (/^\d{0,4}$/.test(value)) {
        dispatch(setFieldValue({ field: name, value }));
      }
    } else if (name === 'documentNumber') {
      if (/^\d{0,6}$/.test(value)) {
        dispatch(setFieldValue({ field: name, value }));
      }
    } else {
      dispatch(setFieldValue({ field: name, value }));
    }

    dispatch(setErrors({ ...errors, [name]: '' }));
    };

    setErrors(prev => ({ ...prev, [name]: '' }));

  const validate = () => {
    const newErrors = {};

        if (!formData.surname.trim()) newErrors.surname = 'Обязательное поле';
        if (!formData.name.trim()) newErrors.name = 'Обязательное поле';
        if (!formData.patronymic.trim()) newErrors.patronymic = 'Обязательное поле';

        if (!formData.documentSeries) {
            newErrors.documentSeries = 'Обязательное поле';
        } else if (formData.documentSeries.length !== 4) {
            newErrors.documentSeries = 'Серия должна содержать 4 цифры';
        }

        if (!formData.documentNumber) {
            newErrors.documentNumber = 'Обязательное поле';
        } else if (formData.documentNumber.length !== 6) {
            newErrors.documentNumber = 'Номер должен содержать 6 цифр';
        }

        dispatch(setErrors(newErrors));
        return Object.keys(newErrors).length === 0;
    };

     const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(showUserName());
      navigate('/ChoosePlace');
    }
  };

  return (
    <div className={s.authorizationForm}>
      <h1>Авторизация участника экзамена</h1>
      <h2><div><p>1</p></div> Введите ФИО и сведения о документе, удостоверяющем личность</h2>
      <span><img className={s.info} src={info} alt="Информация" /> Сведения вносятся только участником</span>
      <form className={s.form_all} onSubmit={handleSubmit} noValidate>
        <div className="form_input">
            <div className={s.form_group}>
          <label htmlFor="surname">Фамилия</label>
          <input
            className={`${s.input} ${errors.surname ? s.errorInput : ''}`}
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder="Введите фамилию"
          />
          {errors.surname && <div className={s.errorText}>{errors.surname}</div>}
        </div>

        <div className={s.form_group}>
          <label htmlFor="name">Имя</label>
          <input
            className={`${s.input} ${errors.name ? s.errorInput : ''}`}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Введите имя"
          />
          {errors.name && <div className={s.errorText}>{errors.name}</div>}
        </div>

        <div className={s.form_group}>
          <label htmlFor="patronymic">Отчество</label>
          <input
            className={`${s.input} ${errors.patronymic ? s.errorInput : ''}`}
            type="text"
            id="patronymic"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleInputChange}
            placeholder="Введите отчество"
          />
          {errors.patronymic && <div className={s.errorText}>{errors.patronymic}</div>}
        </div>

        <div className={s.passport}>
          <div className={s.form_group}>
            <label htmlFor="documentSeries">Серия документа</label>
            <input
              className={`${s.input} ${errors.documentSeries ? s.errorInput : ''}`}
              type="text"
              id="documentSeries"
              name="documentSeries"
              value={formData.documentSeries}
              onChange={handleInputChange}
              placeholder="Введите серию"
            />
            {errors.documentSeries && <div className={s.errorText}>{errors.documentSeries}</div>}
          </div>

          <div className={s.form_group}>
            <label htmlFor="documentNumber">Номер документа</label>
            <input
              className={`${s.input} ${errors.documentNumber ? s.errorInput : ''}`}
              type="text"
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleInputChange}
              placeholder="Введите номер"
            />
            {errors.documentNumber && <div className={s.errorText}>{errors.documentNumber}</div>}
          </div>
        </div>
        </div>
        <div className={s.footer_form}>
            <div className={s.late}>
                <div className={s.late_input}>
                    <input className={s.input}
                    type="text"
                    id="late"
                    name="late"
                    placeholder="Опоздание или неявка участника *"
                    disabled
                    />
                    <div className= {s.tooltip}>
                        <span className={s.tooltiptext}>Функция недоступна во время демонстрации</span>
                        <img className={s.question} src={question} alt="" />
                    </div>
                </div>
                <label htmlFor="late">*Выполняется организатором в случае опоздания/неявки участника</label>
            </div>
            <div>
                <NavLink className={({isActive, isPending}) => isActive ? s.active : isPending} to={'ChoosePlace'} ><button type="submit">Продолжить <img src={arrow} alt="" /></button></NavLink>
            </div>
        </div>
      </form>
      <InformationModal>
        <InfoInputModal />
      </InformationModal>
    </div>
  );
};

export default AuthorizationForm;