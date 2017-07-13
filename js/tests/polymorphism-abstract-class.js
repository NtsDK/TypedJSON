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
var Node = (function () {
    function Node() {
    }
    __decorate([
        typed_json_1.JsonMember
    ], Node.prototype, "name", void 0);
    return Node;
}());
var SmallNode = (function (_super) {
    __extends(SmallNode, _super);
    function SmallNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typed_json_1.JsonMember
    ], SmallNode.prototype, "inputType", void 0);
    __decorate([
        typed_json_1.JsonMember
    ], SmallNode.prototype, "outputType", void 0);
    SmallNode = __decorate([
        typed_json_1.JsonObject
    ], SmallNode);
    return SmallNode;
}(Node));
var BigNode = (function (_super) {
    __extends(BigNode, _super);
    function BigNode() {
        var _this = _super.call(this) || this;
        _this.inputs = [];
        _this.outputs = [];
        return _this;
    }
    __decorate([
        typed_json_1.JsonMember({ elements: String })
    ], BigNode.prototype, "inputs", void 0);
    __decorate([
        typed_json_1.JsonMember({ elements: String })
    ], BigNode.prototype, "outputs", void 0);
    BigNode = __decorate([
        typed_json_1.JsonObject
    ], BigNode);
    return BigNode;
}(Node));
var Graph = (function () {
    function Graph() {
        this.nodes = [];
    }
    __decorate([
        typed_json_1.JsonMember({ elements: Node, refersAbstractType: true })
    ], Graph.prototype, "nodes", void 0);
    __decorate([
        typed_json_1.JsonMember({ refersAbstractType: true })
    ], Graph.prototype, "root", void 0);
    Graph = __decorate([
        typed_json_1.JsonObject({
            knownTypes: [BigNode, SmallNode]
        })
    ], Graph);
    return Graph;
}());
function randPortType() {
    var types = [
        "string",
        "integer",
        "float",
        "boolean",
        "void"
    ];
    return types[Math.floor(Math.random() * types.length)];
}
function test(log) {
    var graph = new Graph();
    for (var i = 0; i < 20; i++) {
        var node = void 0;
        if (Math.random() < 0.25) {
            var bigNode = new BigNode();
            bigNode.inputs = [
                randPortType(),
                randPortType(),
                randPortType()
            ];
            bigNode.outputs = [
                randPortType(),
                randPortType()
            ];
            node = bigNode;
        }
        else {
            var smallNode = new SmallNode();
            smallNode.inputType = randPortType();
            smallNode.outputType = randPortType();
            node = smallNode;
        }
        node.name = "node_" + i;
        if (i === 0) {
            graph.root = node;
        }
        else {
            graph.nodes.push(node);
        }
    }
    typed_json_1.TypedJSON.config({
        enableTypeHints: true
    });
    var json = typed_json_1.TypedJSON.stringify(graph);
    var clone = typed_json_1.TypedJSON.parse(json, Graph);
    if (log) {
        console.log("Test: polymorphism with abstract property types...");
        console.log(graph);
        console.log(JSON.parse(json));
        console.log(clone);
        console.log("Test finished.");
    }
    return object_compare_1.isEqual(graph, clone);
}
exports.test = test;
