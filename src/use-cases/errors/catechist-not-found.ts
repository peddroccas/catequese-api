export class CatechistNotFoundError extends Error {
  constructor() {
    super('Catechist not found')
  }
}
