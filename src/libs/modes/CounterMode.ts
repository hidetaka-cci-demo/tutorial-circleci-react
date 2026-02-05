import type { ModeHandler, ModeContext } from './modeHandler'

export class CounterMode implements ModeHandler {
  supports(context: ModeContext): boolean {
    return context.mode === 'counter'
  }

  handle(context: ModeContext): string {
    return context.count.toString()
  }
}
