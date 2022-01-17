class Money
{
    amount: number;
    currency: string;

    constructor(amount: number)
    {
        if (Number.isInteger(amount)) {
            this.amount = amount;
        } else {
            this.amount = amount * 100;
        }

        this.currency = "US$";
    }

    get formattedAmount() {
        return `${this.currency} ${this.amount/100}`;
    }
}

export default Money;