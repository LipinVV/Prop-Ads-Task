import React, {useContext, useEffect, useState} from 'react';
import './surveys.scss'
import {ACTION, StoreContext} from "../App";
import {GenderSurvey} from './GenderSurvey/GenderSurvey'
import {CitySurvey} from "./CitySurvey/CitySurvey";
import {Gratitude} from "./Gratitude/Gratitude";
import {Route, Switch} from "react-router-dom";
import {translations} from "../languages/translations";
import {keyHandler} from "../Service/keyHandler";

export const Surveys = () => {

    const {state, dispatch} = useContext(StoreContext);

    const [language, setLanguage] = useState(state.language)
    const languageHandler = (evt) => {
        const {value} = evt.target
        setLanguage(value)
    }
    const [languageOptions, setLanguageOptions] = useState(true);
    const languageShowHandler = () => {
        setLanguageOptions(prevState => !prevState)
    }
    useEffect(() => {
        const lang = localStorage.getItem('language')
        if (lang) {
            setLanguage(JSON.parse(lang))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('language', JSON.stringify(language))
    })
    return (
        <div className='surveys'>
            {languageOptions ? <div className='surveys__languages'>
                <div className='surveys__languages-section'>
                    {Object.keys(translations).map((lang, index) => (
                        <label className={lang === language ? 'surveys__language-colored' : 'surveys__language' }
                               key={keyHandler(index)}>{lang === 'ru' ? "Русский" : "English"}
                            <input className='surveys__language-option'
                                   value={lang}
                                   checked={lang === language}
                                   onChange={languageHandler}
                                   type='checkbox' key={keyHandler(index)}/>
                        </label>))}
                </div>
                <button
                    className='surveys__language-apply'
                    onClick={
                        () => {
                            dispatch({
                                action: ACTION.SWITCH_LANGUAGE,
                                payload: language
                            });
                            languageShowHandler()
                        }
                    }
                >{translations[language].chooseLang}
                </button>
            </div> : null}
            <Switch>
                <Route exact path='/'><GenderSurvey chosenLanguage={language}/></Route>
                <Route exact path='/citySurvey'><CitySurvey chosenLanguage={language}/></Route>
                <Route exact path='/gratitude'><Gratitude chosenLanguage={language}/></Route>
            </Switch>
        </div>
    )
}
