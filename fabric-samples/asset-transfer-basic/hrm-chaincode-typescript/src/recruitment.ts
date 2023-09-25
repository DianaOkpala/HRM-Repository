/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Payroll {
    
    @Property()
    public ID: string;

    @Property()
    public fullname: string;

    @Property()
    public position: string;

    @Property()
    public age: string;

    @Property()
    public homeaddress: string;

    @Property()
    public currentcompany: string;

    @Property()
    public currentposition: string;
}
