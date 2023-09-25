const Hrm = artifacts.require('./Hrm.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Hrm', ([deployer, seller, buyer]) => {
  let hrm

  before(async () => {
    hrm = await Hrm.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await hrm.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await hrm.name()
      assert.equal(name, 'HRM application')
    })

    describe('employees', async () => {
        let result, employeeCount
    
        before(async () => {
          result = await hrm.createEmployee('Olamma', 'Okpala','070619922','Stoke',
          'HR Lead','HR Department', { from: seller })
          employeeCount = await hrm.employeeCount()
        })
    
        it('creates employees', async () => {
          // SUCCESS
          assert.equal(employeeCount, 1)
          const event = result.logs[0].args
          assert.equal(event.id.toNumber(), employeeCount.toNumber(), 'id is correct')
          assert.equal(event.firstname, 'Olamma', 'firstname is correct')
          assert.equal(event.lastname, 'Okpala', 'lastname is correct')
          assert.equal(event.owner, seller, 'owner is correct')
          assert.equal(event.isactive, true, 'active status is correct')
    
          // FAILURE: employee must have a first name
           await hrm.createEmployee('', 'Okpala','070619922','Stoke',
          'HR Lead','HR Department', { from: seller }).should.be.rejected;
          // FAILURE: employee must have a last name
           await hrm.createEmployee('Olamma', '','070619922','Stoke',
          'HR Lead','HR Department', { from: seller }).should.be.rejected;
        })
      })

  })
})