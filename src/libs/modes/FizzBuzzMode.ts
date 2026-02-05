import type { ModeHandler, ModeContext } from './modeHandler'
import { fizzBuzz } from '../fizzBuzz'

export class FizzBuzzMode implements ModeHandler {
  supports(context: ModeContext): boolean {
    return context.mode === 'fizzbuzz'
  }

  handle(context: ModeContext): string {
    return fizzBuzz(context.count)
  }
}
