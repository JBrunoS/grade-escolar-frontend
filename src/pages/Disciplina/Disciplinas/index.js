import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Menu from '../../Menu'
import './style.css'

import api from '../../../services/api'


export default function Disciplina(){
    
    const [nivel, setNivel] = useState('')
    const [turno, setTurno] = useState('')
    const [turma, setTurma] = useState('')

    const [niveis, setNiveis] = useState([])
    const [turnos, setTurnos] = useState([])
    const [turmas, setTurmas] = useState([])

    const [incidents, setIncidents] = useState([]);
    
    const escola_id = localStorage.getItem('escola_id')


    useEffect(() => {
        api.get('niveis', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setNiveis(response.data);
        })
    }, [escola_id]);
    
    useEffect(() => {
        api.get('turnos', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setTurnos(response.data);
        })
    }, [escola_id]);

    useEffect(() => {
        api.get('turmas', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setTurmas(response.data);
        })
    }, [escola_id]);


    async function handleDelete(id){
        
        try {
            await api.delete(`disciplinas/${id}`, {
                headers: {
                    Authorization: escola_id,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert(error.response.data.error);
        }
    }

    async function handleSearchByDisciplina(){
        try {
            api.get('disciplinas', {
                headers: {
                    Authorization: escola_id,
                }
            }).then(response => {
                setIncidents(response.data);
            })
        } catch (error) {
            
        }
    }

    async function handleSearchByNivel(){
        if (nivel === '') {
            return
        }

        try {
            const response = await api.get(`disciplinas/nivel/${nivel}`, {
                headers: {
                    Authorization: escola_id
                }
            })

            setIncidents(response.data)
        } catch (error) {
            
        }
    }

    async function handleSearchByTurno(){
        if (turno === '') {
            return
        }

        try {
            const response = await api.get(`turnos/disciplinas/${turno}`, {
                headers: {
                    Authorization: escola_id
                }
            })

            setIncidents(response.data)
        } catch (error) {
            
        }
    }

    async function handleSearchByTurma(){
        if (turma === '') {
            return
        }

        try {
            const response = await api.get(`disciplinas/turma/${turma}`, {
                headers: {
                    Authorization: escola_id
                }
            })

            setIncidents(response.data)
        } catch (error) {
            
        }
    }


    return(
        <div className='container-disciplina'>
            <Menu />
            <div className='component-disciplina'>
                <div className='header-disciplina' >
                    <h1>disciplinas</h1>
                    <Link to='/new/disciplina' className='button'><FaPlus size={18} color='#FFFFFF' /> Adicionar</Link>
                </div>

                <form className='button-group-disciplina' >
                    <button type='button' onClick={handleSearchByDisciplina}>Ver todas</button>
                    <div>
                        <select
                            value={nivel}
                            onChange={e => setNivel(e.target.value)}
                        >
                            <option disabled value=''>Nível</option>
                            {niveis.map( incidents => (
                                <option key={incidents.id} value={incidents.id}>{incidents.nome_nivel}</option>
                            ))}
                        </select>
                        <button type='button' onClick={handleSearchByNivel}> <FaSearch size={18} color='#FFF' /></button>
                    </div>
                    
                    <div>
                        <select
                            value={turno}
                            onChange={e => setTurno(e.target.value)}
                        >
                            <option  value='' disabled>Turno</option>
                            {turnos.map(incidents => (
                                <option key={incidents.id} value={incidents.id}> {incidents.turno} </option>
                            ))}
                        </select>
                        <button type='button' onClick={handleSearchByTurno}> <FaSearch size={18} color='#FFF' /></button>
                    </div>
                    
                    <div>
                        <select
                            value={turma}
                            onChange={e => setTurma(e.target.value)}
                        >
                            <option disabled value=''>Turma</option>
                            {turmas.map(incidents => (
                                <option key={incidents.id} value={incidents.id} > {incidents.nome_turma} </option>
                            ))}
                        </select>
                        <button type='button' onClick={handleSearchByTurma}> <FaSearch size={18} color='#FFF' /></button>
                    </div>
                    

                    
                </form>
                <section>

                {incidents.map( disciplina => (

                    <div className='body-disciplina' key={disciplina.id}>
                        <div>
                            <p>Disciplina: <span> { disciplina.nome_disciplina } </span> </p>
                            <p>Carga horária: <span> {disciplina.carga_horaria} </span> </p>
                        </div>
                        <div>
                            <p>Professor: <span> {disciplina.nome} </span></p>
                            <p>Código: <span> {disciplina.id} </span> </p>
                        </div>
                        <Link to='/edit/disciplina' ><FaEdit size={25} color='#FCA14D' onClick={() => localStorage.setItem('userID', disciplina.id)} /></Link>
                        <Link to ><FaTrashAlt size={25} color='#FB1616' onClick={() => handleDelete(disciplina.id)} /></Link>
                </div>
                ))}
                
                </section>
                
            </div>
            
        </div>
    )
}