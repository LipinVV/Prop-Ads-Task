import React, {Dispatch, useReducer} from 'react';
import './App.scss';
import {Surveys} from "./Survey/Surveys";
import {BrowserRouter as Router, Route} from 'react-router-dom';
console.log(localStorage)

export const initialState = {
    gender: '',
    city: '',
    genderSurveyIsCompleted: false,
    citySurveyIsCompleted: false,
    feedBackFromCitySurvey: {},
    language: 'en'
};

export const StoreContext = React.createContext({state: initialState, dispatch: Dispatch});

export const ACTION = {
    PICK_GENDER: 'ADD_GENDER',
    PICK_CITY: 'PICK_CITY',
    ADD_COMMENT_CITY_SURVEY: 'ADD_COMMENT_CITY_SURVEY',
    CLEAR_STATE: 'CLEAR_STATE',
    SWITCH_LANGUAGE: 'SWITCH_LANGUAGE'
}

const reducer = (initialState, payLoad) => {
    console.log('APP', payLoad)
    switch (payLoad.action) {
        case ACTION.PICK_GENDER:
            return {
                ...initialState,
                gender: payLoad.payload,
                genderSurveyIsCompleted: true,
            };

        case ACTION.PICK_CITY:
            return {
                ...initialState,
                city: payLoad.payload,
                citySurveyIsCompleted: true,
            };
        case ACTION.ADD_COMMENT_CITY_SURVEY:
            return {
                ...initialState,
                feedBackFromCitySurvey: payLoad.payload
            };
        case ACTION.SWITCH_LANGUAGE:
            return {
                ...initialState,
                language: payLoad.payload
            };
        case ACTION.CLEAR_STATE:
            return initialState = ''
        default: {
            return initialState
        }
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <div className="App">
                <Router>
                    <Route to='/'>
                        <Surveys/>
                    </Route>
                </Router>
            </div>
        </StoreContext.Provider>
    );
}

export default App;
