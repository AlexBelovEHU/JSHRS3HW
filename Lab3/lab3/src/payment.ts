export interface PaymentResult {
  success: boolean
  message: string
  transactionId?: number
}

export interface PaymentProcessor {
  pay(amount: number): Promise<PaymentResult>
}

export class ThirdPartyPaymentSystem {
  id=1
  async sendPayment(payload: {amountCents: number; metadata?: any}): Promise<{status: 'ok'|'error'; id?: number; error?: string}> {
    await new Promise((r) => setTimeout(r, 300))
    if (payload.amountCents <= 0) {
      return {status: 'error', error: 'invalid_amount'}
    }
    if (payload.amountCents > 100000) {
      return {status: 'error', error: 'amount_too_large'}
    }
    return {status: 'ok', id: this.id++}
  }
}

export class AppPaymentAdapter implements PaymentProcessor {


  private sdk: ThirdPartyPaymentSystem
  constructor(sdk: ThirdPartyPaymentSystem) {
    this.sdk = sdk
  }

  async pay(amount: number): Promise<PaymentResult> {
    const cents = Math.round(amount * 100)
    const resp = await this.sdk.sendPayment({amountCents: cents})
    if (resp.status === 'ok') {
      return {success: true, message: 'Payment successful', transactionId: resp.id}
    }
    return {success: false, message: `Third-party error: ${resp.error || 'unknown'}`}
  }
}

export class LoggingDecorator implements PaymentProcessor {
  private wrapped: PaymentProcessor

  constructor(wrapped: PaymentProcessor) {
    this.wrapped = wrapped
  }

  async pay(amount: number): Promise<PaymentResult> {
    const t0 = Date.now()
    const result = await this.wrapped.pay(amount)
    console.log(`Payment: $${amount} -> ${result.success ? 'OK' : 'FAIL'} (${Date.now() - t0}ms)`)
    return result
  }
}

export class ErrorHandlingDecorator implements PaymentProcessor {
  private wrapped: PaymentProcessor

  constructor(wrapped: PaymentProcessor) {
    this.wrapped = wrapped
  }

  async pay(amount: number): Promise<PaymentResult> {
    try {
      const res = await this.wrapped.pay(amount)
      return res
    } catch (err) {
      console.error('[Payment][ErrorHandling] uncaught error', err)
      return {success: false, message: `Unhandled error: ${String(err)}`}
    }
  }
}

export function createDecoratedProcessor(sdk: ThirdPartyPaymentSystem): PaymentProcessor {
  const adapter = new AppPaymentAdapter(sdk)
  const logger = new LoggingDecorator(adapter)
  return new ErrorHandlingDecorator(logger)
}
