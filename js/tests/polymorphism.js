"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_compare_1 = require("./object-compare");
var typed_json_1 = require("../typed-json");
var Person = (function () {
    function Person(firstName, lastName) {
        if (firstName && lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
    __decorate([
        typed_json_1.JsonMember
    ], Person.prototype, "firstName", void 0);
    __decorate([
        typed_json_1.JsonMember
    ], Person.prototype, "lastName", void 0);
    Person = __decorate([
        typed_json_1.JsonObject
    ], Person);
    return Person;
}());
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(firstName, lastName, salary, joined) {
        var _this = _super.call(this, firstName, lastName) || this;
        if (salary && joined) {
            _this.salary = salary;
            _this.joined = joined;
        }
        return _this;
    }
    __decorate([
        typed_json_1.JsonMember
    ], Employee.prototype, "salary", void 0);
    __decorate([
        typed_json_1.JsonMember
    ], Employee.prototype, "joined", void 0);
    Employee = __decorate([
        typed_json_1.JsonObject
    ], Employee);
    return Employee;
}(Person));
var PartTimeEmployee = (function (_super) {
    __extends(PartTimeEmployee, _super);
    function PartTimeEmployee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typed_json_1.JsonMember
    ], PartTimeEmployee.prototype, "workHours", void 0);
    PartTimeEmployee = __decorate([
        typed_json_1.JsonObject
    ], PartTimeEmployee);
    return PartTimeEmployee;
}(Employee));
var Investor = (function (_super) {
    __extends(Investor, _super);
    function Investor(firstName, lastName, investAmount) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.investAmount = investAmount || 0;
        return _this;
    }
    __decorate([
        typed_json_1.JsonMember
    ], Investor.prototype, "investAmount", void 0);
    Investor = __decorate([
        typed_json_1.JsonObject
    ], Investor);
    return Investor;
}(Person));
var Company = (function () {
    function Company() {
        this.employees = [];
    }
    __decorate([
        typed_json_1.JsonMember
    ], Company.prototype, "name", void 0);
    __decorate([
        typed_json_1.JsonMember({ elements: Employee })
    ], Company.prototype, "employees", void 0);
    __decorate([
        typed_json_1.JsonMember
    ], Company.prototype, "owner", void 0);
    Company = __decorate([
        typed_json_1.JsonObject({ name: "company", knownTypes: [PartTimeEmployee, Investor] })
    ], Company);
    return Company;
}());
function test(log) {
    // Create a Company.
    var company = new Company();
    company.name = "Json Types";
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            company.owner = new Employee("John", "White", 240000, new Date(1992, 5, 27));
            break;
        case 1:
            company.owner = new Investor("John", "White", 1700000);
            break;
        case 2:
            company.owner = new PartTimeEmployee("John", "White", 160000, new Date(1992, 5, 27));
            company.owner.workHours = Math.floor(Math.random() * 40);
            break;
        default:
            company.owner = new Person("John", "White");
            break;
    }
    // Add employees.
    for (var j = 0; j < 20; j++) {
        if (Math.random() < 0.2) {
            var newPartTimeEmployee = new PartTimeEmployee("firstname_" + j, "lastname_" + j, Math.floor(Math.random() * 80000), new Date(Date.now() - Math.floor(Math.random() * 80000)));
            newPartTimeEmployee.workHours = Math.floor(Math.random() * 40);
            company.employees.push(newPartTimeEmployee);
        }
        else {
            company.employees.push(new Employee("firstname_" + j, "lastname_" + j, Math.floor(Math.random() * 80000), new Date(Date.now() - Math.floor(Math.random() * 80000))));
        }
    }
    typed_json_1.TypedJSON.config({
        enableTypeHints: true
    });
    var json = typed_json_1.TypedJSON.stringify(company);
    var reparsed = typed_json_1.TypedJSON.parse(json, Company);
    if (log) {
        console.log("Test: polymorphism...");
        console.log(company);
        console.log(JSON.parse(json));
        console.log(reparsed);
        console.log("Test finished.");
    }
    return object_compare_1.isEqual(company, reparsed);
}
exports.test = test;
