import React, {useContext, useEffect, useState} from 'react';
import {ACTION, StoreContext} from "../../App";
import './citySurvey.scss'
import {Link} from 'react-router-dom';
import {keyHandler} from "../../Service/keyHandler";
import {translations} from "../../languages/translations";

export const CitySurvey = ({chosenLanguage}) => {
    const {state, dispatch} = useContext(StoreContext);
    const word = translations[chosenLanguage]
    const cities= [word.moscow, word.saintPetersburg, word.kazan, word.nizhnyNovgorod]
    const [cityOption, setCityOption] = useState(word.moscow);
    const mailCondition = (message, email) => {
        return message.length < 3 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    }

    const [completedQuestion, setCompletedQuestion] = useState(state.citySurveyIsCompleted);
    const questionHandler = () => {
        setCompletedQuestion(prevState => !prevState)
    }
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
        const citySurveyIsFinished = localStorage.getItem('citySurveyIsFinished')
        if (city) {
            setCityOption((JSON).parse(city))
        }
        if (email) {
            setEmail(JSON.parse(email))
        }
        if (comments) {
            setMessage(JSON.parse(comments))
        }
        if(citySurveyIsFinished) {
            setCompletedQuestion(JSON.parse(citySurveyIsFinished))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('city', JSON.stringify(cityOption))
        localStorage.setItem('emailFromCitySurvey', JSON.stringify(email))
        localStorage.setItem('comments', JSON.stringify(message))
        localStorage.setItem('citySurveyIsFinished', JSON.stringify((completedQuestion)))
    })
    console.log('cityOption', cityOption)
    console.log('lan', chosenLanguage)
    return (
        <div className='city-survey'>
            <h1 className='city-survey__question'>{chosenLanguage === 'ru' ? word.pickTheCity.slice(0, 14) : word.pickTheCity.slice(0, 10)}<br className='city-survey__question-breaker'/>{chosenLanguage==='ru' ? word.pickTheCity.slice(14, 26) : word.pickTheCity.slice(10, 26)}</h1>
            {!modal && <select className='city-survey__options' value={cityOption}
                     onChange={citySetHandler}>
                {Object.values(cities).map((city, index) => (
                        <option className='city-survey__option' key={keyHandler(index)} value={city}
                                defaultValue={word.moscow}>{city}</option>
                    )
                )}
            </select>}
            {!modal && <div className='city-survey__feedback'>
                <label className='city-survey__feedback-label'>{word.leaveComment}<br/>{word.optionalFiled}</label>
                <textarea className='city-survey__feedback-textarea' value={message} onChange={messageHandler}/>
                {message.length > 0 && message.length < 3 ?
                    <span className='city-survey__feedback-warning'>{word.minimumSymbols}</span> : null}
                <label className='city-survey__feedback-email'>{word.enterEmail}<br/><span className='city-survey__feedback-warning'>{word.commentObligation}</span>
                    <input className='city-survey__feedback-email-input'
                           required={true}
                           onChange={emailHandler}
                           type='text'
                           value={email}
                    >
                    </input>
                </label>
                {!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && email.length > 0 ?
                    <span className='city-survey__feedback-warning'>{word.wrongMailFormat}</span> : null}
                <button
                    disabled={Boolean(mailCondition(message, email))}
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
                    }>{word.leaveComment}
                </button>
            </div>}
            {modal && <div className='city-survey__modal-window'>
                {word.commentSaved}
            </div>}
            {!modal && <div className='city-survey__feedback-warning'>{word.noComments}</div>}
            <div className='city-survey__chosen-option'>{word.yourAnswer} <span
                className='city-survey__chosen-option-colored'>{cityOption}</span>
            </div>
            {!completedQuestion ?
                <button
                    className='city-survey__feedback-survey-button'
                    type='button'
                    onClick={
                        () => {
                            dispatch({
                                action: ACTION.PICK_CITY,
                                payload: cityOption
                            });
                            questionHandler()
                        }
                    }>{word.confirmAnswer}
                </button> :
                <div><Link onClick={() => dispatch({
                    action: ACTION.CLEAR_STATE
                })} className='city-survey__feedback-ending' to='/gratitude'>{word.submitSurvey}</Link></div>
            }
        </div>
    )
}