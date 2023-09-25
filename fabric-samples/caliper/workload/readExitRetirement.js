'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        for (let i = 0; i < this.roundArguments.assets; i++) {
        
            const hrmExtRetData = 
            [{
            ID: 'hrmEtRtIdOne',
            Employeename:'random-username123',
            Workstartdate:'30-Jul-1980',
            Workenddate:'30-Jul-2020',
            Lastlevel:'Junior HR',
            Benefitsamount:'20000',
            Lastworkdate:'Jul-2020'
        }];


        console.log('about to log hrm data for reading asset');
        console.log(JSON.stringify(hrmExtRetData));

        const request = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'CreateAsset',
            contractArguments: [JSON.stringify(hrmExtRetData)],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(request);
        }
    }
    async submitTransaction() {
        const randomId = Math.floor(Math.random() * this.roundArguments.assets);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'ReadAsset',
            invokerIdentity: 'User1',
            contractArguments: [`hrmEtRtIdOne`],
            readOnly: true
        };
        await this.sutAdapter.sendRequests(myArgs);
    }

    async cleanupWorkloadModule() {
        for (let i = 0; i < this.roundArguments.assets; i++) {
            const assetID = `hrmEtRtIdOne`;
            console.log(`Worker ${this.workerIndex}: Deleting asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'DeleteAsset',
                invokerIdentity: 'User1',
                contractArguments: [assetID],
                readOnly: false
            };
            await this.sutAdapter.sendRequests(request);
        }
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;