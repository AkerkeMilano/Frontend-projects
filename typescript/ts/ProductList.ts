import Product from "./Product";

class ProductList {
    productList: Product[] = [];
    public printAllProducts = (): string => {
        let message: string = `${'№'.padEnd(4)}| ${'Продукт'.padEnd(10)}`;
        for(let product of this.productList){
            message += product.printInfo();
        }
        return message;
    }
    public addProduct = (newProduct: Product): void => {
        this.productList.push(newProduct);
    }
}

export default ProductList;