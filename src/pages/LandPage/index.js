import React from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'
import picture1 from '../../assets/picture1.jpg'
import picture3 from '../../assets/picture3.jpg'

export default function LandPage(){
    const history = useHistory();

    function handleLogin(){
        history.push('login');
    }

    function handleRegister(){
        history.push('register');
    }
    
    return(
        <div className='container'>
            <div className='header'>
                <div>
                    <a href='#'>Ajuda na Grade</a>
                </div>
                <div>
                    <a href="#">Quem somos</a>
                    <a href="#">Contato</a>
                </div>
                <div>
                    <button type='button' onClick={handleLogin}>Iniciar</button>
                </div>
            </div>
            <div className='body'>
                <div className='content-1'>
                    <div className='first'>
                        <img src={picture1}></img>
                        <div>
                            <p>Elimine o conflito de horários de aulas e professores</p>
                            <p>O Ajuda na Grade auxilia na organização da grade escolar e demais atividades. Sem conflitos de horários</p>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='content-2'>
                    <p>Agenda individual para cada professor no App</p>
                    <button>Ver mais</button>
                </div>
                <div className='content-3'>
                    <div>
                        <p>Menos envio de PDF's e impressões</p>
                        <p>Atualização em tempo real! Os professores recebem as atualizações automaticamente no App!</p>
                    </div>
                    <img src={picture3}></img>
                </div>
                <div className='content-4'>
                    <p>Grade de aulas, atividades extracurriculares e mensagens instantâneas direto no App.</p>
                </div>

                <div className='content-5'>
                    <p>Podemos te ajudar!</p>
                    <button type='button' onClick={handleRegister}>Criar meu cadastro</button>
                </div>
            </div>
            <div className='footer'>
                <div>
                    <div>
                        <a href="#">Ajuda na Grade</a>
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
        </div>
    )
}