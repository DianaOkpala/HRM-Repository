/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Payroll {
    
    @Property()
    public ID: string;

    @Property()
    public Employeename: string;

    @Property()
    public Employeelevel: string;

    @Property()
    public Amount: string;

    @Property()
    public Benefitsamount: string;

    @Property()
    public Payday: string;
}
