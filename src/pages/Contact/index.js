import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { FaBars, FaWhatsapp } from 'react-icons/fa'

import './style.css'

export default function Contact(){
    const [classHeader, setClassHeader] = useState('header')

    function scroll(){
        if (document.documentElement.scrollTop > 10) {
            setClassHeader('small-header');
        }else{
            setClassHeader('header')
        }
    }

    useEffect(() => {
        window.onscroll = () => scroll();
    });

    return(
        <div className='container'>
            <div className={classHeader}>
                <div>
                    <Link to='/'>Ajuda na Grade</Link>
                </div>
                
                <div className="dropdown">
                    <button className="dropbtn"><FaBars size={25} color='#337ed4' /></button>
                    <div className="dropdown-content">
                        <Link to="/login">Login</Link>
                        <Link to="/">Quem somos</Link>
                        <Link to="/funcionality">Funcionalidades</Link>
                        <Link to="/contact">Contato</Link>
                    </div>
                </div>
                
            </div>
            <div className='body-contact'>
                <label className='show-contact'>Mensagens</label>
                <form >
                    <input className='show-text-contact' required placeholder='Insira seu nome aqui' />
                    <input className='show-text-contact' required placeholder='Ex.: (85) 998820090' />
                    <input className='show-text-contact' required type='email' placeholder='Insira seu email aqui' />
                    <textarea className='show-text-contact' placeholder='Sua pergunta ou comentário aqui' ></textarea>
                    <button className='show-contact'>Enviar</button>
                </form>
            </div>

            <div className='footer-contact'>
                <div>
                    <div>
                        <a href="http://localhost:3000">Ajuda na Grade</a>
                    </div>
                    <div>
                        <span>Contato</span>
                        <p>Email: joaobruno.sousa@yahoo.com</p>
                        <p>Telefone: (85) 992879779</p>
                    </div>
                </div>
                <div>
                    <span>Copyright &copy; AjudaNagrade 2020</span>
                </div>
            </div>

            <a href="https://api.whatsapp.com/send?phone=558587306182&text=Olá, Gostaria de saber mais informações sobre o Ajuda na Grade." 
            target='_blank' rel="noopener noreferrer">
                <div className='float'><FaWhatsapp size={30} color='#FFF' /></div>
            </a>
            
        </div>
    )
}