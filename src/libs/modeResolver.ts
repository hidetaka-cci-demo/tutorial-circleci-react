import Resolver from 'class-resolver'
import type { ModeHandler, ModeContext } from './modes/modeHandler'
import type { Mode } from '../hooks/useFizzBuzz'
import { CounterMode } from './modes/CounterMode'
import { FizzBuzzMode } from './modes/FizzBuzzMode'
import { PrimeOrPerfectMode } from './modes/PrimeOrPerfectMode'

// ModeResolverクラスの実装
class ModeResolver {
  private handlers: Resolver<ModeHandler, ModeContext>

  constructor() {
    this.handlers = new Resolver<ModeHandler, ModeContext>(
      new CounterMode(),
      new FizzBuzzMode(),
      new PrimeOrPerfectMode()
    )
  }

  execute(mode: Mode, count: number): string {
    const context: ModeContext = { mode, count }
    const handler = this.handlers.resolve(context)
    return handler.handle(context)
  }
}

// シングルトンインスタンスをエクスポート
const modeResolverInstance = new ModeResolver()

export function resolveMode(mode: Mode, count: number): string {
  return modeResolverInstance.execute(mode, count)
}
