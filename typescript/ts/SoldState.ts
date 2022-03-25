import State from "./State";
class SoldState extends State {
    constructor(){
        super();
        this.stateName = "Продано";
    }
    public raisePrice(): void {
        console.log("Ошибка! Продукт уже продан!");
    }
    public setUp(): void {
        console.log("Ошибка! Продукт уже продан!");
    }
    public giveToTheWinner(): void {
        console.log("Ошибка! Продукт уже продан!");
    }
    public setOff(): void {
        console.log("Ошибка! Нельзя снять с торгов проданный продукт!");
    } 
}

export default SoldState;