import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { ThirdPartyPaymentSystem, AppPaymentAdapter, createDecoratedProcessor } from './payment.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript — Adapter & Decorator Demo</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>

    <h2>Payments</h2>
    <div class="card">
      <button id="pay-plain">Pay $5 (plain adapter)</button>
      <button id="pay-decor">Pay $1200 (decorated)</button>
      <div id="payment-result" style="margin-top:12px; white-space:pre-wrap;"></div>
    </div>

    <p class="read-the-docs">
      Click buttons to demo Adapter (integrates third-party SDK) and Decorators (logging + error handling)
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const sdk = new ThirdPartyPaymentSystem()
const plainProcessor = new AppPaymentAdapter(sdk)
const decoratedProcessor = createDecoratedProcessor(sdk)

const resultEl = document.querySelector<HTMLDivElement>('#payment-result')!

async function runPayment(processor: typeof plainProcessor | typeof decoratedProcessor, amount: number, label: string) {
  resultEl.textContent = `${label}: processing...`
  try {
    const res = await (processor as any).pay(amount)
    resultEl.textContent = `${label}: ${res.success ? 'SUCCESS' : 'FAIL'} — ${res.message}` + (res.transactionId ? `\nTx: ${res.transactionId}` : '')
  } catch (err) {
    resultEl.textContent = `${label}: uncaught error — ${String(err)}`
  }
}

document.querySelector('#pay-plain')!.addEventListener('click', () => runPayment(plainProcessor, 5, 'Plain Adapter $5'))
document.querySelector('#pay-decor')!.addEventListener('click', () => runPayment(decoratedProcessor, 1200, 'Decorated $1200'))
