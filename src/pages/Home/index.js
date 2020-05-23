import React, { useEffect, useState, createRef } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import Menu from '../Menu'
import './style.css'
import api from '../../services/api';


export default function Home(){
    
    const escola_id = localStorage.getItem('escola_id')
    const escola_nome = localStorage.getItem('escola_nome')

    const [totalProfessores, setTotalProfessores] = useState([]);
    const [totalDisciplinas, setTotalDisciplinas] = useState([]);
    const [totalTurmas, setTotalTurmas] = useState([]);
    const [totalNiveis, setTotalNiveis] = useState([]);

    const [professor, setProfessor] = useState(false)
    const [aluno, setAluno] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const file = createRef();


    useEffect(() => {
        api.get('professor/count', { 
            headers: { 
                Authorization: escola_id 
            }
        }).then(response => {
            console.log({response})
            setTotalProfessores(response.data.count);
        })
        
        api.get('disciplinas/count', { 
            headers: { 
                Authorization: escola_id
            }
        }).then(response => {
            setTotalDisciplinas(response.data.count)
        })

        api.get('turmas/count', { 
            headers : { 
                Authorization: escola_id 
            }
        }).then( response => {
            setTotalTurmas(response.data.count)
        })

        api.get('niveis/count', { 
            headers: { 
                Authorization: escola_id 
            }
        }).then(response => {
            setTotalNiveis(response.data.count)
        })
    }, [escola_id])

    function handleMessage(){
        alert(`${professor}, ${aluno}, ${mensagem}, ${file.current.files[0].name}`)
    }

    return(
        <div className='container-home'>
            <Menu />
            <div className='content-home'>
                <h1>{escola_nome}</h1>
                <div>
                    <div>
                        <p>Professores</p>
                        <span>{totalProfessores}</span>
                    </div>
                    <div >
                    <p>Turmas</p>
                    <span> {totalTurmas} </span>
                    </div>
                
                    <div >
                    <p>Disciplinas</p>
                    <span>{totalDisciplinas}</span>
                    </div>
                    <div >
                    <p>Níveis</p>
                    <span>{totalNiveis}</span>
                    </div>
                </div>

                <div className='content-message'>
                    <p>Enviar Mensagem</p>
                    <div>
                        <input type='checkbox' value={professor} onChange={e => setProfessor(e.target.checked)} />
                        <label>Professores</label>
                        <input type='checkbox' value={aluno} onChange={e => setAluno(e.target.checked)} />
                        <label>Alunos</label>

                    </div>
                    
                    <textarea rows={4} maxLength={400} placeholder='Mensagem...' value={mensagem} onChange={ e=> setMensagem(e.target.value)} />
                    <div className='content-buttons'>
                        <input type='file' ref={file}/>
                        <button onClick={handleMessage}>enviar</button>
                    </div>
                    
                </div>
            </div>
            <div class="copyright">
                <span>Copyright &copy; AjudaNagrade 2020</span>
            </div>

            <div className='button-suporte'>
                <a><FaWhatsapp size={45} color='#FFF' /><p>Suporte</p></a>
            </div>
        </div>
    )
}