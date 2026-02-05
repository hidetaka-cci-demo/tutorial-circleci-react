import type { Rule } from './rule'

export class NumberRule implements Rule {
  supports(n: number): boolean {
    return n === 0 || (n % 3 !== 0 && n % 5 !== 0)
  }

  handle(n: number): string {
    return n.toString()
  }
}
