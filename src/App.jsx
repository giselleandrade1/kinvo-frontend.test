/*
README

Projeto de exemplo para o desafio Kinvo Frontend Web
Implementa os requisitos do nivel Pleno

Principais caracteristicas
- React com componentes funcionais
- Styled Components para estilos
- Busca por texto na secao Minhas Rendas Fixas
- Ordenacao via seletor
- Paginacao com 5 itens por pagina
- Consumo da API real: https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData

Como rodar localmente
1. crie um novo projeto react, por exemplo com Create React App ou Vite
   exemplo com Create React App
   npx create-react-app kinvo-challenge

2. acesse a pasta do projeto
   cd kinvo-challenge

3. instale styled components
   npm install styled-components

4. substitua o conteudo de src/App.jsx pelo codigo abaixo

5. rode a aplicacao
   npm start

Observacoes
- os graficos nao foram implementados pois sao opcionais
- o codigo esta organizado em um unico arquivo para facilitar a avaliacao
*/

import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import AppHeader from './components/Header'
import Controls from './components/Controls'
import ProductCard from './components/ProductCard'
import Pagination from './components/Pagination'
import { fetchFixedIncomeData } from './services/api'

const Container = styled.div`
  font-family: Inter, system-ui, Arial, sans-serif;
  padding: 32px;
  max-width: 1100px;
  margin: 0 auto;
`

const Small = styled.div`
  font-size:13px;color:#666;
`

export default function App(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('name_asc')
  const [page, setPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    let mounted = true
    async function load(){
      setLoading(true)
      try{
        const json = await fetchFixedIncomeData()
        if (mounted) setData(json)
      }catch(err){
        console.error('Erro ao buscar dados', err)
        if (mounted) setData([])
      }finally{
        if (mounted) setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  }, [])

  useEffect(()=>{ setPage(1) }, [query, sort])

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    let list = data.slice()
    if (q){
      list = list.filter(item => {
        return (
          (item.name||'').toLowerCase().includes(q) ||
          (item.type||'').toLowerCase().includes(q) ||
          (item.institution||'').toLowerCase().includes(q)
        )
      })
    }
    switch(sort){
      case 'name_asc': list.sort((a,b)=> (a.name||'').localeCompare(b.name||'')); break
      case 'name_desc': list.sort((a,b)=> (b.name||'').localeCompare(a.name||'')); break
      case 'yield_desc': list.sort((a,b)=> (Number(b.yield)||0) - (Number(a.yield)||0)); break
      case 'yield_asc': list.sort((a,b)=> (Number(a.yield)||0) - (Number(b.yield)||0)); break
      default: break
    }
    return list
  }, [data, query, sort])

  const total = filtered.length
  const paged = useMemo(()=>{
    const start = (page-1)*pageSize
    return filtered.slice(start, start+pageSize)
  }, [filtered, page])

  return (
    <Container>
      <AppHeader />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <Controls query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />
      </div>

      <main>
        <h2>Minhas Rendas Fixas</h2>
        {loading && <Small>Carregando dados...</Small>}
        {!loading && total === 0 && <Small>Nenhum produto encontrado</Small>}
        {!loading && paged.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}

        <Pagination total={total} pageSize={pageSize} currentPage={page} onChange={p=>setPage(p)} />
      </main>

      <footer style={{ marginTop: 30 }}>
        <Small>Implementacao de exemplo para avaliacao</Small>
      </footer>
    </Container>
  )
}
