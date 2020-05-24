import React, {useState, useEffect} from 'react'

import Menu from '../Menu'
import  './style.css'
import api from '../../services/api'

export default function Profile(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [senha, setSenha] = useState('')

    const escola_id = localStorage.getItem('escola_id')

    useEffect(() => {
        api.get(`escola/${escola_id}`)
        .then(response => {
            
            setNome(response.data.nome)
            setEmail(response.data.email)
            setTelefone(response.data.telefone)
            setCnpj(response.data.cnpj)
            setEndereco(response.data.endereco)
            setCidade(response.data.cidade)
            setUf(response.data.uf)
            setSenha(response.data.senha)
        })
    }, [escola_id]);

    async function handleEdit(e){
        e.preventDefault();

        if (nome === '' || email === '' || telefone === '' || cnpj === '' || endereco === '' || cidade === '' || uf === '' || senha === '') {
            alert('Favor, todos os campos devem estar preenchidos.')
            return
        }
        
        const data = {nome, email, telefone, cnpj, endereco, cidade, uf, senha};
        try {
            await api.put(`escola/${escola_id}`, data)

            alert(`Dados alterados com sucesso`)
            window.location.reload();
            localStorage.setItem('escola_nome', nome)
            
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    async function handleResetGrade(e){
        e.preventDefault();
        
        try {
            await api.delete(`delete/grade/${escola_id}`) 
            
            alert('Grade resetada!');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return(
        <div className='container-profile'>
            <Menu />

            <div className='content-profile'>
                    <div className='info-profile1'>
                        <h2>Informações</h2>
                        <form onSubmit={handleEdit}>
                            <label>Nome Escola</label>
                            <input value={nome} onChange={e => setNome(e.target.value)} />
                            <label>Email</label>
                            <input value={email}  onChange={e => setEmail(e.target.value)}/>
                            <label>Telefone</label>
                            <input value={telefone} onChange={e => setTelefone(e.target.value)}/>
                            <label>CNPJ</label>
                            <input value={cnpj}  onChange={e => setCnpj(e.target.value)}/>
                            <label>Endereço</label>
                            <input value={endereco} onChange={e => setEndereco(e.target.value)}/>
                            <div>
                                <div>
                                    <label>Cidade</label>
                                    <input value={cidade} onChange={e => setCidade(e.target.value)}/>
                                </div>
                                <div>
                                    <label>UF</label>
                                    <input value={uf} onChange={e => setUf(e.target.value)}/>
                                </div>
                                
                            </div>
                            <label>Senha</label>
                            <input value={senha} onChange={e => setSenha(e.target.value)}/>
                            <button>Editar</button>
                        </form>
                    </div>

                    

                    <div className='info-profile2'>
                        <div className='payment'>
                        <h2>Pagamento</h2>
                            <form>
                                <input />
                                <input />
                                <input />
                                <button>Editar</button>
                            </form>
                        </div>

                        <div className='info-acount'>
                            <h2>Conta</h2>
                            <button className='button-grade' onClick={handleResetGrade}>Resetar Grade</button>
                            <button className='button-conta'>Resetar Conta</button>
                            <button className='button-delete'>Apagar Conta</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}