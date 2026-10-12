import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useGetProdutosQuery } from './services/api'

import { GlobalStyle } from './styles'

function App() {
  const {
    data: produtos = [],
    isLoading,
    isError,
    refetch
  } = useGetProdutosQuery()

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        {isLoading && <p role="status">Carregando produtos...</p>}
        {isError ? (
          <div role="alert">
            <p>Não foi possível carregar os produtos.</p>
            <button type="button" onClick={() => refetch()}>
              Tentar novamente
            </button>
          </div>
        ) : (
          <Produtos produtos={produtos} />
        )}
      </div>
    </>
  )
}

export default App
