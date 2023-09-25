/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class ExitRetirement {
    
    @Property()
    public ID: string;

    @Property()
    public employeename: string;

    @Property()
    public workstartdate: string;

    @Property()
    public workenddate: string;

    @Property()
    public lastlevel: string;

    @Property()
    public benefitsamount: string;

    @Property()
    public lastworkdate: string;
}

