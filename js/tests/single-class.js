"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typed_json_1 = require("../typed-json");
var Person = (function () {
    function Person() {
    }
    Person.prototype.getFullname = function () {
        return this.firstName + " " + this.lastName;
    };
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
function test(log) {
    var person = typed_json_1.TypedJSON.parse('{ "firstName": "John", "lastName": "Doe" }', Person);
    person instanceof Person; // true
    person.getFullname(); // "John Doe"
    return person.getFullname() === "John Doe" && person instanceof Person;
}
exports.test = test;
