import {
  providers,
  KeyPair,
  keyStores,
  connect,
  WalletConnection,
} from "near-api-js";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";
const PENDING_ACCESS_KEY_PREFIX = "pending_key";

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector;
  wallet;
  network;
  createAccessKeyFor;
  nearConnectionConfig;
  account;
  accountId;

  constructor({ createAccessKeyFor = undefined, network = "testnet" }) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = "testnet";
    this.nearConnectionConfig = {
      networkId: "testnet",
      network: {
        nodeUrl: "https://rpc.testnet.near.org",
      },
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    this.walletSelector = {};
    this.walletSelector.options = this.nearConnectionConfig;
  }

  async startUp() {
    const nearConnection = await connect(this.nearConnectionConfig);
    const walletConnection = new WalletConnection(nearConnection);
    const account = await nearConnection.account(
      walletConnection._authData.accountId
    );
    this.accountId = walletConnection._authData.accountId;
    this.account = account;
    this.wallet = walletConnection;
 
  }

  async signIn(options) {
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL("https://testnet.mynearwallet.com" + "/login/");
    newUrl.searchParams.set(
      "success_url",
      options.successUrl || currentUrl.href
    );
    newUrl.searchParams.set(
      "failure_url",
      options.failureUrl || currentUrl.href
    );

    const accessKey = KeyPair.fromRandom("ed25519");
    newUrl.searchParams.set("public_key", accessKey.getPublicKey().toString());

    await this.nearConnectionConfig.keyStore.setKey(
      this.network,
      PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(),
      accessKey
    );

    window.location.assign(newUrl.toString());
  }

  // Sign-out method
  signOut() {
    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    let res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }) {
    // Sign a transaction with the "FunctionCall" action
    console.log(this.wallet)
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  // Get transaction result from the network
  async getTransactionResult(txhash) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }
}
