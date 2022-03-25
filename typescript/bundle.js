(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(require("./State"));
const SoldState_1 = __importDefault(require("./SoldState"));
const InStockState_1 = __importDefault(require("./InStockState"));
class ForSaleState extends State_1.default {
    constructor() {
        super();
        this.stateName = "На торгах";
    }
    raisePrice() {
        this.product.price += 100;
        console.log(`Цена на продукт успешно повышена!`);
    }
    setUp() {
        console.log(`Ошибка! Продукт не может быть повторно выставлен на торги. Состояние продукта ${this.stateName}`);
    }
    giveToTheWinner() {
        if (this.product.price === 0) {
            console.log(`Ошибка! Нельзя отдать продукт бесплатно.`);
        }
        else {
            this.product.changeState(new SoldState_1.default());
            console.log(`Поздравляю продукт продан!`);
            this.product.generateHonoraryCode();
        }
    }
    setOff() {
        this.product.changeState(new InStockState_1.default());
        console.log(`Продукт возвращен на склад!`);
    }
}
exports.default = ForSaleState;

},{"./InStockState":3,"./SoldState":6,"./State":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BronzeGenerator = exports.SilverGenerator = exports.GoldGenerator = void 0;
class Generator {
    setStrategy(strategy) {
        this._strategy = strategy;
    }
    execute(id, generator) {
        return this._strategy.execute(id, generator);
    }
    calculateMD5Hash(input) {
        const md5 = MD5(input);
        return md5;
    }
}
class GoldGenerator {
    constructor() {
        this.execute = (id, generator) => {
            return generator.calculateMD5Hash("Gold-" + id);
        };
    }
}
exports.GoldGenerator = GoldGenerator;
class SilverGenerator {
    constructor() {
        this.execute = (id, generator) => {
            return generator.calculateMD5Hash("Silver-" + id);
        };
    }
}
exports.SilverGenerator = SilverGenerator;
class BronzeGenerator {
    constructor() {
        this.execute = (id, generator) => {
            return generator.calculateMD5Hash("Bronze-" + id);
        };
    }
}
exports.BronzeGenerator = BronzeGenerator;
exports.default = Generator;

},{}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(require("./State"));
const ForSaleState_1 = __importDefault(require("./ForSaleState"));
class InStockState extends State_1.default {
    constructor() {
        super();
        this.stateName = "На складе";
    }
    raisePrice() {
        console.log(`Ошибка! Продукт еще не участвует в торгах. Состояние продукта ${this.stateName}`);
    }
    setUp() {
        this.product.changeState(new ForSaleState_1.default());
        console.log(`Поздравляю, вы успешно начали торги!`);
    }
    giveToTheWinner() {
        console.log(`Ошибка! Нельзя отдать продукт сразу со склада. Состояние продукта ${this.stateName}`);
    }
    setOff() {
        console.log(`Ошибка! Нельзя снять с торгов продукт, который в них не участвует. Состояние продукта ${this.stateName}`);
    }
}
exports.default = InStockState;

},{"./ForSaleState":1,"./State":7}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InStockState_1 = __importDefault(require("./InStockState"));
const Generator_1 = __importDefault(require("./Generator"));
const Generator_2 = require("./Generator");
const Generator_3 = require("./Generator");
const Generator_4 = require("./Generator");
class Product {
    constructor(name, price) {
        this._name = name;
        this._price = price;
        this.changeState(new InStockState_1.default());
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    changeState(state) {
        this._state = state;
        this._state.setProduct(this);
    }
    raisePrice() {
        this._state.raisePrice();
    }
    setUp() {
        this._state.setUp();
    }
    giveToTheWinner() {
        this._state.giveToTheWinner();
    }
    setOff() {
        this._state.setOff();
    }
    printInfo() {
        return `\n${this._id.toString().padEnd(5)} | ${this._name.padEnd(10)}`;
    }
    printAllInfo() {
        return `№${this._id} ${this._name}, цена - ${this._price}, состояние - ${this._state.stateName}`;
    }
    generateHonoraryCode() {
        const generator = new Generator_1.default();
        let codeType = "";
        if (this._price >= 1000) {
            generator.setStrategy(new Generator_2.GoldGenerator());
            codeType = "Gold";
        }
        else if (this._price >= 500 && this._price < 1000) {
            generator.setStrategy(new Generator_3.SilverGenerator());
            codeType = "Silver";
        }
        else if (this._price < 500) {
            generator.setStrategy(new Generator_4.BronzeGenerator());
            codeType = "Bronze";
        }
        this._honoraryCode = generator.execute(this._id, generator);
        console.log(`Для товара сгенерирован почетный код ${codeType} - ${this._honoraryCode}`);
    }
}
exports.default = Product;

},{"./Generator":2,"./InStockState":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductList {
    constructor() {
        this.productList = [];
        this.printAllProducts = () => {
            let message = `${'№'.padEnd(4)}| ${'Продукт'.padEnd(10)}`;
            for (let product of this.productList) {
                message += product.printInfo();
            }
            return message;
        };
        this.addProduct = (newProduct) => {
            this.productList.push(newProduct);
        };
    }
}
exports.default = ProductList;

},{}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(require("./State"));
class SoldState extends State_1.default {
    constructor() {
        super();
        this.stateName = "Продано";
    }
    raisePrice() {
        console.log("Ошибка! Продукт уже продан!");
    }
    setUp() {
        console.log("Ошибка! Продукт уже продан!");
    }
    giveToTheWinner() {
        console.log("Ошибка! Продукт уже продан!");
    }
    setOff() {
        console.log("Ошибка! Нельзя снять с торгов проданный продукт!");
    }
}
exports.default = SoldState;

},{"./State":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    setProduct(product) {
        this.product = product;
    }
}
exports.default = State;

},{}],8:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("./Product"));
const ProductList_1 = __importDefault(require("./ProductList"));
alert("Добро пожаловать на программу учета товара 'Аукцион'");
const productList = new ProductList_1.default();
const quantityOfProducts = parseInt(prompt("Введите количество товаров для участия на аукционе: "));
for (let i = 0; i < quantityOfProducts; i++) {
    const productName = prompt(`Введите данные для продукта №${i + 1}:
Введите имя продукта`);
    const productPrice = parseInt(prompt("Введите цену продукта"));
    const newProduct = new Product_1.default(productName, productPrice);
    newProduct.id = i + 1;
    productList.addProduct(newProduct);
}
const numberOfProductFromList = parseInt(prompt(`Введите номер товара: 
${productList.printAllProducts()}`));
for (let currentProduct of productList.productList) {
    if (currentProduct.id === numberOfProductFromList) {
        while (true) {
            const userInput = prompt(`Текущая информация по товару:
${currentProduct.printAllInfo()}
Выберите действие:
1. Встать на аукцион
2. Поднять цену
3. Выдать победителю
4. Снять с торгов
5. Закончить торги`);
            const actionFromUser = parseInt(userInput);
            switch (actionFromUser) {
                case 1:
                    currentProduct.setUp();
                    break;
                case 2:
                    currentProduct.raisePrice();
                    break;
                case 3:
                    currentProduct.giveToTheWinner();
                    break;
                case 4:
                    currentProduct.setOff();
                    break;
            }
            if (userInput === null || actionFromUser === 5) {
                break;
            }
        }
    }
}

},{"./Product":4,"./ProductList":5}]},{},[8]);
