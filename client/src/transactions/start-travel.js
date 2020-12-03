import {
  BaseTransaction,
  TransactionError,
  utils,
} from "@liskhq/lisk-transactions";

class StartTravelransaction extends BaseTransaction {
  static get TYPE() {
    return 33;
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
        address: this.asset.passengerId,
      },
      {
        address: this.senderId,
      },
    ]);
  }

  validateAsset() {
    const errors = [];
    if (!this.asset.travelId || typeof this.asset.travelId !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.travelId" defined on transaction',
          this.id,
          ".asset.travelId",
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

    const travelDriverBalance = travel.asset.travelDriverBalance || []
    const travelPassengerBalances = travel.asset.travelPassengerBalances || []
 
    const foundTravelPassengerBalance = travelPassengerBalances.find(element => element.passengerAddress === passenger.address);
    const foundTravelDriverBalance = travelDriverBalance.find(element => element.passengerAddress === passenger.address);

    if(!foundTravelDriverBalance){
      if(foundTravelPassengerBalance){
        travelDriverBalance.push(foundTravelPassengerBalance)
      }
    }else{
        errors.push(
          new TransactionError(
              'travelDriverBalance has already been setted for driver',
              this.asset.travelId
          )
      );
    }
    
    const updatedTravelAccount = {
      ...travel,
        asset: {
          ...travel.asset,
          travelDriverBalance:travelDriverBalance,
        }
    };

  if(errors.length > 0){
    store.account.set(travel.address, updatedTravelAccount);
  }

  
  return errors;
  }

  undoAsset(store) {
    const errors = [];
    
    const travel = store.account.get(this.asset.travelId);
    const passenger = store.account.get(this.asset.passengerId);

    /* --- Revert travel account --- */
    const originalTravelAccount = { ...travel, asset: null };
    store.account.set(travel.address, originalTravelAccount);

    /* --- Revert passenger account --- */
    const originalPassengerAccount = { ...passenger, asset: null };
    store.account.set(travel.address, originalPassengerAccount);

    return errors;
  }
}

export default StartTravelransaction;
