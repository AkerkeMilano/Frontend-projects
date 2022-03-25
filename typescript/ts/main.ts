import Product from "./Product";
import ProductList from "./ProductList";


alert("Добро пожаловать на программу учета товара 'Аукцион'");
const productList: ProductList = new ProductList();
const quantityOfProducts: number = parseInt(<string>prompt("Введите количество товаров для участия на аукционе: "));

for (let i=0; i<quantityOfProducts; i++){
    const productName: string = <string>prompt(`Введите данные для продукта №${i+1}:
Введите имя продукта`);
    const productPrice: number = parseInt(<string>prompt("Введите цену продукта"));
    const newProduct: Product = new Product(productName, productPrice);
    newProduct.id = i + 1;
    productList.addProduct(newProduct)
}

const numberOfProductFromList: number = parseInt(<string>prompt(`Введите номер товара: 
${productList.printAllProducts()}`));
for(let currentProduct of productList.productList){
    if(currentProduct.id === numberOfProductFromList){
        while(true){
            const userInput: string | null = prompt(`Текущая информация по товару:
${currentProduct.printAllInfo()}
Выберите действие:
1. Встать на аукцион
2. Поднять цену
3. Выдать победителю
4. Снять с торгов
5. Закончить торги`); 
        
            const actionFromUser: number = parseInt(<string>userInput);
            
            switch(actionFromUser){
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
            if(userInput === null || actionFromUser === 5){
                break;
            }
        }
        
    }
}