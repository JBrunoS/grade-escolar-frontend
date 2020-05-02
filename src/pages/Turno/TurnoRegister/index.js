import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import './style.css'

import api from '../../../services/api'


export default function TurnoRegister(){
    const [turno, setTurno] = useState('');
    const history = useHistory();
    const escola_id = localStorage.getItem('escola_id');

    async function handleRegister(e){
        e.preventDefault();
        
        

        try {
            if (turno === '') {
                alert('Favor Escolher algum turno');
            }else{
                
            await api.post('turnos', {turno}, {
                headers:{
                    authorization: escola_id
                }
            })

            alert(`Cadastro realizado com sucesso`)
            history.push('/turno');
            }


        } catch (error) {
            alert('Não foi possível concluir cadastro!');
        }
    }

    function handleBack(){
        history.push('/turno');
    }


    return(
        <div className='container-new-turno'>
            <Menu />
            <div className='component-new-turno'>
                    <div>
                        <h1>Cadastro de Turno</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleRegister}>
                    <h3>Selecione o turno</h3>

                    <select
                        value={turno}
                        onChange={e => setTurno(e.target.value)}
                    >
                        <option value=''></option>
                        <option value='manha'>Manhã</option>
                        <option value='tarde'>Tarde</option>
                        <option value='noite'>Noite</option>

                    </select>
                    
                    
                    <button type='submit'>cadastrar</button>
                </form>
                </div>
        </div>
    )
}