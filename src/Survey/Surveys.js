import React from 'react';
import './surveys.scss'
import {GenderSurvey} from './GenderSurvey/GenderSurvey'
import {CitySurvey} from "./CitySurvey/CitySurvey";
import {Gratitude} from "./Gratitude/Gratitude";
import {Route, Switch} from "react-router-dom";

export const Surveys = () => {
    return (
        <div className='surveys'>
            <Switch>
                <Route  exact path='/'><GenderSurvey/></Route>
                <Route  exact path='/citySurvey'><CitySurvey/></Route>
                <Route  exact path='/gratitude'><Gratitude/></Route>
            </Switch>
        </div>
    )
}
