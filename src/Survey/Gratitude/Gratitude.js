import {Link} from 'react-router-dom';
import './gratitude.scss'
export const Gratitude =() => {

    return (
        <section className='gratitude'>
            <h1 className='gratitude__header'>Благодарим за участие! Ваше мнение очень важно для нас</h1>
            <a className='gratitude__company-link' onClick={() => window.localStorage.clear()} href='https://propellerads.com/'>Посетить сайт компании</a>
            <Link  className='gratitude__exit-link' onClick={() => window.localStorage.clear()}  to='/'>Вернуться в начало</Link>
        </section>
    )
}