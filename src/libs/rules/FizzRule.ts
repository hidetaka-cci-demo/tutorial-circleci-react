import type { Rule } from './rule'

export class FizzRule implements Rule {
  supports(n: number): boolean {
    return n !== 0 && n % 3 === 0 && n % 15 !== 0
  }

  handle(_n: number): string {
    return 'Fizz'
  }
}
