const {
    BaseTransaction,
    TransactionError,
    utils
} = require('@liskhq/lisk-transactions');


class AddAccountInfoTransaction extends BaseTransaction {

    static get TYPE () {
        return 30;
    }

    static get FEE () {
        return '0';
    };

    async prepare(store) {
        await store.account.cache([
            {
                address: this.asset.carId,
            },
            {
                address: this.senderId,
            }
        ]);
    }

    validateAsset() {
        const errors = [];
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
        if (!this.asset.numberPlate || typeof this.asset.numberPlate !== 'string') {
            errors.push(
                new TransactionError(
                    'Invalid "asset.numberPlate" defined on transaction',
                    this.id,
                    '.asset.numberPlate',
                    this.asset.numberPlate
                )
            );
        }
        if (!this.asset.carModel || typeof this.asset.carModel !== 'string') {
            errors.push(
                new TransactionError(
                    'Invalid "asset.carModel" defined on transaction',
                    this.id,
                    '.asset.carModel',
                    this.asset.carModel,
                    'A string value'
                )
            );
        }
        return errors;
    }

    applyAsset(store) {
        const errors = [];
        const user = store.account.get(this.asset.carId);

        const updatedUserAccount = {
          ...user,
            asset: {
              senderId: this.senderId,
              numberPlate: this.asset.numberPlate,
              carModel: this.asset.carModel,
              email:this.asset.email
          }
        };
        
        store.account.set(user.address, updatedUserAccount);
        return errors;
      }

    undoAsset(store) {
        const errors = [];

        /* --- Revert user car info --- */
        const user = store.account.get(this.asset.carId);
        const originalUserAccount = { ...user, asset: {...this.user.asset, numberPlate:null, carModel:null} };
        store.account.set(user.address, originalUserAccount);
        
        return errors;
    }

}

module.exports = AddAccountInfoTransaction;