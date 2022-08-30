import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';

export class UserController {
  constructor(
    private readonly repository: UserRepository,
  ) {}

  async list(_request: Request, response: Response) {
    return response.json(
      await this.repository.list()
    )
  }

  async find(request: Request, response: Response) {
    return response.json(
      await this.repository.findOne(request.params.id),
    );
  }

  async edit(request: Request, response: Response) {
    return response.json(await this.repository.save({
      id: request.params.id,
      ...request.body
    }))
  }

  async create(request: Request, response: Response) {
    return response
      .status(201)
      .json(await this.repository.save(request.body))
  }

  async delete(request: Request, response: Response) {
    await this.repository.delete(request.params.id)
    
    return response
      .status(204)
      .json({ removed: true })
  }
}

