import { instance as axios } from "./axios";

export async function getCoupons(token, setCouponsList) {
    try {
        const response = await axios.get("/coupon/list", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        if(response.data.status === true) {
            console.log(response.data);
            setCouponsList(response.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getVouchers(token, setVouchersList) {
    try {
        const response = await axios.get("/voucher/list", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        if(response.data.status === true) {
            console.log(response.data);
            setVouchersList(response.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateCouponSequence(token, couponIds) {
    try {
        const response = await axios.put("/coupon/update-sequence", {
            couponIds
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (response.data.status === true) {
            console.log(response.data);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateVoucherSequence(token, voucherIds) {
    try {
        const response = await axios.put("/voucher/update-sequence", {
            voucherIds
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (response.data.status === true) {
            console.log(response.data);
        }
    } catch (error) {
        console.error(error);
    }
}