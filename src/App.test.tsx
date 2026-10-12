import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import { useGetProdutosQuery } from './services/api'

jest.mock('./services/api', () => ({
  ...jest.requireActual('./services/api'),
  useGetProdutosQuery: jest.fn()
}))

const consultarProdutos = useGetProdutosQuery as jest.Mock
const refetch = jest.fn()

test('atualiza carrinho, total e favoritos pelo Redux e impede itens repetidos', () => {
  consultarProdutos.mockReturnValue({
    data: [{ id: 1, nome: 'Camisa', preco: 100, imagem: 'camisa.png' }],
    isLoading: false,
    isError: false,
    refetch
  })
  const alerta = jest.spyOn(window, 'alert').mockImplementation(() => {})
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(screen.getByText('0 favoritos')).toBeTruthy()
  fireEvent.click(screen.getByText('Adicionar ao carrinho'))
  expect(screen.getByText(/1 itens, valor total:/).textContent).toContain(
    '100,00'
  )
  fireEvent.click(screen.getByText('Adicionar ao carrinho'))
  expect(alerta).toHaveBeenCalledWith('Item já adicionado')
  expect(store.getState().carrinho.itens).toHaveLength(1)

  fireEvent.click(screen.getByText('+ Adicionar aos favoritos'))
  expect(screen.getByText('1 favoritos')).toBeTruthy()
  fireEvent.click(screen.getByText('- Remover dos favoritos'))
  expect(screen.getByText('0 favoritos')).toBeTruthy()
  alerta.mockRestore()
})

test('exibe carregamento e permite tentar novamente quando a consulta falha', () => {
  consultarProdutos.mockReturnValue({
    isLoading: true,
    isError: false,
    refetch
  })
  const { rerender } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByRole('status').textContent).toContain('Carregando')
  consultarProdutos.mockReturnValue({
    isLoading: false,
    isError: true,
    refetch
  })
  rerender(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByRole('alert').textContent).toContain('Não foi possível')
  fireEvent.click(screen.getByText('Tentar novamente'))
  expect(refetch).toHaveBeenCalledTimes(1)
})
