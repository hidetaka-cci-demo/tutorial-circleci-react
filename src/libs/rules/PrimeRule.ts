import type { Rule } from './rule'

export class PrimeRule implements Rule {
  supports(n: number): boolean {
    if (n < 2) {
      return false
    }
    if (n === 2) {
      return true
    }
    if (n % 2 === 0) {
      return false
    }
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  }

  handle(_n: number): string {
    return '素数'
  }
}
