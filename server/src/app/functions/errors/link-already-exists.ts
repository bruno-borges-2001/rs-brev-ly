export class LinkAlreadyExistsError extends Error {
  constructor() {
    super('Link já existe')
  }
}
