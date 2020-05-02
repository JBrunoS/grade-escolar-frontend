import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import './style.css'

import api from '../../../services/api'


export default function NiveisRegister(){
    const [nome_nivel, setNome] = useState('');
    const history = useHistory();
    const escola_id = localStorage.getItem('escola_id');

    async function handleRegister(e){
        e.preventDefault();
        
        

        try {
            if (nome_nivel === '') {
                alert('Favor Preencher o campo');
            }else{
                
            await api.post('niveis', {nome_nivel}, {
                headers:{
                    authorization: escola_id
                }
            })

            alert(`Cadastro realizado com sucesso`)
            history.push('/nivel');
            }


        } catch (error) {
            alert('Não foi possível concluir cadastro!');
        }
    }

    function handleBack(){
        history.push('/nivel');
    }


    return(
        <div className='container-new-nivel'>
            <Menu />
            <div className='component-new-nivel'>
                    <div>
                        <h1>Cadastro de Nivel</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome' 
                        value={nome_nivel}
                        onChange={e => setNome(e.target.value)}
                    />
                    
                    
                    <button type='submit'>cadastrar</button>
                </form>
                </div>
        </div>
    )
}