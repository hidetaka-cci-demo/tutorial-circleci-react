import Resolver,{ type ResolveTarget } from 'class-resolver'

// 数値ベースの判定を行うRuleインターフェース
interface Rule extends ResolveTarget<[number], string, number> {
  supports(n: number): boolean
  handle(n: number): string
}

// Ruleクラスの実装
class FizzBuzzRule implements Rule {
  supports(n: number): boolean {
    return n !== 0 && n % 15 === 0
  }

  handle(_n: number): string {
    return 'FizzBuzz'
  }
}

class FizzRule implements Rule {
  supports(n: number): boolean {
    return n !== 0 && n % 3 === 0 && n % 15 !== 0
  }

  handle(_n: number): string {
    return 'Fizz'
  }
}

class BuzzRule implements Rule {
  supports(n: number): boolean {
    return n !== 0 && n % 5 === 0 && n % 15 !== 0
  }

  handle(_n: number): string {
    return 'Buzz'
  }
}

class NumberRule implements Rule {
  supports(n: number): boolean {
    return n === 0 || (n % 3 !== 0 && n % 5 !== 0)
  }

  handle(n: number): string {
    return n.toString()
  }
}

// FizzBuzzクラスの実装
class FizzBuzz {
  private rules: Resolver<Rule, number>

  constructor() {
    this.rules = new Resolver<Rule, number>(
      new FizzBuzzRule(),
      new FizzRule(),
      new BuzzRule(),
      new NumberRule()
    )
  }

  execute(n: number): string {
    const rule = this.rules.resolve(n)
    return rule.handle(n)
  }
}

// 後方互換性のための関数エクスポート
const fizzBuzzInstance = new FizzBuzz()

export function fizzBuzz(n: number): string {
  return fizzBuzzInstance.execute(n)
}
