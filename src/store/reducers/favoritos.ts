import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../types'

type FavoritosState = { itens: Produto[] }

const initialState: FavoritosState = { itens: [] }

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    alternarFavorito: (state, action: PayloadAction<Produto>) => {
      const indice = state.itens.findIndex(
        (item) => item.id === action.payload.id
      )
      if (indice >= 0) {
        state.itens.splice(indice, 1)
      } else {
        state.itens.push(action.payload)
      }
    }
  }
})

export const { alternarFavorito } = favoritosSlice.actions
export default favoritosSlice.reducer
