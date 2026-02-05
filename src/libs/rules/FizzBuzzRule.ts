import type { Rule } from './rule'

// Ruleクラスの実装
export class FizzBuzzRule implements Rule {
  supports(n: number): boolean {
    return n !== 0 && n % 15 === 0
  }

  handle(_n: number): string {
    return 'FizzBuzz'
  }
}
