import React from 'react'
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react'
import { vi, beforeEach, afterEach, test, expect } from 'vitest'
import App from '../App'

const mockData = [
  {
    id: '1',
    name: 'Tesouro Selic 2029',
    institution: 'Tesouro Nacional',
    type: 'Tesouro Direto',
    yield: '5.2',
    maturityDate: '2029-01-01'
  },
  {
    id: '2',
    name: 'CDB Banco X',
    institution: 'Banco X',
    type: 'CDB',
    yield: '7.1',
    maturityDate: '2026-06-01'
  },
  {
    id: '3',
    name: 'LCI Banco Y',
    institution: 'Banco Y',
    type: 'LCI',
    yield: '6.0',
    maturityDate: '2027-03-01'
  }
]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) })))
})

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

test('renders loading and then items from API', async () => {
  render(<App />)
  expect(screen.getByText(/Carregando dados/i)).toBeInTheDocument()

  await waitFor(() => expect(screen.queryByText(/Carregando dados/i)).not.toBeInTheDocument())
  expect(screen.getByText(/Minhas Rendas Fixas/i)).toBeInTheDocument()
  // one of the items should be present
  expect(screen.getByText(/Tesouro Selic 2029/)).toBeInTheDocument()
})

test('filters items by search query', async () => {
  render(<App />)
  await waitFor(() => expect(screen.queryByText(/Carregando dados/i)).not.toBeInTheDocument())

  const input = screen.getByPlaceholderText(/Pesquisar produtos/i)
  fireEvent.change(input, { target: { value: 'CDB' } })

  expect(screen.getByText(/CDB Banco X/)).toBeInTheDocument()
  expect(screen.queryByText(/Tesouro Selic 2029/)).not.toBeInTheDocument()
})

test('paginates results (page buttons exist)', async () => {
  // create larger dataset to force pagination
  const big = Array.from({ length: 12 }, (_, i) => ({ id: String(i+1), name: `Item ${i+1}`, institution: 'X', type: 'Y', yield: '1.0', maturityDate: '2025-01-01' }))
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve(big) })))

  render(<App />)
  await waitFor(() => expect(screen.queryByText(/Carregando dados/i)).not.toBeInTheDocument())

  // Expect page buttons for 3 pages (12 items, 5 per page)
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('3')).toBeInTheDocument()
})
