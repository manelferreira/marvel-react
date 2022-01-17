import _ from "lodash";
import Coupon from "../../models/Coupon";
import baseCouponClient from "./baseCouponClient";

const applyCoupon = async (code: string) : Promise<{ success: boolean, coupon: Coupon | undefined }> => {
    const coupons = await getCouponsOnApi();

    var coupon = _.find(coupons, {code: code});

    if (coupon)
        return { success: true, coupon: new Coupon(coupon.id, coupon.fee, coupon.code) }

    return { success: false, coupon: undefined };
}

const getCoupons = async () : Promise<Coupon[]> => {
    const coupons = await getCouponsOnApi();

    let result = coupons.map((coupon) => {
        return new Coupon(coupon.id, coupon.fee, coupon.code);
    })

    return result;
}

const getCouponsOnApi = async () => {
    var response = await baseCouponClient
        .get<{id: number, fee: number, code: string}[]>(`/coupons`);

    return response.data;
}

export { applyCoupon, getCoupons };