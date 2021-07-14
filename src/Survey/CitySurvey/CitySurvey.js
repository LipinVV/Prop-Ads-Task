import React, {useContext, useEffect, useState} from 'react';
import {ACTION, StoreContext} from "../../App";
import {cities} from "../../data/data";
import './citySurvey.scss'
import {Link} from 'react-router-dom';
import {keyHandler} from "../../Service/keyHandler";

export const CitySurvey = () => {
    const {state, dispatch} = useContext(StoreContext);
    const firstCity = Object.values(cities)[0];
    const [cityOption, setCityOption] = useState('Москва');
    const mailCondition = (message, email) => {
        return message.length < 3 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    }

    const completedQuestion = state.citySurveyIsCompleted;
    const citySetHandler = (evt) => {
        const {value} = evt.target
        setCityOption(value)
    }

    const [email, setEmail] = useState("")
    const emailHandler = (evt) => {
        const {value} = evt.target
        setEmail(value)
    }
    const [message, setMessage] = useState("")
    const messageHandler = (evt) => {
        const {value} = evt.target
        setMessage(value)
    }

    const [modal, setModal] = useState(false)
    const popUp = () => {
        setModal(prevState => !prevState)
    }

    useEffect(() => {
        const city = localStorage.getItem('city')
        const email = localStorage.getItem('emailFromCitySurvey')
        const comments = localStorage.getItem('comments')
        if (city) {
            setCityOption((JSON).parse(city))
        }
        if (email) {
            setEmail(JSON.parse(email))
        }
        if (comments) {
            setMessage(JSON.parse(comments))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('city', JSON.stringify(cityOption))
        localStorage.setItem('emailFromCitySurvey', JSON.stringify(email))
        localStorage.setItem('comments', JSON.stringify(message))
    })

    return (
        <div className='city-survey'>
            <p className='city-survey__question'>В каком городе Вы живете?</p>
            {!modal && <select className='city-survey__options' value={cityOption}
                     onChange={citySetHandler}>
                {Object.values(cities).map((city, index) => (
                        <option className='city-survey__option' key={keyHandler(index)} value={city}
                                defaultValue={firstCity}>{city}</option>
                    )
                )}
            </select>}
            {!modal && <div className='city-survey__feedback'>
                <label className='city-survey__feedback-label'>Оставьте Ваш комментарий <br/> (по желанию):</label>
                <textarea className='city-survey__feedback-textarea' value={message} onChange={messageHandler}/>
                {message.length > 0 && message.length < 3 ?
                    <span className='city-survey__feedback-warning'>Введите минимум 3 символа</span> : null}
                <label className='city-survey__feedback-email'>Укажите Ваш e-mail<br/><span className='city-survey__feedback-warning'>(обязательно для комментария):</span>
                    <input className='city-survey__feedback-email-input'
                           required={true}
                           onChange={emailHandler}
                           type='text'
                           value={email}
                    >
                    </input>
                </label>
                {!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && email.length > 0 ?
                    <span className='city-survey__feedback-warning'>Неверный формат e-mail</span> : null}
                <button
                    className={Boolean(mailCondition(message, email)) ? 'city-survey__feedback-sending-button-disabled' : 'city-survey_feedback-sending-button'}
                    type='button'
                    hidden={modal}
                    onClick={
                        () => {
                            dispatch({
                                action: ACTION.ADD_COMMENT_CITY_SURVEY,
                                payload: {message, email}
                            });
                            popUp()
                        }
                    }>Добавить комментарий
                </button>
            </div>}
            {modal && <div className='city-survey__modal-window'>
                Ваши комментарий сохранён!
            </div>}
            <div className='city-survey__chosen-option'>Вы выбрали: <span
                className='city-survey__chosen-option-colored'>{cityOption}</span></div>
            {!completedQuestion ?
                <button
                    className='city-survey__feedback-survey-button'
                    type='button'
                    onClick={() => dispatch({
                        action: ACTION.PICK_CITY,
                        payload: cityOption
                    })}>Подтвердить
                </button> :
                <div>
                    <Link onClick={() => dispatch({
                        action: ACTION.CLEAR_STATE
                    })} className='city-survey__feedback-ending' to='/gratitude'>Завершить</Link>
                </div>
            }
        </div>
    )
}