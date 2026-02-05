import Resolver from 'class-resolver'
import type { Rule } from './rules/rule'
import { PerfectNumberRule } from './rules/PerfectNumberRule'
import { PrimeRule } from './rules/PrimeRule'

// PrimeOrPerfectクラスの実装
class PrimeOrPerfect {
  private rules: Resolver<Rule, number>

  constructor() {
    this.rules = new Resolver<Rule, number>(
      new PerfectNumberRule(),
      new PrimeRule()
    )
    this.rules.setFallbackHandler((n: number): string => {
      return n.toString()
    })
  }

  execute(n: number): string {
    const rule = this.rules.resolve(n)
    return rule.handle(n)
  }
}

// 後方互換性のための関数エクスポート
const primeOrPerfectInstance = new PrimeOrPerfect()

export function primeOrPerfect(n: number): string {
  return primeOrPerfectInstance.execute(n)
}
