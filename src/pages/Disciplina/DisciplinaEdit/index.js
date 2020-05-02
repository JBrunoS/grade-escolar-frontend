import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import {  useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import api from '../../../services/api'
import './style.css'


export default function EditDisciplina(){
    const [disciplina, setDisciplina] = useState('');
    const [carga_horaria, setCargahoraria] = useState('');
    const [professor_id, setProfessor] = useState('');
    const [nivel_id, setNivel] = useState('');

    const [professores, setProfessores] = useState([]);
    
    const history = useHistory();

    const escola_id = localStorage.getItem('escola_id');
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        api.get(`details/disciplina/${userID}`, {
            headers: {
                Authorization : escola_id,
            }
        }).then(response => {
            setDisciplina(response.data.nome_disciplina)
            setCargahoraria(response.data.carga_horaria)
            setNivel(response.data.nome_nivel)
        })
    }, [userID, escola_id]);
    
    useEffect(() => {
        api.get('professor', {
            headers: {
                Authorization : escola_id,
            }
        }).then(response => {
            setProfessores(response.data);
        })
    }, [escola_id]);


    async function handleEdit(e){
        e.preventDefault();
        
        try{

        } catch (error) {
            alert('Não foi possível alterar informações!');
        }
    }


    function handleBack(){
        history.push('/disciplina');
    }


    return(
        <div className='container-new-disciplina'>
            <Menu />
            <div className='component-new-disciplina'>
                    <div>
                        <h1>Editar Disciplina</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleEdit}>
                    <input
                        placeholder='Nome' 
                        disabled
                        value={disciplina}
                        onChange={e => setDisciplina(e.target.value)}
                    />
                    <input 
                        placeholder='Carga horária' 
                        type='number'
                        value={carga_horaria}
                        onChange={e => setCargahoraria(e.target.value)}
                    />
                    <select    
                        value={professor_id}
                        onChange={e => setProfessor(e.target.value)}
                    >
                        <option value=''  >Professores</option>
                        {professores.map(incidents => (
                            <option key={incidents.id} value={incidents.id}>{incidents.nome}</option>
                        ))}
                    </select>
                    
                    <input 
                        placeholder='Nível' 
                        disabled
                        value={nivel_id}
                        onChange={e => setNivel(e.target.value)}
                    />
                    
                    
                    <button type='submit'>editar</button>
                </form>
            </div>
        </div>
    )
}