import Resolver, { type ResolveTarget } from 'class-resolver'

// ハンドラクラスの実装
class FizzBuzzHandler implements ResolveTarget<[number], string, string> {
  supports(type: string): boolean {
    return type === 'fizzbuzz'
  }

  handle(_n: number): string {
    return 'FizzBuzz'
  }
}

class FizzHandler implements ResolveTarget<[number], string, string> {
  supports(type: string): boolean {
    return type === 'fizz'
  }

  handle(_n: number): string {
    return 'Fizz'
  }
}

class BuzzHandler implements ResolveTarget<[number], string, string> {
  supports(type: string): boolean {
    return type === 'buzz'
  }

  handle(_n: number): string {
    return 'Buzz'
  }
}

class NumberHandler implements ResolveTarget<[number], string, string> {
  supports(type: string): boolean {
    return type === 'number'
  }

  handle(n: number): string {
    return n.toString()
  }
}

// FizzBuzzクラスの実装
class FizzBuzz {
  private resolver: Resolver<ResolveTarget<[number], string, string>, string>

  constructor() {
    this.resolver = new Resolver(
      new FizzBuzzHandler(),
      new FizzHandler(),
      new BuzzHandler(),
      new NumberHandler()
    )
  }

  execute(n: number): string {
    const type = this.determineType(n)
    const handler = this.resolver.resolve(type)
    return handler.handle(n)
  }

  private determineType(n: number): string {
    if (n === 0) return 'number'
    if (n % 15 === 0) return 'fizzbuzz'
    if (n % 3 === 0) return 'fizz'
    if (n % 5 === 0) return 'buzz'
    return 'number'
  }
}

// 後方互換性のための関数エクスポート
const fizzBuzzInstance = new FizzBuzz()

export function fizzBuzz(n: number): string {
  return fizzBuzzInstance.execute(n)
}
