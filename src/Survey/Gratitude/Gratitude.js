import {Link} from 'react-router-dom';
import './gratitude.scss'
import {translations} from "../../languages/translations";
export const Gratitude =({chosenLanguage}) => {
    const word = translations[chosenLanguage]
    return (
        <section className='gratitude'>
            <h1 className='gratitude__header'>{chosenLanguage === 'ru' ? word.gratitude.slice(0, 10) : word.gratitude.slice(0, 9)}<br className='gratitude__header__breaker'/>{chosenLanguage === 'ru' ? word.gratitude.slice(10, 22) : word.gratitude.slice(9, 33)}<br/>{word.importanceOfFeedback}</h1>
            <a className='gratitude__company-link' onClick={() => window.localStorage.clear()} href='https://propellerads.com/'>{word.visitPropAds}</a>
            <Link  className='gratitude__exit-link' onClick={() => window.localStorage.clear()}  to='/'>{word.return}</Link>
        </section>
    )
}