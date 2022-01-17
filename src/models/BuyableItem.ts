import Money from "./Money";

interface BuyableItem
{
    id: number;
    name: string;
    imageUrl: string;
    price: Money;
}

export default BuyableItem;