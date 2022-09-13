import {
  NearBindgen,
  near,
  call,
  view,
  initialize,
  UnorderedMap,
} from "near-sdk-js";
import { assert } from "./utils";
import { CarbonHero, Sponsor, STORAGE_COST } from "./model";

@NearBindgen({})
class PaintoContract {
  carbonHeroes: CarbonHero[] = [];
  sponsorships: UnorderedMap = new UnorderedMap("map-uid-1");
  totalCarbonSaved: number = 0;

  @initialize({})
  init() {}

  @call({ payableFunction: true })
  sponsor({
    beneficiary_id,
    carbon,
  }: {
    beneficiary_id: string;
    carbon: number;
  }) {
    // Get who is calling the method and how much $NEAR they attached
    let sponsor = near.predecessorAccountId();
    let donationAmount: bigint = near.attachedDeposit() as bigint;
    let toTransfer = donationAmount;

    const hero = new CarbonHero({
      account_id: sponsor,
      carbon,
      beneficiary_id,
    });

    this.carbonHeroes.push(hero);

    let sponsoredSoFar =
      this.sponsorships.get(sponsor) === null
        ? BigInt(0)
        : BigInt(this.sponsorships.get(sponsor) as string);

    // This is the user's first donation, lets register it, which increases storage
    if (sponsoredSoFar == BigInt(0)) {
      assert(
        donationAmount > STORAGE_COST,
        `Attach at least ${STORAGE_COST} yoctoNEAR`
      );

      // Subtract the storage cost to the amount to transfer
      toTransfer -= STORAGE_COST;
    }
    near.log(`3`);
    // Persist in storage the amount donated so far
    sponsoredSoFar += donationAmount;

    near.log(`4`);
    this.sponsorships.set(sponsor, sponsoredSoFar.toString());

    near.log(`6`);
    this.totalCarbonSaved += carbon;

    near.log(
      `Thank you ${sponsor} for sponsoring ${beneficiary_id} with ${donationAmount} -  You've saved ${carbon}g of carbon!`
    );

    near.log(`7`);
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

  // @view({})
  // number_of_carbon_heroes() {
  //   return this.carbonHeroes.length;
  // }

  // @view({})
  // get_carbon_saved() {
  //   return this.totalCarbonSaved;
  // }

  // @view({})
  // get_all_carbon_heroes(): CarbonHero[] {
  //   let ret: CarbonHero[] = [];
  //   for (let i = 0; i < this.carbonHeroes.length; i++) {
  //     const account_id: string = this.carbonHeroes.keys.get(i) as string;
  //     const carbon: CarbonHero = this.get_carbon_for_account({
  //       account_id,
  //     });
  //     ret.push(carbon);
  //   }
  //   return ret;
  // }

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
  // @view({})
  // get_carbon_for_account({ account_id }: { account_id: string }): CarbonHero {
  //   return new CarbonHero({
  //     account_id,
  //     total_carbon_saved: this.carbonHeroes.get(account_id) as string,
  //   });
  // }
}
