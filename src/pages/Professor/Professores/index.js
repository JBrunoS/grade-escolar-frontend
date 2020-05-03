import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import api from '../../../services/api'

import Menu from '../../Menu'
import './style.css'


export default function Professor(){
    const [nivel, setNivel] = useState('')
    const [turno, setTurno] = useState('')
    const [disciplina, setDisciplina] = useState('')

    const [incidents, setIncidents] = useState([]);
    const [niveis, setNiveis] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const escola_id = localStorage.getItem('escola_id');


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
        api.get('disciplinas/name', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setDisciplinas(response.data);
        })
    }, [escola_id]);

    async function handleDelete(id){
        
        try {
            await api.delete(`professor/${id}`, {
                headers: {
                    Authorization: escola_id,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    async function handleSearchByProfessor() {
        try {
            const response = await api.get('professor', {
                headers: {
                    Authorization : escola_id,
                }
            })
            setIncidents(response.data);
        } catch(error){
            alert(error.response.data.error)
        }
    }

    async function handleSearchByNivel(){
        if (nivel === '') {
            return
        }
        try {
            const response = await api.get(`niveis/${nivel}`, {
                headers: {
                    Authorization: escola_id
                }
            })

            setIncidents(response.data)

        } catch (error) {
            alert(error.response.data.error)
        }
    }

    async function handleSearchByTurno(){
        if (turno === '') {
            return
        }
        try {
            const response = await api.get(`turnos/${turno}`, {
                headers: {
                    Authorization: escola_id
                }
            })

            setIncidents(response.data)

        } catch (error) {
            alert(error.response.data.error)
        }
    }

    async function handleSearchByDisciplina(){
        if (disciplina === '') {
            return
        }
        try {
            const response = await api.get(`disciplinas/${disciplina}`, {
                headers: {
                    Authorization: escola_id
                }
            })

            setIncidents(response.data)

        } catch (error) {
            alert(error.response.data.error)
        }
       
    }

    return(
        <div className='container-professor'>
            <Menu />
            <div className='component-professor'>
                <div className='header-professor' >
                    <h1>professores</h1>
                    <Link to='/new/professor' className='button'><FaPlus size={18} color='#FFFFFF' /> Adicionar</Link>
                </div>

                <form className='button-group-professor'>
                    <button type='button' onClick={handleSearchByProfessor} >Ver todos</button>
                    <div>
                        <select
                            value={nivel}
                            onChange={e => setNivel(e.target.value)}
                        >
                            <option value='' >Filtrar por Nível</option>
                            {niveis.map(incidents => (
                                <option key={incidents.id} value={incidents.id}>{incidents.nome_nivel}</option>
                            ))}
                        </select>
                        <button type='button' onClick={handleSearchByNivel}><FaSearch size={18} color='#FFF' /></button>
                    </div>
                    <div>
                        <select
                            value={turno}
                            onChange={e => setTurno(e.target.value)}
                        >
                            <option value='' >Filtrar por Turno</option>
                            
                            {turnos.map(incidents =>(
                                <option key={incidents.id} value={incidents.id}>{incidents.turno}</option>
                            ))}
                        </select>
                        <button type='button' onClick={handleSearchByTurno}><FaSearch size={18} color='#FFF' /></button>
                    </div>
                    
                    <div>
                        <select
                            value={disciplina}
                            onChange={e => setDisciplina(e.target.value)}
                        >
                            <option value='' >Filtar por Disciplina</option>
                            {disciplinas.map(incidents => (
                                <option key={incidents.id} value={incidents.nome_disciplina}>{incidents.nome_disciplina}</option>
                            ))}
                            
                            
                        </select>
                        <button type='button' onClick={handleSearchByDisciplina} ><FaSearch size={18} color='#FFF' /></button>
                    </div>
                   
                </form>
                <section>

                {incidents.map(incidents => (

                    <div className='body-professor' key={incidents.id}>
                    <div>
                        <p>Nome: <span>{incidents.nome}</span></p>
                        <p>E-mail: <span>{incidents.email}</span></p>
                    </div>
                    <div>
                        <p>Espec.: <span>{incidents.especialidade}</span></p>
                        <p>Whats: <span>{incidents.telefone}</span> </p>
                    </div>
                    <div>
                        <Link to='/edit/professor' ><FaEdit size={25} color='#FCA14D' onClick={() => localStorage.setItem('userID', incidents.id)} /> </Link>
                        <Link ><FaTrashAlt size={25} color='#FB1616' onClick={() => handleDelete(incidents.id)} /></Link>
                    </div>
                        
                </div>
                ))}
                </section>
                
            </div>
            
        </div>
    )
}