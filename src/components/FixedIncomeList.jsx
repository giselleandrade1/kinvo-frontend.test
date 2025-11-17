import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const API_URL = 'https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData'

const Controls = styled.div`
  display:flex;gap:12px;align-items:center;margin:18px 0 12px;
`

const Card = styled.div`
  background:var(--card);padding:14px;border-radius:8px;box-shadow:0 1px 2px rgba(0,0,0,0.04);display:flex;justify-content:space-between;margin-bottom:10px;
`

const Field = styled.div`
  display:flex;flex-direction:column;
`

function Pagination({page, totalPages, onChange}){
  return (
    <div style={{display:'flex',gap:8,alignItems:'center',marginTop:12}}>
      <button onClick={() => onChange(Math.max(1, page-1))} disabled={page===1}>Anterior</button>
      <div>Página {page} / {totalPages}</div>
      <button onClick={() => onChange(Math.min(totalPages, page+1))} disabled={page===totalPages}>Próximo</button>
    </div>
  )
}

export default function FixedIncomeList(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('name-asc')
  const [page, setPage] = useState(1)
  const perPage = 5

  useEffect(() => {
    setLoading(true)
    fetch(API_URL)
      .then(r=>r.json())
      .then(data => setItems(data))
      .catch(()=>setItems([]))
      .finally(()=>setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const qlow = q.trim().toLowerCase()
    let list = items.filter(it => {
      if (!qlow) return true
      return (it.name || '').toLowerCase().includes(qlow) || (it.issuer || '').toLowerCase().includes(qlow)
    })

    const [key, dir] = sort.split('-')
    list.sort((a,b)=>{
      if (key === 'name'){
        return (a.name||'').localeCompare(b.name||'') * (dir==='asc'?1:-1)
      }
      if (key === 'maturity'){
        return (new Date(a.maturityDate||0) - new Date(b.maturityDate||0)) * (dir==='asc'?1:-1)
      }
      if (key === 'profit'){
        return (Number(b.profitability) - Number(a.profitability)) * (dir==='desc'?1: -1)
      }
      return 0
    })

    return list
  }, [items, q, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  useEffect(()=>{ if (page > totalPages) setPage(1) }, [totalPages])

  const start = (page-1)*perPage
  const pageItems = filtered.slice(start, start+perPage)

  return (
    <section>
      <Controls>
        <input placeholder="Buscar produtos (nome ou emissor)" value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} style={{flex:1,padding:8,borderRadius:6,border:'1px solid #ddd'}} />
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:8,borderRadius:6}}>
          <option value="name-asc">Nome (A → Z)</option>
          <option value="name-desc">Nome (Z → A)</option>
          <option value="maturity-asc">Data de Vencimento (mais antiga)</option>
          <option value="maturity-desc">Data de Vencimento (mais recente)</option>
          <option value="profit-desc">Rentabilidade (maior)</option>
          <option value="profit-asc">Rentabilidade (menor)</option>
        </select>
      </Controls>

      {loading ? <div>Carregando...</div> : (
        <div>
          {pageItems.length === 0 && <div>Nenhum produto encontrado.</div>}
          {pageItems.map(it => (
            <Card key={it.id}>
              <Field>
                <strong>{it.name}</strong>
                <small style={{color:'var(--muted)'}}>{it.issuer} • {it.type}</small>
              </Field>
              <Field style={{alignItems:'flex-end'}}>
                <div style={{fontWeight:700}}>{it.profitability ? `${it.profitability}%` : '-'}</div>
                <small style={{color:'var(--muted)'}}>Venc.: {it.maturityDate || '-'}</small>
              </Field>
            </Card>
          ))}
          <Pagination page={page} totalPages={totalPages} onChange={p=>setPage(p)} />
        </div>
      )}
    </section>
  )
}
