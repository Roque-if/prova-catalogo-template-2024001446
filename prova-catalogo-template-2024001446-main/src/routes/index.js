/**import { Router } from 'express';

// COMPOSITION ROOT + ROTAS SSR.
// Monte a cadeia de dependências (repositório -> service -> controller) das duas
// entidades e declare as rotas.
//
// Rotas que a aplicação precisa ter:
//   GET  /                   -> redireciona para /produtos
//   -- Categorias --
//   GET  /categorias         -> listagem
//   GET  /categorias/nova    -> formulário de nova categoria (declare ANTES de rotas com :id, se houver)
//   POST /categorias         -> validar entrada e criar
//   -- Produtos --
//   GET  /produtos           -> listagem
//   GET  /produtos/novo      -> formulário de novo produto
//   POST /produtos           -> validar entrada e criar
export function criarRotas() {
  const router = Router();

  // TODO: instanciar repositórios, services e controllers; declarar as rotas acima.

  return router;
}**/


import { Router } from 'express';
import { categoriasRepository } from '../repositories/categorias.repository.prisma.js';
import { produtosRepository } from '../repositories/produtos.repository.prisma.js';
import { CategoriasService } from '../services/categorias.service.js';
import { ProdutosService } from '../services/produtos.service.js';
import { CategoriasController } from '../controllers/categorias.controller.js';
import { ProdutosController } from '../controllers/produtos.controller.js';

const router = Router();
const categoriasService = new CategoriasService(categoriasRepository);
const produtosService = new ProdutosService(produtosRepository, categoriasRepository);
const categoriasController = new CategoriasController(categoriasService);
const produtosController = new ProdutosController(produtosService, categoriasService);

router.get('/', (req, res) => res.redirect('/produtos'));
router.get('/categorias', categoriasController.index);
router.get('/categorias/nova', categoriasController.novoForm);
router.post('/categorias', categoriasController.criar);
router.get('/produtos', produtosController.index);
router.get('/produtos/novo', produtosController.novoForm);
router.post('/produtos',produtosController.criar); export default router;
