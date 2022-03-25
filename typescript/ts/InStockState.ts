import State from "./State";
import ForSaleState from "./ForSaleState";

class InStockState extends State {
    constructor(){
        super();
        this.stateName = "На складе";
    }
    public raisePrice(): void {
        console.log(`Ошибка! Продукт еще не участвует в торгах. Состояние продукта ${this.stateName}`);
    }
    public setUp(): void {
        this.product.changeState(new ForSaleState());
        console.log(`Поздравляю, вы успешно начали торги!`);
    }
    public giveToTheWinner(): void {
        console.log(`Ошибка! Нельзя отдать продукт сразу со склада. Состояние продукта ${this.stateName}`);
    }
    public setOff(): void {
        console.log(`Ошибка! Нельзя снять с торгов продукт, который в них не участвует. Состояние продукта ${this.stateName}`);
    }
}

export default InStockState;