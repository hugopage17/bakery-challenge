# Bakery Challenge
This repository is for the Pivot Professional Learning coding challenge.

## Getting Started
Get started by first installing required dependencies using the command below.
```bash
npm install
```
To run unit test run the below command or refer to the github actions in this repository to examine unit testing within a CI environment.
All unit tests can be found in tests folder.
```bash
npm test
```
To build the application run the command below.
```bash
npm run build
```

## API
- [OrderService](#OrderService)
    - [Process Order](#ProcessOrder)
    - [Process Order From File](#ProcessOrderFromFile)
    - [Interfaces](#Interfaces)
- [ProductService](#ProductService)
    - [Calculate Total Price](#CalculateTotalPrice)
    - [Calculate Packs Required](#CalculatePacksRequired)
    - [Interfaces](#Interfaces)
- [InventoryService](#InventoryService)
    - [Get Product](#GetProduct)
    - [Interfaces](#Interfaces)

### OrderService
```typescript
import { OrderService } from "./src/services/order.service";
import { InventoryService } from "./src/services/inventory.service";

const orderService = new OrderService(new InventoryService());
```
#### ProcessOrder
Process order from orderLine argument as string line and returns the order output as string (e.g
    10 VS5 $17.98
    2 x 5 $8.99
).
```typescript
orderService.processOrder(orderLine: string) => string;
```

#### ProcessOrderFromFile
Reads order from file where file name is passed as an argument and returns the order output as string (e.g
    10 VS5 $17.98
    2 x 5 $8.99
).
```typescript
orderService.processOrderFromFile(orderFile: string) => Promise<string>;
```
#### Interfaces
```typescript
interface IOrderService {
    processOrder(orderLine: string): string;
    processOrderFromFile(orderFile: string): Promise<string>;
}
```
### ProductService
```typescript
import { Product } from "./src/services/product.service";
import productsConfig from "./src/products.json";

const product = new Product(productsConfig[0]);
```
#### CalculateTotalPrice
Calculate the total price of the order.
```typescript
product.calculateTotalPrice(totalPacks: Record<number, number>) => number;
```
#### CalculatePacksRequired
Calculate the amount of different pack sizes each required to fullfil order.
```typescript
product.calculatePacksRequired(amount: number, memo: { [key: number]: Record<number, number> | null } = {}) => number;
```

#### Interfaces
```typescript
interface IPack {
  size: number;
  price: number;
}

interface IProductBaseParams {
  code: string;
  name: string;
  packs: IPack[];
}

interface IProduct extends IProductBaseParams {
  calculateTotalPrice(packsRequired: Record<number, number>): number
  calculatePacksRequired(amount: number, memo?: { [key: number]: Record<number, number> | null }): Record<number, number> | null;
}
```
### InventoryService
```typescript
import { InventoryService } from "./src/services/inventory.service";

const inventoryService = new InventoryService();
```
#### GetProduct
Returns the requested product from the code string argument (e.g VS5, MB11, CF) or undefined if product not found from code.
```typescript
inventoryService.getProduct(code: string) => IProduct | undefined;
```
#### Interfaces
```typescript
interface IInventoryService {
    getProduct(code: string): IProduct | undefined;
}
```