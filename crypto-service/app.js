import {LitElement, html} from 'https://unpkg.com/lit-element/lit-element.js?module';
const sampleETHDepositAddress = "0x397D3f84088f75811a3BA4Dc96eAdbA8F8bbFCa3";
class CryptoService extends LitElement {
    static get properties() {
        return {
            acknowledgement: { type: String },
        }
    }
    constructor(){
        super();
        this.depositCurrency = "eth"
        this.depositAddress = sampleETHDepositAddress
        this.value = "0.0001"
        this.channelId = "bc-channel-1"
        this.channel = new BroadcastChannel(this.channelId)
        this.channel.addEventListener('message', (msgEvent) => {
            console.log(msgEvent)
            this.acknowledgement = msgEvent.data
        })
    }
    render() {
        return html`
            <h2>Crypto Service</h2>
            <div id="depositAddress">
                Deposit Address: ${this.depositAddress}
            </div>
            <br>
            ${ this.acknowledgement 
                ? `Status: ${this.acknowledgement}, Awaiting for deposit confirmations`
                : html`<button @click=${this.handleTransactionPageDeposit}>Deposit via TransactionPage</button>`
            }
        `;
    }
    handleTransactionPageDeposit = (event) => {
        const url = new URL(window.location.href);
        url.pathname = url.pathname.replace("crypto-service", "transaction-page");
        url.searchParams.set('channelId', this.channelId);
        url.searchParams.set('currency', this.depositCurrency);
        url.searchParams.set('toAddress', this.depositAddress);
        url.searchParams.set('value', this.value);
        window.open(url.toString())
    }
}
customElements.define('crypto-service', CryptoService);