import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

import cellphone from '../../assets/cell.png'
import demonstration from '../../assets/demonstration.gif'
import pc from '../../assets/pc.png'
import cellphone1 from '../../assets/cell1.png'

import './style.css'

export default function Funcionalities(){

    const [classHeader, setClassHeader] = useState('header')

    function scroll(){

        if (document.documentElement.scrollTop > 50) {
            setClassHeader('small-header');
        }else{
            setClassHeader('header')
        }
    }

    useEffect(() => {
        window.onscroll = () => scroll();
    });

    return(
        <div className='container-funcionalities'>
            <div className={classHeader}>
                <div>
                    <Link to='/'>Ajuda na Grade</Link>
                </div>
                
                <div className="dropdown">
                    <button className="dropbtn"><FaBars size={25} color='#337ed4' /></button>
                    <div className="dropdown-content">
                        <Link to="/login">Login</Link>
                        <Link to="/">Quem somos</Link>
                        <Link to="/funcionalities">Funcionalidades</Link>
                        <Link to="/contact">Contato</Link>
                    </div>
                </div>
                
            </div>
            
            <div className='body-funcionalities'>
                <div>
                    <div>
                        <p>Agenda individuais para cada professor</p>
                        <span> - Cada professor vai conseguir ter acesso a sua agenda</span>
                        <span> - Registrar observações para a próxima aula</span>
                        <span> - Mensagens e observações da direção/coordenação aparecem no App</span>
                    </div>
                    <img src={cellphone} />
                    <img className='demonstration' src={demonstration} />
                </div>
                <div>
                    <img src={pc}></img>
                    <img src={cellphone1}></img>
                </div>
                <div></div>
            </div>
            
            <div className='footer'>
                <div>
                    <div>
                        <a href="http://localhost:3000">Ajuda na Grade</a>
                    </div>
                    <div>
                        <span>Contato</span>
                        <p>Email: joaobruno.sousa@outlook.com</p>
                        <p>Telefone: (85) 99287-9779</p>
                    </div>
                </div>
                <div>
                    <span>Copyright &copy; AjudaNagrade 2020</span>
                </div>
            </div>
        </div>
    )
}