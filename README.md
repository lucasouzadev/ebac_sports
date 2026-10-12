# Exercício 4 — EBAC Sports com Redux

Fork do projeto [havokkmorands/ebac_sports](https://github.com/havokkmorands/ebac_sports).

O gerenciamento de estado usa Redux Toolkit. O carrinho possui um slice com prevenção de itens repetidos; os favoritos usam outro slice. O cabeçalho consulta contagens e total com `useSelector`, e o componente Produto usa `useDispatch` para adicionar itens e alternar favoritos.

As requisições de produtos usam Redux Toolkit Query (`createApi`, `fetchBaseQuery` e `useGetProdutosQuery`), com reducer e middleware registrados na store. O `Provider` disponibiliza a store à aplicação. Não há `useState` para produtos, carrinho ou favoritos. A aparência e a API do projeto-base foram mantidas.

## Executar

```sh
npm ci
npm start
```

Abra http://localhost:3000. A listagem depende da API pública original da EBAC.

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

Os testes verificam carrinho, total, favoritos, itens repetidos, carregamento e erro. A consulta é simulada nos testes de integração; a requisição real pode ser conferida no navegador.

[Fork para entrega](https://github.com/lucasouzadev/ebac_sports)

[Branch no repositório principal](https://github.com/lucasouzadev/trabalhos-ebac/tree/exercicio-04-redux)
