export interface Token<T> {
  readonly key: symbol
  readonly description: string
  /** apenas para inferência de tipo, nunca lido em runtime */
  readonly __type?: T
}

export const createToken = <T>(description: string): Token<T> => ({
  key: Symbol(description),
  description,
})

type Factory<T> = (container: Container) => T

/** Container de DI minimalista (singleton por token), equivalente ao Hilt/Koin. */
export class Container {
  private readonly factories = new Map<symbol, Factory<unknown>>()
  private readonly instances = new Map<symbol, unknown>()

  register<T>(token: Token<T>, factory: Factory<T>): this {
    this.factories.set(token.key, factory)
    this.instances.delete(token.key)
    return this
  }

  resolve<T>(token: Token<T>): T {
    if (this.instances.has(token.key)) return this.instances.get(token.key) as T
    const factory = this.factories.get(token.key)
    if (!factory) throw new Error(`DI: nada registrado para "${token.description}"`)
    const instance = factory(this) as T
    this.instances.set(token.key, instance)
    return instance
  }
}
