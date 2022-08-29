import { Router } from 'express';
import { UserController } from './controllers/UsersController';
import { Connection } from './database/Connection';
import { Neo4JUserRepository } from './database/neo4j/Neo4JUserRepository';
import { forBody } from './validators/fields/forBody';
import { makeValidator } from './validators/makeValidator';
import { CreateUserSchema } from './validators/schemas/CreateUserSchema';
import { EditUserSchema } from './validators/schemas/EditUserSchema';

export function routes(connection: Connection): Router {
  const controller = new UserController(
    new Neo4JUserRepository(connection)
  );

  const router = Router();

  router.get('/', controller.list.bind(controller));
  router.post('/', makeValidator(CreateUserSchema, forBody), controller.create.bind(controller));
  router.put('/:id', makeValidator(EditUserSchema, forBody), controller.edit.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

