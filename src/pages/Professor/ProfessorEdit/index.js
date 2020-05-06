import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import Menu from '../../Menu'
import api from '../../../services/api'
import './style.css'


export default function EditProfessor(){
    
    const [nome, setNome] = useState('Bruno');
    const [email, setEmail] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ativo, setAtivo] = useState(true);
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
    const userID = localStorage.getItem('userID')

    useEffect(() => {
        api.get(`details/professor/${userID}`, {
            headers: {
                Authorization : escola_id,
            }
        }).then(response => {

            setNome(response.data[0].nome)
            setEmail(response.data[0].email)
            setEspecialidade(response.data[0].especialidade)
            setTelefone(response.data[0].telefone)
            setSenha(response.data[0].senha)

            for (let i = 0; i < response.data.length; i++) {
                if(response.data[i].dia === 1){
                    setDia1(true)
                }
                if(response.data[i].dia === 2){
                    setDia2(true)
                }
                if(response.data[i].dia === 3){
                    setDia3(true)
                }
                if(response.data[i].dia === 4){
                    setDia4(true)
                }
                if(response.data[i].dia === 5){
                    setDia5(true)
                }
            }

        })
    }, [userID, escola_id]);


    async function handleEdit(e){
        e.preventDefault();
        

        try {
            if (nome === '' || email === '' || especialidade === '' || telefone === '' || senha === '' || idx === -1) {
                alert('Favor Preencher todos os dados');
            }else{

            let idx = array.indexOf(true);

            if(idx === -1){
                return alert("Favor, selecionar algum dia.")
            }
        
            while(idx !== -1) {
                dias.push(idx + 1)
                idx = array.indexOf(true, idx + 1)
            }
            
            const data = {
                nome,
                email, 
                especialidade,
                telefone,
                ativo,
                senha,
                dias
            }
                
            const response = await api.put(`professor/${userID}`, data, {
                headers:{
                    authorization: escola_id
                }
            })

            alert(`Dados alterados com sucesso, ${response.data.nome}`)
            history.push('/professor');
            }


        } catch (error) {
            alert('Não foi possível editar cadastro!');
        }
    }

    function handleBack(){
        
        history.push('/professor')
    }

  


    return(
        <div className='container-edit-professor'>
            <Menu />
            <div className='component-edit-professor'>
                    <div>
                        <h1>Editar Professor</h1>
                        <button type='button' onClick={handleBack}><FaArrowLeft size={18} color='#FFFFFF' /> Cancelar</button>
                    </div>
                   
                <form onSubmit={handleEdit}>
                    <input 
                        placeholder='Nome' 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder='E-mail'
                        disabled
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
                    <select
                        value={ativo}
                        onChange={e => setAtivo(e.target.value)}
                    >
                        <option value='1'>Está ativo</option>
                        <option value='0'>Não está ativo</option>
                    </select>

                    <input 
                        placeholder='Senha' 
                        type='password'
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <span>Disponibilidade</span>
                    <div className='buttonGroup'>
                        <label>Segunda<input type='checkbox'  checked={dia1} onChange={e => setDia1(e.target.checked)} /></label>
                        <label>Terça<input type='checkbox' checked={dia2} onChange={e => setDia2(e.target.checked) } /></label>
                        <label>Quarta<input type='checkbox' checked={dia3} onChange={e => setDia3(e.target.checked)} /></label>
                        <label>Quinta<input type='checkbox' checked={dia4} onChange={e => setDia4(e.target.checked)} /></label>
                        <label>Sexta<input type='checkbox' checked={dia5} onChange={e => setDia5(e.target.checked)} /></label>
                    </div>
                    
                    
                    <button type='submit'>Salvar alterações</button>
                </form>
                </div>
        </div>
    )
}