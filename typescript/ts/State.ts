import Product from "./Product";

abstract class State {
    protected product!: Product;
    stateName!: string;
    public setProduct(product: Product): void {
        this.product = product;
    }
    public abstract raisePrice(): void;
    public abstract setUp(): void;
    public abstract setOff(): void;
    public abstract giveToTheWinner(): void;
}

export default State;