import { utils } from "near-api-js";

export class NEARContract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async numberOfSponsorships() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "number_of_sponsorships",
    });
  }

  async sponsor({ beneficiaryId, amount = 0.1, carbon }) {
    let deposit = utils.format.parseNearAmount(amount.toString());

    let response = await this.wallet.wallet.callMethod({
      contractId: this.contractId,
      method: "sponsor",
      deposit,
      args: { beneficiary_id: beneficiaryId, carbon },
    });
    return response;
  }
}
