/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Leave {
    
    @Property()
    public ID: string;

    @Property()
    public Employeename: string;

    @Property()
    public LeaveType: string;

    @Property()
    public StartDate: string;

    @Property()
    public EndDate: string;
}
