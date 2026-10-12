import * as S from './styles'

import { useSelector } from 'react-redux'
import { RootState } from '../../store'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

const Header = () => {
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const quantidadeFavoritos = useSelector(
    (state: RootState) => state.favoritos.itens.length
  )
  const valorTotal = itensNoCarrinho.reduce((acc, item) => {
    acc += item.preco
    return acc
  }, 0)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{quantidadeFavoritos} favoritos</span>
        <img src={cesta} alt="Carrinho" />
        <span>
          {itensNoCarrinho.length} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
