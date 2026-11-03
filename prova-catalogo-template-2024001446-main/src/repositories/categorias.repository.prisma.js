/**import { prisma } from '../config/database.js';

// REPOSITÓRIO de Categoria — a ÚNICA camada que conversa com o Prisma.
// Implemente os métodos que o service vai precisar:
//   - listar todas as categorias;
//   - buscar uma categoria por id (usado para checar se a categoria existe);
//   - criar uma categoria.
// Dica: use `prisma.categoria.*`. Tudo é assíncrono.
export class CategoriasRepositoryPrisma {
  // TODO: implemente os métodos descritos acima.
}**/


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); export
  const categoriasRepository = {
    async findAll() {
      return await prisma.categoria.findMany();

    },
    async findById(id) {
      return await prisma.categoria.findUnique({ where: { id: Number(id) } });

    }, async create(data) { return await prisma.categoria.create({ data }); }
  };
