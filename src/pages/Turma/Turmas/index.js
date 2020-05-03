import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link} from 'react-router-dom'
import Modal from 'react-modal'

import Menu from '../../Menu'
import './style.css'

import api from '../../../services/api'

Modal.setAppElement('#root')

export default function Turmas(){
    const [turma_id, setIdTurma] = useState('')
    const [nome_turma, setNomeTurma] = useState('')
    const [nivel_id, setNivelId] = useState('')
    const [turno_id, setTurnoId] = useState('')


    const [turnos, setTurnos] = useState([])
    const [niveis, setNiveis] = useState([])

    const [incidents, setIncidents] = useState([]);

    const escola_id = localStorage.getItem('escola_id')

    const [modalEditOpen,setEditIsOpen] = useState(false);

    const professorStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width                 : '50%',
          height                : '65%',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

      function openEditModal(id, nome, nivel_id, turno_id){
          setIdTurma(id)
          setNomeTurma(nome)
          setNivelId(nivel_id)
          setTurnoId(turno_id)

          
        setEditIsOpen(true)
    }
  
    function closeEditModal(){
        setEditIsOpen(false)
    }

    async function searchTurmaByNivel(){
        if (nivel_id === '') {
            return
        }

        try {
            api.get(`turmas/nivel/${nivel_id}`, {
                headers: {
                    Authorization: escola_id
                }
            }).then(response =>{
                setIncidents(response.data)
            })
        } catch (error) {
            alert(error.response.data.error)
        }
        
        
    }
    async function searchTurmaByNivelTurno(){
        if (turno_id === '' || nivel_id === '') {
            alert("Por favor, selecionar os campos ao lado")   
            return
        }
        try {
            api.get(`turmas/${nivel_id}/${turno_id}`, {
                headers: {
                    Authorization: escola_id
                }
            }).then(response =>{
                setIncidents(response.data)
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    async function searchTurmaByTurno(){
        if (turno_id === '') {
            return
        }
        try {
            api.get(`turmas/turno/${turno_id}`, {
                headers: {
                    Authorization: escola_id
                }
            }).then(response =>{
                setIncidents(response.data)
            })
        } catch (error) {
            alert(error.response.data.error)
        }
        
    }

    async function searchAll(){
        try {
            api.get('turmas', {
                headers: {
                    Authorization: escola_id,
                }
            }).then(response => {
                setIncidents(response.data);
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
    
    async function handleTurmaEdit(){
        const data = {nome_turma, nivel_id, turno_id};

        try {
            api.put(`turmas/edit/${turma_id}`, data, {
                headers: {
                    Authorization: escola_id
                }
            })

            closeEditModal();
            setIncidents(incidents.filter(incident => incident.id === !NaN))
            
        } catch (error) {
            
        }
    }


    async function handleDelete(id){
        try {
            await api.delete(`turmas/${id}`, {
                headers: {
                    Authorization: escola_id,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert(error.response.data.error)
        }
    }


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

    return(
        <div className='container-turma'>
            <Menu />
            <Modal
            isOpen={modalEditOpen}
            onRequestClose={closeEditModal}
            style={professorStyles}
            contentLabel="Professores"
            >
    
                <form className='form-modal-turma-edit'>
                    <h2>Editar Informações da turma</h2>
                    <input value={nome_turma} onChange={e => setNomeTurma(e.target.value)} />
                    <select
                        value={nivel_id}
                        onChange={e => setNivelId(e.target.value)}
                    >
                        <option value=''>Nível</option>
                            {niveis.map( incidents => (
                                <option key={incidents.id} value={incidents.id}>{incidents.nome_nivel}</option>
                            ))}
                    </select>
                    
                    <select
                        value={turno_id}
                        onChange={e => setTurnoId(e.target.value)}
                    >
                        <option value=''>Turno</option>
                        {turnos.map(incidents => (
                                <option key={incidents.id} value={incidents.id}> {incidents.turno} </option>
                        ))}
                    </select>
                    <button type='button' onClick={() => handleTurmaEdit()}>Editar</button>
                </form>
            </Modal>
            <div className='component-turma'>
                <div className='header-turma' >
                    <h1>turmas</h1>
                    <Link to='/new/turma' className='button'><FaPlus size={18} color='#FFFFFF' /> Adicionar</Link>
                </div>

                <div className='button-group-turma' >
                    <button type='button' onClick={searchAll}>Ver todos</button>
                    <div>
                        <select 
                            value={nivel_id}
                            onChange={e => setNivelId(e.target.value)}
                        >
                            <option value=''>Nível</option>
                            {niveis.map( incidents => (
                                <option key={incidents.id} value={incidents.id}>{incidents.nome_nivel}</option>
                            ))}
                        </select>
                        <button type='button' onClick={searchTurmaByNivel}> <FaSearch size={18} color='#FFF' /></button>
                    </div>
                    
                    <div>
                        <select
                            value={turno_id}
                            onChange={e => setTurnoId(e.target.value)}
                        >
                            <option value=''>Turno</option>
                            {turnos.map(incidents => (
                                <option key={incidents.id} value={incidents.id}> {incidents.turno} </option>
                            ))}
                        </select>
                        <button type='button' onClick={searchTurmaByTurno}> <FaSearch size={18} color='#FFF' /></button>
                    </div>
                    <button type="button" onClick={searchTurmaByNivelTurno} >Nivel / turno</button>
                </div>
                <section>

                { incidents.map(incidents => (
                    <div className='body-turma' key={incidents.id}>
                        <p>turma: <span> {incidents.nome_turma} </span> </p>
                        <p>Nível: <span> {incidents.nome_nivel} </span></p>
                        <p>Turno: <span> {incidents.turno} </span></p>
                        <p>Código da turma: <span> {incidents.id} </span></p>

                        <div>
                        <Link onClick={() => openEditModal(incidents.id, incidents.nome_turma, incidents.nivel_id, incidents.turno_id)}><FaEdit size={25} color='#FCA14D' /></Link>
                        <Link onClick={() => handleDelete(incidents.id)}><FaTrashAlt size={25} color='#FB1616' /></Link>
                        </div>
                        
                </div>
                ))}
                
                
                
                </section>
                
            </div>
            
        </div>
    )
}