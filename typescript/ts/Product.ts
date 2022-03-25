import State from "./State";
import InStockState from "./InStockState";
import Generator from "./Generator";
import { GoldGenerator } from "./Generator";
import { SilverGenerator } from "./Generator";
import { BronzeGenerator } from "./Generator";

class Product{
    private _id!: number;
    private _name: string;
    private _price: number;
    private _honoraryCode!: string;
    private _state!: State;
    constructor(name: string, price: number){
        this._name = name;
        this._price = price;
        this.changeState(new InStockState());
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number){
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string){
        this._name = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number){
        this._price = value;
    }
    public changeState(state: State): void {
        this._state = state;
        this._state.setProduct(this);
    }
    public raisePrice(): void {
        this._state.raisePrice();
    }
    public setUp(): void {
        this._state.setUp();
    }
    public giveToTheWinner(): void{
        this._state.giveToTheWinner();
    }
    public setOff(): void {
        this._state.setOff();
    }
    public printInfo(): string{
        return `\n${this._id.toString().padEnd(5)} | ${this._name.padEnd(10)}`;
    }
    public printAllInfo(): string {
        return `№${this._id} ${this._name}, цена - ${this._price}, состояние - ${this._state.stateName}`;
    }
    public generateHonoraryCode(){
        const generator: Generator = new Generator();
        let codeType: string = "";
        if(this._price >= 1000){
            generator.setStrategy(new GoldGenerator());
            codeType = "Gold"

        } else if (this._price >= 500 && this._price < 1000){
            generator.setStrategy(new SilverGenerator());
            codeType = "Silver";
        } else if(this._price < 500){
            generator.setStrategy(new BronzeGenerator());
            codeType = "Bronze";
        }
        this._honoraryCode = generator.execute(this._id, generator);
        console.log(`Для товара сгенерирован почетный код ${codeType} - ${this._honoraryCode}`);
    }
}

export default Product;