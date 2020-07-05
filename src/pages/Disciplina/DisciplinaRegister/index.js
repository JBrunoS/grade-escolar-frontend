import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import {  useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import api from '../../../services/api'
import './style.css'


export default function DisciplinaRegister(){
    const [nome_disciplina, setNome] = useState('');
    const [carga_horaria, setCargahoraria] = useState('');
    // const [professor_id, setProfessor] = useState('');
    // const [nivel_id, setNivel] = useState('');
    const [niveis, setNiveis] = useState([]);
    const [professores, setProfessores] = useState([]);
    
    const history = useHistory();
    const escola_id = localStorage.getItem('escola_id');

    useEffect(() => {
        api.get('professor', {
            headers: {
                Authorization : escola_id,
            }
        }).then(response => {
            setProfessores(response.data);
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
            nome_disciplina,
            carga_horaria, 
        }

        try {
            if (nome_disciplina === '' || carga_horaria === '') {
                alert('Todos os campos são necessários');
            }else{
                
            const response = await api.post('disciplinas', data, {
                headers:{
                    authorization: escola_id
                }
            })

            alert(`Cadastro realizado com sucesso ${response.data.nome_disciplina}`)
            history.push('/disciplina');
            }


        } catch (error) {
            alert(error.response.data.error);
            
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
                        <h1>Cadastro de Disciplina</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome' 
                        value={nome_disciplina}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder='Carga horária Semanal' 
                        type='number' 
                        value={carga_horaria}
                        onChange={e => setCargahoraria(e.target.value)}
                    />
                    {/* <select    
                        value={professor_id}
                        onChange={e => setProfessor(e.target.value)}
                    >
                        <option value='' disabled>Professores</option>
                        {professores.map(incidents => (
                            <option key={incidents.id} value={incidents.id}>{incidents.nome}</option>
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
                        
                    </select> */}
                    
                    <button type='submit'>cadastrar</button>
                </form>
                </div>
        </div>
    )
}