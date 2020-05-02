import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import api from '../../../services/api'
import './style.css'


export default function ProfessorRegister(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dia1, setDia1] = useState(false)
    const [dia2, setDia2] = useState(false)
    const [dia3, setDia3] = useState(false)
    const [dia4, setDia4] = useState(false)
    const [dia5, setDia5] = useState(false)
    const [senha, setSenha] = useState('');
    

    const history = useHistory();
    const array = [dia1, dia2, dia3, dia4, dia5];
    const dias = [];
    const escola_id = localStorage.getItem('escola_id');

    async function handleRegister(e){
        e.preventDefault();
        
        let idx = array.indexOf(true);
        
        
        while(idx !== -1) {
            dias.push(idx + 1)
            idx = array.indexOf(true, idx + 1)
        }
        
        const data = {
            nome,
            email, 
            especialidade,
            telefone,
            senha,
            dias
        }
        

        try {
            if (nome === '' || email === '' || especialidade === '' || telefone === '' || senha === '') {
                alert('Favor Preencher todos os dados');
            }else{
                
            const response = await api.post('professor', data, {
                headers:{
                    authorization: escola_id
                }
            })

            alert(`Cadastro realizado com sucesso, ${response.data.nome}`)
            history.push('/professor');
            }


        } catch (error) {
            alert('Não foi possível concluir cadastro!');
        }
    }

    function handleBack(){
        history.push('/professor');
    }



    return(
        <div className='container-new-professor'>
            <Menu />
            <div className='component-new-professor'>
                    <div>
                        <h1>Cadastro de Professores</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome' 
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
                        placeholder='Especialidade'
                        value={especialidade}
                        onChange={e => setEspecialidade(e.target.value)}
                    />
                    <input 
                        placeholder='Telefone' 
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />

                    <input 
                        placeholder='Senha' 
                        type='password'
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <span>Dias que vai trabalhar:</span>
                    <div className='buttonGroup'>
                        <label>Segunda<input type='checkbox' value={dia1} onChange={e => setDia1(e.target.checked)} /></label>
                        <label>Terça<input type='checkbox' value={dia2} onChange={e => setDia2(e.target.checked) } /></label>
                        <label>Quarta<input type='checkbox' value={dia3} onChange={e => setDia3(e.target.checked)} /></label>
                        <label>Quinta<input type='checkbox' value={dia4} onChange={e => setDia4(e.target.checked)} /></label>
                        <label>Sexta<input type='checkbox' value={dia5} onChange={e => setDia5(e.target.checked)} /></label>
                    </div>
                    
                    
                    <button type='submit'>cadastrar</button>
                </form>
                </div>
        </div>
    )
}