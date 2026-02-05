import type { Rule } from './rule'

export class PerfectNumberRule implements Rule {
  supports(n: number): boolean {
    if (n < 1) {
      return false
    }
    if (n === 1) {
      return false
    }
    let sum = 1
    const sqrt = Math.sqrt(n)
    for (let i = 2; i <= sqrt; i++) {
      if (n % i === 0) {
        sum += i
        if (i !== n / i) {
          sum += n / i
        }
      }
    }
    return sum === n
  }

  handle(_n: number): string {
    return '完全数'
  }
}
