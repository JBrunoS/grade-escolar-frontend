import React, { useEffect, useState } from 'react'

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


    useEffect(() => {
        api.get('professor/count', { 
            headers: { 
                Authorization: escola_id 
            }
        }).then(response => {
            console.log({response})
            setTotalProfessores(response.data["count(*)"]);
        })

        api.get('disciplinas/count', { 
            headers: { 
                Authorization: escola_id
            }
        }).then(response => {
            setTotalDisciplinas(response.data["count(*)"])
        })

        api.get('turmas/count', { 
            headers : { 
                Authorization: escola_id 
            }
        }).then( response => {
            setTotalTurmas(response.data["count(*)"])
        })

        api.get('niveis/count', { 
            headers: { 
                Authorization: escola_id 
            }
        }).then(response => {
            setTotalNiveis(response.data["count(*)"])
        })
    }, [escola_id])

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
            </div>
            <div class="copyright">
            <span>Copyright &copy; AjudaNagrade 2020</span>
          </div>
        </div>
    )
}