import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../../types'
import { AppDispatch, RootState } from '../../store'
import { adicionar } from '../../store/reducers/carrinho'
import { alternarFavorito } from '../../store/reducers/favoritos'
import * as S from './styles'

type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const estaNosFavoritos = useSelector((state: RootState) =>
    state.favoritos.itens.some((item) => item.id === produto.id)
  )
  const estaNoCarrinho = useSelector((state: RootState) =>
    state.carrinho.itens.some((item) => item.id === produto.id)
  )

  function adicionarAoCarrinho() {
    if (estaNoCarrinho) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionar(produto))
    }
  }
  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar
        onClick={() => dispatch(alternarFavorito(produto))}
        type="button"
      >
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={adicionarAoCarrinho} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
