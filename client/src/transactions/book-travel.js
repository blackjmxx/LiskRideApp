import {
  BaseTransaction,
  TransactionError,
  utils,
} from "@liskhq/lisk-transactions";

 class BookTravelTransaction extends BaseTransaction {
  static get TYPE() {
    return 32;
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
        address: this.asset.carId,
      },
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

    if (!this.asset.passengerId || typeof this.asset.passengerId !== 'string') {
      errors.push(
          new TransactionError(
              'Invalid "asset.passengerId" defined on transaction',
              this.id,
              '.asset.passengerId',
              this.asset.passengerId
          )
      );
  }
  if (!this.asset.carId || typeof this.asset.carId !== 'string') {
      errors.push(
          new TransactionError(
              'Invalid "asset.carId" defined on transaction',
              this.id,
              '.asset.carId',
              this.asset.carId
          )
      );
  }
  if (!this.asset.travelId || typeof this.asset.travelId !== 'string') {
      errors.push(
          new TransactionError(
              'Invalid "asset.travelId" defined on transaction',
              this.id,
              '.asset.travelId',
              this.asset.travelId,
              'A string value'
          )
      );
  }

  //todo must be transform into number
    if (!this.asset.seatCount || typeof this.asset.seatCount !== 'string') {
      errors.push(
          new TransactionError(
              'Invalid "asset.seatCount" defined on transaction',
              this.id,
              '.asset.seatCount',
              this.asset.seatCount,
              'A string value'
          )
      );
  }

    return errors;
  }

  applyAsset(store) {
    const errors = [];
    const travel = store.account.get(this.asset.travelId);
    const passenger = store.account.get(this.asset.passengerId);
    const driver = store.account.get(travel.asset.carId);
    const passengerTravels = passenger.asset.passengerTravels || []

    const foundDriverTravelIndex = driver.asset.driverTravels.findIndex(element => element.travelId === this.asset.travelId);

    const amountTravel = new utils.BigNum(travel.asset.pricePerSeat).mul(
      new utils.BigNum(this.asset.seatCount)
    );

    const newTravelBalance = new utils.BigNum(travel.balance).add(
      new utils.BigNum(amountTravel)
    );
    const newPassengerBalance = new utils.BigNum(passenger.balance).sub(
      newTravelBalance
    );

    if (
      !utils.BigNum(passenger.balance).gt("0") ||
      !utils.BigNum(passenger.balance).gte(newTravelBalance)
    ) {
      errors.push(
        new TransactionError(
          "not enough amount for this travel",
          this.asset.travelId
        )
      );
    }
    if (
      !utils.BigNum(travel.asset.availableSeatCount).gte(this.asset.seatCount)
    ) {
      errors.push(
        new TransactionError(
          "not enough seat for this travel",
          this.asset.travelId
        )
      );
    }
    if (
      passenger.address === driver.address
    ) {
      errors.push(
        new TransactionError(
          "Driver cannot book seat on his own car",
          this.asset.travelId
        )
      );
    }

    if (errors.length <= 0) {

      const travelPassengerBalances = travel.asset.travelPassengerBalances || []
 
      const foundTravelPassengerBalanceIndex = travelPassengerBalances.findIndex(element => element.passengerAddress === passenger.address);
      const foundTravelPassengerBalance = travelPassengerBalances[foundTravelPassengerBalanceIndex];

      if(!foundTravelPassengerBalance){
        travelPassengerBalances.push({passengerAddress:passenger.address, seatCount:this.asset.seatCount, amountTravel:amountTravel.toString()})  
      }else{
        travelPassengerBalances[foundTravelPassengerBalanceIndex] = {...foundTravelPassengerBalance, seatCount:utils.BigNum(foundTravelPassengerBalance.seatCount).add(this.asset.seatCount).toString(), amountTravel:utils.BigNum(foundTravelPassengerBalance.amountTravel).add(new utils.BigNum(amountTravel)).toString()}
      }

      const restSeatCount = new utils.BigNum(
        travel.asset.availableSeatCount
      ).sub(this.asset.seatCount);

      const updatedTravel = {
        ...travel,
        asset: {
          ...travel.asset,
          travelPassengerBalances:travelPassengerBalances,
          availableSeatCount: restSeatCount.toString(),
        },
        balance: newTravelBalance.toString(),
      };

      store.account.set(travel.address, updatedTravel);

      passengerTravels.push(travel)

      const updatedPassenger = {
        ...passenger,
        asset: {
          ...passenger.asset,
          passengerTravels:passengerTravels,
        },
        balance: newPassengerBalance.toString(),
      };

      store.account.set(passenger.address, updatedPassenger);


      driver.asset.driverTravels[foundDriverTravelIndex] = updatedTravel.asset

      const updatedDriver = {
        ...driver,
        asset: {
          ...driver.asset,
          driverTravels:driver.asset.driverTravels,
        }
      };

      store.account.set(driver.address, updatedDriver);

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
    const driver = store.account.get(this.asset.carId);
    const originalDriverAccount = { ...driver, asset: null };
    store.account.set(travel.address, originalDriverAccount);

    return errors;
  }
}

export default BookTravelTransaction;
