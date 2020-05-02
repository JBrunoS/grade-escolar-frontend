import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import {  useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import api from '../../../services/api'
import './style.css'


export default function TurmaRegister(){
    const [nome_turma, setNome] = useState('');
    const [nivel_id, setNivel] = useState('');
    const [turno_id, setTurno] = useState('');
    
    const [niveis, setNiveis] = useState([]);
    const [turnos, setTurnos] = useState([]);
    
    const history = useHistory();
    const escola_id = localStorage.getItem('escola_id');

    useEffect(() => {
        api.get('turnos', {
            headers: {
                Authorization : escola_id,
            }
        }).then(response => {
            setTurnos(response.data);
        })
    }, [escola_id]);

    useEffect(() => {
        api.get('niveis', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setNiveis(response.data);
        })
    }, [escola_id]);


    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            nome_turma,
            nivel_id, 
            turno_id,
        }

        try {
            if (nome_turma === '' || nivel_id === '' || turno_id === '' ) {
                alert('Todos os campos são necessários');
            }else{
                
            const response = await api.post('turmas', data, {
                headers:{
                    authorization: escola_id
                }
            })

            alert(`Cadastro realizado com sucesso ${response.data.nome_disciplina}`)
            history.push('/turma');
            }


        } catch (error) {
            alert('Não foi possível concluir cadastro!');
        }
    }

    function handleBack(){
        history.push('/turma');
    }


    return(
        <div className='container-new-turma'>
            <Menu />
            <div className='component-new-turma'>
                    <div>
                        <h1>Cadastro de Nova Turma</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome' 
                        value={nome_turma}
                        onChange={e => setNome(e.target.value)}
                    />
                    <select    
                        value={turno_id}
                        onChange={e => setTurno(e.target.value)}
                    >
                        <option value=''>Turnos</option>
                        {turnos.map(incidents => (
                            <option key={incidents.id} value={incidents.id}>{incidents.turno}</option>
                        ))}
                    </select>
                    
                    <select    
                        value={nivel_id}
                        onChange={e => setNivel(e.target.value)}
                    >
                        <option value='' disabled>Níveis</option>
                        {niveis.map(incidents => (
                            <option key={incidents.id} value={incidents.id}>{incidents.nome_nivel}</option>
                        ))}
                        
                    </select>
                    
                    <button type='submit'>cadastrar</button>
                </form>
                </div>
        </div>
    )
}