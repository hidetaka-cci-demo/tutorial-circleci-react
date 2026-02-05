import type { Rule } from './rule'

export class BuzzRule implements Rule {
  supports(n: number): boolean {
    return n !== 0 && n % 5 === 0 && n % 15 !== 0
  }

  handle(_n: number): string {
    return 'Buzz'
  }
}
