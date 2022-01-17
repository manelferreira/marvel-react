import Money from "./Money";

class ComicSummary
{
    id: number;
    name: string;
    imageUrl: string;
    price: Money;
    description: string;
    isRare: boolean;

    constructor (id: number, name: string, imageUrl: string, price: number, description: string, isRare: boolean = false)
    {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = new Money(price);
        this.description = description;
        this.isRare = isRare;
    }
}

export default ComicSummary;