import React, { useState } from 'react'
import {useHistory, Link} from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api'
import './style.css'

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email, 
            telefone,
            cnpj,
            endereco,
            cidade,
            uf,
            senha
        }

        try {
            if (nome === '' || email === '' || telefone === '' || cnpj === '' || endereco === '' || cidade === '' || uf === '' || senha === '') {
                alert('Favor Preencher todos os dados');
            }else{
                
            await api.post('new/escola', data)

            alert(`Cadastro realizado com sucesso`)
            history.push('/login');
            }


        } catch (error) {
            alert(error.response.data.error);
        }
    }
    return(
        <div className='container-register'>
            <div className='component-register'>
                <h1>Cadastro</h1>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome instituição' 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder='E-mail' 
                        type='email' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder='Telefone'
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                    <input 
                        placeholder='CNPJ' 
                        value={cnpj}
                        onChange={e => setCnpj(e.target.value)}
                    />
                    <input 
                        placeholder='Endereço' 
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)}
                    />
                    <div>
                        <input 
                            placeholder='Cidade' 
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input 
                            placeholder='UF' 
                            value={uf}
                            onChange={e => setUF(e.target.value)} 
                        />
                    </div>

                    <input 
                        placeholder='Senha' 
                        type='password'
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button type='submit'>cadastrar</button>
                </form>
                <Link to='/login'>
                    <FaArrowLeft size={16} color='#FFF' />
                    Já tenho cadastro
                </Link>
            </div>
        </div>
    )
}