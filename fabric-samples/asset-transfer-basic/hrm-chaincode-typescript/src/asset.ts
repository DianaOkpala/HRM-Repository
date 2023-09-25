/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Asset {
    
    @Property()
    public ID: string;

    @Property()
    public Firstname: string;

    @Property()
    public Lastname: string;

    @Property()
    public PhoneNumber: string;

    @Property()
    public Location: string;

    @Property()
    public Position: string;

    @Property()
    public Department: string;
}
