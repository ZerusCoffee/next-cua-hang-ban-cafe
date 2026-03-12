'use client'
import { Product } from '@/types/product.type';
import OptionCard from './option-card';
import ProductSummary from './product-summary';
import { buildInitialState, optionReducer, useGetOptions } from '@/hooks/use-option';
import Loading from '@/app/loading';
import { useEffect, useReducer, useState } from 'react';



export default function ActionSection({ product }: { product: Product }) {
    const { data, isLoading } = useGetOptions(product.slug);

    const optionGroups = data?.data;


    const [state, dispatch] = useReducer(optionReducer, {})
    const [quantity, setQuantity] = useState(1)

    // console.log(state)

    useEffect(() => {
        if (optionGroups) {
            dispatch({
                type: "INIT",
                payload: buildInitialState(optionGroups)
            });
        }
    }, [optionGroups]);

    if (isLoading || !product) {
        return <Loading />
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* Options Card - chiếm 2/3 width */}
            <OptionCard
                optionGroups={optionGroups || []}
                optionState={state}
                dispatch={dispatch}
            />

            {/* Order Card - chiếm 1/3 width còn lại */}
            <ProductSummary
                basePrice={product.price}
                optionGroups={optionGroups || []}
                optionState={state}
            />
        </div>
    )
}
