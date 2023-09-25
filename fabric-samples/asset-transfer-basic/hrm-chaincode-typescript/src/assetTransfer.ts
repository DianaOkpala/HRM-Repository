/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import {Asset} from './asset';

@Info({title: 'AssetTransfer', description: 'Smart contract for hrm systems'})
export class AssetTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const assets: Asset[] = [
            {
                ID: 'hrmIdOne1',
                Firstname: 'random-username123',
                Lastname: 'some-identificationaccountOne',
                PhoneNumber: '070661992292',
                Location: 'GB',
                Position: 'HR',
                Department: 'HR',
            },
            {
                ID: 'accountIdTwo2',
                Firstname: 'random-username124',
                Lastname: 'some-identificationaccountOne',
                PhoneNumber: '070661992292',
                Location: 'GBP',
                Position: 'HR',
                Department: 'HR',
            },
            {
                ID: 'accountIdThree3',
                Firstname: 'random-username125',
                Lastname: 'some-identificationaccountOne',
                PhoneNumber: '450',
                Location: 'GBP',
                Position: 'Engineer',
                Department: 'Engineering',
            },
            {
                ID: 'accountIdFour4',
                Firstname: 'random-username126',
                Lastname: 'some-identificationaccountOne',
                PhoneNumber: '450',
                Location: 'GBP',
                Position: 'HR',
                Department: 'HR',
            },
            {
                ID: 'accountIdFive5',
                Firstname: 'random-username127',
                Lastname: 'some-identificationaccountOne',
                PhoneNumber: '450',
                Location: 'GBP',
                Position: 'HR',
                Department: 'HR',
            },
        ];

        for (const asset of assets) {
           // asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ID} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    // @Transaction()
    // public async CreateAsset(ctx: Context, id: string, color: string, size: number, owner: string, appraisedValue: number): Promise<void> {
    //     const asset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //     };
    //     await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    // }

    @Transaction()
    public async CreateAsset(ctx: Context, datas: string): Promise<void> {
        const hrmData = JSON.parse(datas);
        for (const data of hrmData) {
            await ctx.stub.putState(data.ID, Buffer.from(JSON.stringify(data)));
            console.info(`HRM Data ${data.ID} initialized`);
        }
    }

    // ReadAsset returns the asset stored in the world state with given id.
    @Transaction(false)
    public async ReadAsset(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    // @Transaction()
    // public async UpdateAsset(ctx: Context, id: string, color: string, size: number, owner: string, appraisedValue: number): Promise<void> {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }

    //     // overwriting original asset with new asset
    //     const updatedAsset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //     };
    //     return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
    // }

    // @Transaction()
    // public async UpdateAsset(ctx: Context, data: string): Promise<void> {
    //     const fintechWalletData = JSON.parse(data);
    //     const exists = await this.AssetExists(ctx, fintechWalletData.ID);
    //     if (!exists) {
    //         throw new Error(`The asset ${fintechWalletData.ID} does not exist`);
    //     }
    //     // overwriting original asset with new asset
    //     const newlyUpdatedData = fintechWalletData
    //     return ctx.stub.putState(fintechWalletData.ID, Buffer.from(JSON.stringify(newlyUpdatedData)));
    // }

    // // DeleteAsset deletes an given asset from the world state.
    // @Transaction()
    // public async DeleteAsset(ctx: Context, id: string): Promise<void> {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }
    //     return ctx.stub.deleteState(id);
    // }

    // // AssetExists returns true when asset with given ID exists in world state.
    // @Transaction(false)
    // @Returns('boolean')
    // public async AssetExists(ctx: Context, id: string): Promise<boolean> {
    //     const assetJSON = await ctx.stub.getState(id);
    //     return assetJSON && assetJSON.length > 0;
    // }

    // TransferAsset updates the owner field of asset with given id in the world state.
    @Transaction()
    public async TransferAsset(ctx: Context, id: string, newOwner: string): Promise<void> {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        asset.Owner = newOwner;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({Key: result.value.key, Record: record});
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}
