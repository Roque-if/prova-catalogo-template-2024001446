import { AppError } from '../utils/appError.js';

// SERVIÇO de Produto — REGRAS DE NEGÓCIO (inclui a regra que depende da Categoria).
// Lance `new AppError(mensagem, status)` quando uma regra for violada.
//
// Regras ao criar:
//   - o nome é OBRIGATÓRIO;
//   - o preço deve ser um número MAIOR que zero;
//   - a categoria informada precisa EXISTIR (regra do relacionamento 1-N) —
//     se não existir, rejeite (ex.: 422).
// Observação: preço chega do formulário como texto — converta para número antes.
// Métodos: criar e listar.
/**export class ProdutosService {
  constructor(produtosRepository, categoriasRepository) {
    this.repo = produtosRepository;
    this.categoriasRepo = categoriasRepository; // para checar se a categoria existe
  }
  // TODO: criar(dados), listar().
}**/


export class ProdutosService {

  constructor(produtosRepository, categoriasRepository) {

    this.produtosRepository = produtosRepository;
    this.categoriasRepository = categoriasRepository;

  } async listarTodos() {

    return await this.produtosRepository.findAll();

  } async criar(dados) {

    const { nome, preco, categoriaId } = dados; if (!nome || nome.trim() === '') throw new Error('Nome do produto é obrigatório.');
    const precoNum = Number(preco);
    
    if(isNaN(precoNum) || precoNum <= 0)
      throw new Error('Preço deve ser maior que zero.');
    if(!categoriaId)
      throw new Error('Categoria é obrigatória.');
    const categoriaExiste = await
        this.categoriasRepository.findById(categoriaId);
        if (!categoriaExiste)
          throw new Error('Acategoria informada não existe.');
        return await
        this.produtosRepository.create({ nome:nome.trim(), preco: precoNum, categoriaId: Number(categoriaId) });
} }
