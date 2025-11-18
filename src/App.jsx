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

const Container = styled.div`
  font-family: Inter, system-ui, Arial, sans-serif;
  padding: 32px;
  max-width: 1100px;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  min-width: 240px;
`

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
`

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.div`
  font-weight: 600;
`

const Small = styled.div`
  font-size: 13px;
  color: #666;
`

const PaginationWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
`

const PageButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#222' : '#fff'};
  color: ${props => props.active ? '#fff' : '#222'};
  cursor: pointer;
`

function Pagination({ total, pageSize, currentPage, onChange }) {
  const pages = Math.ceil(total / pageSize)
  const arr = Array.from({ length: pages }, (_, i) => i + 1)
  if (pages === 0) return null
  return (
    <PaginationWrapper>
      {arr.map(p => (
        <PageButton
          key={p}
          active={p === currentPage}
          onClick={() => onChange(p)}
        >
          {p}
        </PageButton>
      ))}
    </PaginationWrapper>
  )
}

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('name_asc')
  const [page, setPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    let mounted = true
    async function fetchData() {
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
  }, [query, sort])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = data
    if (q) {
      list = list.filter(item => {
        return (
          (item.name || '').toLowerCase().includes(q) ||
          (item.type || '').toLowerCase().includes(q) ||
          (item.institution || '').toLowerCase().includes(q)
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
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  return (
    <Container>
      <Header>
        <Title>Kinvo desafio frontend</Title>
        <Controls>
          <Input
            placeholder="Pesquisar produtos"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="name_asc">Nome crescente</option>
            <option value="name_desc">Nome decrescente</option>
            <option value="yield_desc">Maior rentabilidade</option>
            <option value="yield_asc">Menor rentabilidade</option>
          </Select>
        </Controls>
      </Header>

      <main>
        <h2>Minhas Rendas Fixas</h2>
        {loading && <Small>Carregando dados...</Small>}
        {!loading && total === 0 && <Small>Nenhum produto encontrado</Small>}
        {!loading && paged.map(item => (
          <Card key={item.id}>
            <Meta>
              <Name>{item.name}</Name>
              <Small>{item.institution} • {item.type}</Small>
            </Meta>
            <div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>{item.yield || '—'}%</div>
                <Small>Vencimento {item.maturityDate || '—'}</Small>
              </div>
            </div>
          </Card>
        ))}

        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={page}
          onChange={p => setPage(p)}
        />
      </main>

      <footer style={{ marginTop: 30 }}>
        <Small>Implementacao de exemplo para avaliacao</Small>
      </footer>
    </Container>
  )
}
