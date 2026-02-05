import { type ResolveTarget } from 'class-resolver'

// 数値ベースの判定を行うRuleインターフェース
export interface Rule extends ResolveTarget<[number], string, number> {
  supports(n: number): boolean
  handle(n: number): string
}
