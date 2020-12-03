const {
  BaseTransaction,
  TransactionError,
  utils,
} = require("@liskhq/lisk-transactions");

class EndTravelTransaction extends BaseTransaction {
  static get TYPE() {
    return 34;
  }

  static get FEE() {
    return "0";
  }

  async prepare(store) {
    await store.account.cache([
      {
        address: this.asset.passengerId,
      },
      {
        address: this.asset.travelId,
      },
      {
        address: this.asset.carId,
      },
      {
        address: this.senderId,
      },
    ]);
  }

  validateAsset() {
    const errors = [];
    if (!this.asset.passengerId || typeof this.asset.passengerId !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.passengerId" defined on transaction',
          this.id,
          ".asset.passengerId",
          this.asset.passengerId
        )
      );
    }
    if (!this.asset.travelId || typeof this.asset.travelId !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.travelId" defined on transaction',
          this.id,
          ".asset.travelId",
          this.asset.travelId
        )
      );
    }
    if (!this.asset.carId || typeof this.asset.carId !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.carId" defined on transaction',
          this.id,
          ".asset.carId",
          this.asset.carId
        )
      );
    }

    return errors;
  }

  applyAsset(store) {
    const errors = [];
    const travel = store.account.get(this.asset.travelId);
    const passenger = store.account.get(this.asset.passengerId);
    const driver = store.account.get(this.asset.carId);

    const travelDriverBalance = travel.asset.travelDriverBalance || [];
    const foundTravelDriverBalanceIndex = travelDriverBalance.findIndex(
      (element) => element.passengerAddress === this.asset.passengerId
    );

    if (
      !travelDriverBalance[foundTravelDriverBalanceIndex].rating &&
      new utils.BigNum(
        travelDriverBalance[foundTravelDriverBalanceIndex].amountTravel
      ).gt(0)
    ) {
      const amountToWidthdraw = new utils.BigNum(
        travelDriverBalance[foundTravelDriverBalanceIndex].amountTravel
      );

      travelDriverBalance[foundTravelDriverBalanceIndex] = {
        ...travelDriverBalance[foundTravelDriverBalanceIndex],
        rating: this.asset.rating,
        amountTravel: "0",
      };

      const newTravelBalance = new utils.BigNum(travel.balance).sub(
        new utils.BigNum(amountToWidthdraw)
      );

      const newDriverBalance = new utils.BigNum(driver.balance).add(
        amountToWidthdraw
      );

      const ratings = passenger.asset.ratings || [];

      ratings.push({
        rating: this.asset.rating,
        notedBy: this.senderId,
        timestamp: this.timestamp,
      });

      const updatedTravelAccount = {
        ...travel,
        balance: newTravelBalance.toString(),
        asset: {
          ...travel.asset,
          travelDriverBalance: travelDriverBalance,
        },
      };

      const updatedPassengerAccount = {
        ...passenger,
        asset: {
          ...passenger.asset,
          ratings: ratings,
        },
      };

      const updatedDriverAccount = {
        ...driver,
        balance: newDriverBalance.toString(),
      };

      store.account.set(travel.address, updatedTravelAccount);
      store.account.set(passenger.address, updatedPassengerAccount);
      store.account.set(driver.address, updatedDriverAccount);
    }

    return errors;
  }

  undoAsset(store) {
    const errors = [];

    /* --- Revert travel account --- */
    const travel = store.account.get(this.asset.travelId);
    const originalTravelAccount = { ...travel, asset: null };
    store.account.set(travel.address, originalTravelAccount);

    /* --- Revert passenger account --- */
    const passenger = store.account.get(this.asset.passengerId);
    const originalPassengerAccount = { ...passenger, asset: null };
    store.account.set(travel.address, originalPassengerAccount);


    /* --- Revert passenger account --- */
    const driver = store.account.get(driver.asset.carId);
    const originalDriverAccount = { ...driver, asset: null };
    store.account.set(travel.address, originalDriverAccount);

    return errors;
  }
}

module.exports = EndTravelTransaction;
