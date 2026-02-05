import type { ModeHandler, ModeContext } from './modeHandler'
import { primeOrPerfect } from '../primeOrPerfect'

export class PrimeOrPerfectMode implements ModeHandler {
  supports(context: ModeContext): boolean {
    return context.mode === 'primeOrPerfect'
  }

  handle(context: ModeContext): string {
    return primeOrPerfect(context.count)
  }
}
