import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'
import picture1 from '../../assets/picture1.jpg'
import picture3 from '../../assets/picture3.jpg'

export default function LandPage(){
    const history = useHistory();
    const [class1, setClass1 ] = useState('hidden')
    const [class2, setClass2 ] = useState('hidden')
    const [class3, setClass3 ] = useState('hidden')
    const [class4, setClass4 ] = useState('hidden')
    const [class5, setClass5 ] = useState('hidden')

    function scroll(){
        var width = window.screen.width;

        if (width > 400 && document.documentElement.scrollTop > 300) {
            setClass1('show')
        }

        if (width < 400 && document.documentElement.scrollTop >= 93) {
            setClass1('show')
        }

        if (width > 400 && document.documentElement.scrollTop > 900) {
            setClass2('show-text')
            setClass3('show')
        }

        if (width < 400 && document.documentElement.scrollTop >= 500) {
            setClass2('show-text')
            setClass3('show')
        }

        if (width > 400 && document.documentElement.scrollTop > 1809) {
            setClass4('show')
        }

        if (width < 400 && document.documentElement.scrollTop >= 1039) {
            setClass4('show')
        }

        if (width > 400 && document.documentElement.scrollTop > 2180) {
            setClass5('show')
        }

        if (width < 400 && document.documentElement.scrollTop >= 1493) {
            setClass5('show')
        }
        

        console.log(document.documentElement.scrollTop);
    }

    useEffect(() => {
     window.onscroll = () => scroll();
    });

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
                    <a href='http://localhost:3000'>Ajuda na Grade</a>
                </div>
                <div>
                    <a href="http://localhost:3000">Quem somos</a>
                    <a href="http://localhost:3000">Contato</a>
                </div>
                <div>
                    <button type='button' onClick={handleLogin}>Iniciar</button>
                </div>
            </div>
            <div className='body'>
                <div className='content-1 show'>
                    <div className='first'>
                        <img alt='imagem' src={picture1} className=''></img>
                        <div className='show-text'>
                            <p>Elimine o conflito de horários de aulas e professores</p>
                            <p>O Ajuda na Grade auxilia na organização da grade escolar e demais atividades. Sem conflitos de horários</p>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='content-2'>
                    <p className={class1}>Agenda individual para cada professor no App</p>
                    <button className={class1}>Ver mais</button>
                </div>
                <div className='content-3'>
                    <div className={class3}>
                        <p>Menos envio de PDF's e impressões</p>
                        <p>Atualização em tempo real! Os professores recebem as atualizações automaticamente no App!</p>
                    </div>
                    <img alt='imagem' src={picture3} className={class2}></img>
                </div>
                <div className='content-4'>
                    <p className={class4}>Grade de aulas, atividades extracurriculares e mensagens instantâneas direto no App.</p>
                </div>

                <div className='content-5'>
                    <p className={class5}>Podemos te ajudar!</p>
                    <button className={class5} type='button' onClick={handleRegister}>Criar meu cadastro</button>
                </div>
            </div>
            <div className='footer'>
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
        </div>
    )
}