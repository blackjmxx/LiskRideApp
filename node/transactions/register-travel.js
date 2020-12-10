const {
  BaseTransaction,
  TransactionError,
  utils,
} = require("@liskhq/lisk-transactions");

class RegisterTravelransaction extends BaseTransaction {
  static get TYPE() {
    return 31;
  }

  static get FEE() {
    return "0";
  }

  async prepare(store) {
    await store.account.cache([
      {
        address: this.asset.travelId,
      },
      {
        address: this.senderId,
      },
    ]);
  }

  validateAsset() {
    const errors = [];
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
    if (!this.asset.destination || typeof this.asset.destination !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.destination" defined on transaction',
          this.id,
          ".asset.destination",
          this.asset.destination
        )
      );
    }
    if (!this.asset.pickUpLocation || typeof this.asset.pickUpLocation !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.pickUpLocation" defined on transaction',
          this.id,
          ".asset.pickUpLocation",
          this.asset.pickUpLocation,
          "A string value"
        )
      );
    }
    if (!this.asset.pickUpDate || typeof this.asset.pickUpDate !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.pickUpDate" defined on transaction',
          this.id,
          ".asset.pickUpDate",
          this.asset.pickUpDate,
          "A string value"
        )
      );
    }
    if (!this.asset.availableSeatCount || typeof this.asset.availableSeatCount !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.availableSeatCount" defined on transaction',
          this.id,
          ".asset.availableSeatCount",
          this.asset.availableSeatCount,
          "A string value"
        )
      );
    }
    if (!this.asset.pricePerSeat || typeof this.asset.pricePerSeat !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.pricePerSeat" defined on transaction',
          this.id,
          ".asset.pricePerSeat",
          this.asset.pricePerSeat,
          "A string value"
        )
      );
    }
    if (this.asset.destination === this.asset.pickUpLocation) {
      errors.push(
        new TransactionError(
          'Destination and PickUpLocation must be different'
        )
      );
    }
    return errors;
  }

  applyAsset(store) {
    const errors = [];

    const travel = store.account.getOrDefault(this.asset.travelId);
    const driver = store.account.get(this.senderId)
    const driverTravels = driver.asset.driverTravels || []

    if (!travel.asset.pickUpDate) {

      const driverTravel = {
        carId:this.asset.carId,
        travelId:this.asset.travelId,
        senderId: this.senderId,
        driverAdress: this.asset.driverAdress,
        pickUpLocation: this.asset.pickUpLocation,
        pickUpDate:this.asset.pickUpDate,
        availableSeatCount: this.asset.availableSeatCount,
        pricePerSeat:this.asset.pricePerSeat,
        destination:this.asset.destination
      }

      driverTravels.push(driverTravel)
      
      const updatedTravelAccount = {
        ...travel,
          asset: {
            carId:this.asset.carId,
            travelId:this.asset.travelId,
            senderId: this.senderId,
            driverAdress: this.asset.driverAdress,
            pickUpLocation: this.asset.pickUpLocation,
            pickUpDate:this.asset.pickUpDate,
            availableSeatCount: this.asset.availableSeatCount,
            pricePerSeat:this.asset.pricePerSeat,
            destination:this.asset.destination
          }
      };

      const updatedDriverAccount = {
        ...driver,
          asset: {
            ...driver.asset,
            driverTravels:driverTravels,
          }
      };

      store.account.set(travel.address, updatedTravelAccount);
      store.account.set(this.senderId, updatedDriverAccount);

      console.log(updatedTravelAccount)
    }else {
      errors.push(
          new TransactionError(
              'travel has already been registered',
              producer.asset.name
          )
      );
  }
  
  return errors;
  }

  undoAsset(store) {
    const errors = [];

    const travel = store.account.get(this.asset.carId);
    const originalTravelAccount = { ...travel, asset: null };
    store.account.set(travel.address, originalTravelAccount);

    return errors;
  }
}

module.exports = RegisterTravelransaction;
