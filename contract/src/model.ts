export const STORAGE_COST: bigint = BigInt("1000000000000000000000");

export class Sponsor {
  account_id: string;
  total_amount: string;
  beneficiary_id: string;

  constructor({
    account_id,
    total_amount,
    beneficiary_id,
  }: {
    account_id: string;
    total_amount: string;
    beneficiary_id: string;
  }) {
    this.account_id = account_id;
    this.total_amount = total_amount;
    this.beneficiary_id = beneficiary_id;
  }
}

export class CarbonHero {
  account_id: string;
  carbon: number;
  beneficiary_id: string;

  constructor({
    account_id,
    carbon,
    beneficiary_id,
  }: {
    account_id: string;
    carbon: number;
    beneficiary_id: string;
  }) {
    this.account_id = account_id;
    this.carbon = carbon;
    this.beneficiary_id = beneficiary_id;
  }
}
