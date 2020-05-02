import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FaPaperPlane } from 'react-icons/fa';

import api from '../../services/api'
import './style.css'


export default function ForgotPassword(){
    const history = useHistory();
    const [email, setEmail] = useState('');
    

    async function handleSubmit(e){
        e.preventDefault();
        
        try {
            const response = await api.post('recupera', {email})
            
            alert(`Mensagem enviada para o email ${response.data.email}`);
            
            history.push('/');

        } catch (error) {
            alert('E-mail não cadastrado no sistema');
        }
        
    }
    return(
        <div className='container-password'>
            <div className='component-password'>
                <h1>Recuperar senha</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='email' 
                        placeholder='E-mail'  
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button type='submit'>Recuperar <FaPaperPlane size={18} color='#FFF' /></button>
                </form>
                <div>
                    <Link to='/' >Voltar</Link>
         </div>
                
            </div>
        </div>
    )
}