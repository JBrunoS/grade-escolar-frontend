import React, { useEffect } from 'react'
import { FaUserTie, FaBook, FaUsers, FaClock, FaLayerGroup, FaTable, FaUser, FaPowerOff } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

import './style.css'
import logo from '../../assets/logo.png'

export default function Menu(){
    const history = useHistory();
    const escola_nome = localStorage.getItem('escola_nome')

    useEffect(() => {
        if(!escola_nome){
            //history.push('/login');
        }
    });

    function handleLogout(){
        localStorage.clear();
        history.push('/login')
    }
    return(
        <div className='container-menu'>
            <div className='home-menu'>
                <Link to='/home'><img src={logo} alt='Ajuda na grade'/></Link>
            </div>
            
            <div className='body-menu'>
                <Link to='/professor'><FaUserTie size={20} color='#FFFFFF' /> Professores</Link>
                <hr/>
                <Link to='/nivel'> <FaLayerGroup size={20} color='#FFFFFF' /> Níveis</Link>
                <hr/>
                <Link to='/turno'><FaClock size={20} color='#FFFFFF'/> Turnos</Link>
                <hr/>
                <Link to='/disciplina'> <FaBook size={20} color='#FFFFFF' /> Disciplinas</Link>
                <hr/>
                <Link to='/turma'> <FaUsers size={20} color='#FFFFFF'/> Turmas</Link>
                <hr/>
                <Link to='/grade'> <FaTable size={20} color='#FFFFFF' /> Grade</Link>
                
                
            </div>

            <div className='footer-menu'>
                <Link to='/profile'><FaUser size={20} color='#FFFFFF' /> {escola_nome}</Link>
                <button onClick={handleLogout}> <FaPowerOff size={25} color='#EEE' /> </button>
            </div>
        </div>
    )
}