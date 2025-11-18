const API_URL = 'https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData'

export async function fetchFixedIncomeData(){
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch fixed income data')
  return res.json()
}
