import Resolver from 'class-resolver'
import type { Rule } from './rules/rule'
import { FizzBuzzRule } from './rules/FizzBuzzRule'
import { FizzRule } from './rules/FizzRule'
import { BuzzRule } from './rules/BuzzRule'
import { NumberRule } from './rules/NumberRule'

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
