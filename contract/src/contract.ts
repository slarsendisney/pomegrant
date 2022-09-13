import {
  NearBindgen,
  near,
  call,
  view,
  initialize,
  UnorderedMap,
} from "near-sdk-js";
import { assert } from "./utils";
import { Sponsor, STORAGE_COST } from "./model";

@NearBindgen({})
class PaintoContract {
  sponsorships: UnorderedMap = new UnorderedMap("map-uid-1");

  @initialize({})
  init() {}

  @call({ payableFunction: true })
  sponsor({ beneficiary_id }: { beneficiary_id: string }) {
    // Get who is calling the method and how much $NEAR they attached
    let sponsor = near.predecessorAccountId();
    let donationAmount: bigint = near.attachedDeposit() as bigint;

    let sponsoredSoFar =
      this.sponsorships.get(sponsor) === null
        ? BigInt(0)
        : BigInt(this.sponsorships.get(sponsor) as string);
    let toTransfer = donationAmount;

    // This is the user's first donation, lets register it, which increases storage
    if (sponsoredSoFar == BigInt(0)) {
      assert(
        donationAmount > STORAGE_COST,
        `Attach at least ${STORAGE_COST} yoctoNEAR`
      );

      // Subtract the storage cost to the amount to transfer
      toTransfer -= STORAGE_COST;
    }

    // Persist in storage the amount donated so far
    sponsoredSoFar += donationAmount;
    this.sponsorships.set(sponsor, sponsoredSoFar.toString());
    near.log(
      `Thank you ${sponsor} for sponsoring ${beneficiary_id} with ${donationAmount}!`
    );

    // Send the money to the beneficiary
    const promise = near.promiseBatchCreate(beneficiary_id);
    near.promiseBatchActionTransfer(promise, toTransfer);

    // Return the total amount donated so far
    return sponsoredSoFar.toString();
  }

  @view({})
  number_of_sponsorships() {
    return this.sponsorships.length;
  }

  @view({})
  get_sponsorships({
    from_index = 0,
    limit = 50,
    beneficiary_id,
  }: {
    from_index: number;
    limit: number;
    beneficiary_id: string;
  }): Sponsor[] {
    let ret: Sponsor[] = [];
    let end = Math.min(limit, this.sponsorships.length);
    for (let i = from_index; i < end; i++) {
      const account_id: string = this.sponsorships.keys.get(i) as string;
      const donation: Sponsor = this.get_sponsorship_for_account({
        account_id,
        beneficiary_id,
      });
      ret.push(donation);
    }
    return ret;
  }

  @view({})
  get_sponsorship_for_account({
    account_id,
    beneficiary_id,
  }: {
    account_id: string;
    beneficiary_id: string;
  }): Sponsor {
    return new Sponsor({
      account_id,
      beneficiary_id,
      total_amount: this.sponsorships.get(account_id) as string,
    });
  }
}
