pragma solidity ^0.5.0;

contract Hrm {
    string public name;
    uint public employeeCount = 0;
    uint public leaveCount = 0;
     uint public payrollCount = 0;
      uint public recruitmentCount = 0;
       uint public eretirementCount = 0;

    mapping(uint => Employee) public employees;
    mapping(uint => Leave) public leaveRecords;
     mapping(uint => Payroll) public payrollRecords;
      mapping(uint => Recruitment) public recruitmentRecords;
       mapping(uint => Eretirement) public eretirementRecords;



    struct Employee {

        uint id;
        string firstname;
        string lastname;
        string phonenumber;
        string location;
        string position;
        string department;
        address owner;
        bool isactive;
    }

    struct Leave {

        uint id;
        string employeename;
        string leavetype;
        string startdate;
        string enddate;
    }


    struct Payroll
    {
        uint id;
        string employeename;
        string employeelevel;
        string amount;
        string benefitsamount;
        string payday;
    }

     struct Recruitment
    {
        uint id;
        string fullname;
        string position;
        string age;
        string homeaddress;
        string currentcompany;
        string currentposition;
    }

    struct Eretirement
    {
        uint id;
        string employeename;
        string workstartdate;
        string workenddate;
        string lastlevel;
        string benefitsamount;
        string lastworkdate;
    }

    event EmployeeCreated(

        uint id,
        string firstname,
        string lastname,
        string phonenumber,
        string location,
        string position,
        string department,
        address owner,
        bool isactive
    );

    event LeaveCreated (

        uint id,
        string employeename,
        string leavetype,
        string startdate,
        string enddate
    );

     event PayrollCreated (

        uint id,
        string employeename,
        string employeelevel,
        string amount,
        string benefitsamount,
        string payday
    );

     event RecruitmentCreated (

        uint id,
        string fullname,
        string position,
        string age,
        string homeaddress,
        string currentcompany,
        string currentposition
    );

    event ERetirementCreated (

        uint id,
        string employeename,
        string workstartdate,
        string workenddate,
        string lastlevel,
        string benefitsamount,
        string lastworkdate
    );

    

    constructor() public {
        name = "HRM application";
    }


    //SMART CONTRACT FUNCTION EMPLOYEE - smart contract function to manage employee

    function createEmployee(string memory _firstname,string memory _lastname,
    string memory _phonenumber,string memory _location,string memory _position,
    string memory _department) public {

        // Require a valid firstname
        require(bytes(_firstname).length > 0);

        // Require a valid lastname
        require(bytes(_lastname).length > 0);

        // Increment employee count
        employeeCount ++;

        // Create the employee
        employees[employeeCount] = Employee(employeeCount, _firstname,_lastname,_phonenumber,
        _location, _position, _department, msg.sender, true);

        // Trigger an event
        emit EmployeeCreated(employeeCount, _firstname,_lastname,_phonenumber,
        _location, _position, _department, msg.sender, true);
    }

    //END OF EMPLOYEE SMART CONTRACT


    //SMART CONTRACT FUNCTION LEAVE smart contract function to manage leave records

     function createLeave(string memory _employeename,string memory _leavetype,
    string memory _startdate,string memory _enddate) public {

        // Require a valid employee name
        require(bytes(_employeename).length > 0);

        // Require a valid leave type
        require(bytes(_leavetype).length > 0);

         // Require a valid start date
        require(bytes(_startdate).length > 0);

        // Require a valid end date
        require(bytes(_enddate).length > 0);

        // Increase the leave count
        leaveCount ++;

        // Create the leave record
        leaveRecords[leaveCount] = Leave(leaveCount, _employeename,_leavetype,_startdate,
        _enddate);
        
        // Trigger an event to note leave creation to listeners
        emit LeaveCreated(leaveCount, _employeename,_leavetype,_startdate,
        _enddate);
    }

    //END OF LEAVE SMART CONTRACT



    //SMART CONTRACT FUNCTION PAYROLL smart contract function to manage payroll records

     function createPayroll(string memory _employeename,string memory _employeelevel, string memory _amount, 
     string memory _benefitsamount, string memory _payday) public {
        
        // Require a valid employee name
        require(bytes(_employeename).length > 0);

        // Require a valid employee level
        require(bytes(_employeelevel).length > 0);

        // Require a valid amount
        require(bytes(_amount).length > 0);

        // Require a valid benefit amount
        require(bytes(_benefitsamount).length > 0);


        // Increase the payroll count
        payrollCount ++;

        // Create the payroll record
        payrollRecords[payrollCount] = Payroll(payrollCount, _employeename,_employeelevel,_amount,
        _benefitsamount,_payday);

        emit PayrollCreated(payrollCount, _employeename,_employeelevel,_amount,
        _benefitsamount,_payday);
        
    }

    //END OF  payroll CONTRACT



    //SMART CONTRACT FUNCTION RECRUITMENT smart contract function to manage recruitment records

     function createRecruitment(string memory _fullname,string memory _position,string memory _age,
     string memory _homeaddress,string memory _currentcompany,string memory _currentposition) public {
        
        // validations

        // Require a valid fullname
        require(bytes(_fullname).length > 0);

        // Require a valid Job position
        require(bytes(_position).length > 0);

        // Require a valid homeaddress
        require(bytes(_homeaddress).length > 0);

        // Require a valid current company
        require(bytes(_currentcompany).length > 0);

        // Increase the recruitment count
        recruitmentCount ++;
        // Create the recruitment record
        recruitmentRecords[recruitmentCount] = Recruitment(recruitmentCount, _fullname,_position,_age,
        _homeaddress,_currentcompany,_currentposition);
        // Trigger an event
        emit RecruitmentCreated(recruitmentCount, _fullname,_position,_age,
        _homeaddress, _currentcompany, _currentposition);
        
    }

    //END OF Recruitment  CONTRACT


    //SMART CONTRACT FUNCTION EXIT AND RETIREMENT smart contract function to manage eretirement records
     function createEretirement(string memory _employeename,string memory _workstartdate,
     string memory _workendate, string memory _lastlevel, string memory _benefitsamount,
    string memory _lastworkdate) public { 
         // Require a valid employee fullname
        require(bytes(_employeename).length > 0);

        // Require a valid start date
        require(bytes(_workstartdate).length > 0);

        // Require a valid work end date
        require(bytes(_workendate).length > 0);

        // Require a valid level
        require(bytes(_lastlevel).length > 0);

        // Require a valid benefits amount
        require(bytes(_benefitsamount).length > 0);

        // Require a valid last work date 
        require(bytes(_lastworkdate).length > 0);

        // Increase the eretirement count
        eretirementCount ++;
        // Create the eretirment record
        eretirementRecords[eretirementCount] = Eretirement(eretirementCount,_employeename,_workstartdate,
         _workendate,_lastlevel,_benefitsamount,_lastworkdate);

         emit ERetirementCreated(eretirementCount, _employeename,_workstartdate,_workendate,
        _lastlevel, _benefitsamount, _lastworkdate);
        
    }

    //END OF ERetirement  CONTRACT
    
}