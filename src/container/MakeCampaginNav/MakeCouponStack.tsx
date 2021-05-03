import React, { useEffect, useState } from 'react'
import { Coupon, MakeCampaginStackParamList, MakeCoupon } from '@types';
import { makeCampaginNavigation } from '../../navigation/useNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { perventGoBack, useSubmit } from '../../useHook';
import { isEditCoupon } from '../../util';

import { ScrollWrapper, SubmitButton } from '../../atoms';
import CouponBaseInputs from '../../components/MakeCouponStack/CouponBaseInputs';
import AddCouponGoods from '../../components/MakeCouponStack/AddCouponGoods';
import EndDatePicker from '../../components/MakeCouponStack/EndDatePicker';
import PaymentConditionPicker from '../../components/MakeCouponStack/PaymentConditionPicker';

const MakeCouponStack = () => {
    const campaginNav = makeCampaginNavigation();
    const nav = useNavigation();
    const { params: { coupon, editIndex, pinPointList } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakeCouponStack'>>();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [couponImgs, setCouponImgs] = useState<string[]>([]);
    const [limit, setLimit] = useState("");
    const [goods, setGoods] = useState<string[]>([]);
    const [endDate, setEndDate] = useState(new Date());
    // -1 : 캠페인 클리어, 값: pinPointList index
    const [paymentCondition, setPaymentCondition] = useState(-1);

    useEffect(() => {
        if (coupon === undefined) return

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "쿠폰 수정하기" })

        setName(coupon.name)
        setDescription(coupon.description);
        setCouponImgs(coupon.imgs);
        setEndDate(new Date(coupon.endDate));
        setGoods(coupon.goods);
        setLimit(coupon.limit);
    }, [coupon])

    const getCoupon: () => MakeCoupon = () => {
        return {
            name,
            description,
            endDate: endDate.toISOString(),
            limit,
            goods,
            imgs: couponImgs,
            paymentCondition
        }
    }

    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: () => {
            campaginNav.navigate("MakeCampaginStack", { coupon: getCoupon(), editIndex })
        }
    });
    const hasUnsavedChanges = Boolean(coupon ? isEditCoupon(coupon, getCoupon())
        : name || description || limit || couponImgs.length
    ) && !isSubmit;
    perventGoBack({ hasUnsavedChanges });

    return (
        <ScrollWrapper>
            <CouponBaseInputs
                useName={[name, setName]}
                useDescription={[description, setDescription]}
                useCouponImgs={[couponImgs, setCouponImgs]}
                useLimit={[limit, setLimit]}
            />
            <AddCouponGoods useGoods={[goods, setGoods]} />
            <EndDatePicker useEndDate={[endDate, setEndDate]} />
            <PaymentConditionPicker 
                pinPointList={pinPointList} 
                usePaymentCondition={[paymentCondition, setPaymentCondition]}
            />

            <SubmitButton title={editIndex !== undefined ? "쿠폰 수정하기" : "쿠폰 추가하기"} onPress={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakeCouponStack;