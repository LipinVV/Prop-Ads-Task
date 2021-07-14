import React, {useContext, useState, useEffect} from 'react';
import {ACTION, StoreContext} from "../../App";
import {genders} from "../../data/data";
import './genderSurvey.scss'
import {Link} from "react-router-dom";
import {keyHandler} from "../../Service/keyHandler";
import {translations} from "../../languages/translations";

export const GenderSurvey = ({chosenLanguage}) => {
    const {state, dispatch} = useContext(StoreContext);
    const [genderOption, setGenderOption] = useState("");
    const completedQuestion = state.genderSurveyIsCompleted;
    const genderSetHandler = (evt) => {
        const {value} = evt.target
        setGenderOption(value)
    }

    useEffect(() => {
        const gender = localStorage.getItem('genderOption')
        if(gender) {
            setGenderOption(JSON.parse(gender))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('genderOption', JSON.stringify(genderOption))
    })
    return (
        <div className='gender-survey'>
            <h1 id='heading' className='gender-survey_header'>{translations[chosenLanguage].heading}<br/><span className='gender-survey_header-colored'>{translations[chosenLanguage].participation}</span></h1>
            <p className='gender-survey__question'>{translations[chosenLanguage].gender}</p>
            {[translations[chosenLanguage].genderIsMale, translations[chosenLanguage].genderIsFemale].map((gender, index) =>
                <label
                    className={gender === genderOption ? 'gender-survey__label-checked' : 'gender-survey__label' }
                    key={keyHandler(index)}>{gender}
                    <input
                        className='gender-survey__option'
                        onChange={genderSetHandler}
                        type='checkbox'
                        value={gender}
                        checked={gender === genderOption}
                    />
                </label>
            )}
            {!completedQuestion ? <button
                className={!genderOption ? 'gender-survey__feedback-survey-button' : 'gender-survey__feedback-survey-button-active'}
                disabled={!genderOption}
                type='button'
                onClick={() => dispatch({
                    action: ACTION.PICK_GENDER,
                    payload: genderOption
                })}>{translations[chosenLanguage].confirmAnswer}
            </button> : <div>
                <Link className='gender-survey__feedback-next-question' to='/citySurvey'>{translations[chosenLanguage].next}</Link>
            </div>}
        </div>
    )
}
