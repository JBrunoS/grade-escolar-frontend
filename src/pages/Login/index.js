import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';

import api from '../../services/api'
import './style.css'


export default function Login(){
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const data = {email, senha}

        try {

            const response = await api.post('escola', data)

            localStorage.setItem('escola_id', response.data.id);
            localStorage.setItem('escola_nome',  response.data.nome);

            alert(`Seja bem vindo ${response.data.nome}`)
            
            
            history.push('/home');

        } catch (error) {
            alert('E-mail or password invalid!');
        }
        
    }
    return(
        <div className='container-login'>
            <div className='component-login'>
                
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='email' 
                        placeholder='E-mail'  
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button type='submit'>Entrar <FaSignInAlt size={18} color='#FFF' /></button>
                </form>
                <div>
                    <Link to='/register'>Registrar-se</Link>
                    <p>|</p>
                    <Link to='/forgot' >Esqueci minha senha</Link>
         </div>
                
            </div>
        </div>
    )
}