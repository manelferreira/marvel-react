class Coupon
{
    id: number;
    fee: number;
    code: string;

    constructor(id: number, fee: number, code: string)
    {
        this.id = id;
        this.fee = fee;
        this.code = code;
    }

    applyOverAmount(amount: number)
    {
        return Math.floor(amount * (1 - this.fee));
    }

    get formattedFee() {
        return `${this.fee * 100}%`;
    }
}

export default Coupon;