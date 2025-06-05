import React from "react";
import s from './InfoInputModal.module.css'

const InfoInputModal = () =>{
    return(
        <>
            <p>На данном этапе Вам необходимо ввести Ваши ФИО и паспортные данные.</p>
            <p>В рамках демонстрационной версии можно ввести:</p>
            <ul>
                <li>любые значения ФИО</li>
                <li>любое четырехзначное число в поле "Серия"</li>
                <li>любое шестизначное число в поле "Номер"</li>
            </ul>
            <p>Введенные значения сохранятся не будут</p>
        </>
    )
} 

export default InfoInputModal;