import State from "./State";
import SoldState from "./SoldState";
import InStockState from "./InStockState";

class ForSaleState extends State {
    constructor(){
        super();
        this.stateName = "На торгах";
    }
    public raisePrice(): void {
        this.product.price += 100;
        console.log(`Цена на продукт успешно повышена!`);
    }
    public setUp(): void {
        console.log(`Ошибка! Продукт не может быть повторно выставлен на торги. Состояние продукта ${this.stateName}`);
    }
    public giveToTheWinner(): void {
        if(this.product.price === 0){
            console.log(`Ошибка! Нельзя отдать продукт бесплатно.`);
        } else{
            this.product.changeState(new SoldState());
            console.log(`Поздравляю продукт продан!`);
            this.product.generateHonoraryCode();
        }
    }
    public setOff(): void {
        this.product.changeState(new InStockState());
        console.log(`Продукт возвращен на склад!`);
    }
}

export default ForSaleState;