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

    async function loadIncidents(){
        const totalProfessor = await api.get('professor/count', { headers: { Authorization: escola_id }})
        setTotalProfessores(totalProfessor.data["count(*)"])

        const totalDisciplina = await api.get('disciplinas/count', { headers: { Authorization: escola_id}})
        setTotalDisciplinas(totalDisciplina.data["count(*)"])

        const totalTurma = await api.get('turmas/count', { headers : { Authorization: escola_id }})
        setTotalTurmas(totalTurma.data["count(*)"])

        const totalNivel = await api.get('niveis/count', { headers: { Authorization: escola_id }})
        //console.log({totalNivel})
        setTotalNiveis(totalNivel.data["count(*)"])

    }

    useEffect(() => {
      loadIncidents()  
    })

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