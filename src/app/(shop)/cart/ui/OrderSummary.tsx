'use client';

import { useCartStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);

    const { itemsInCart, subtotal, taxes, total }  = useCartStore( state => state.getSummaryInformation() );

    useEffect(() => {
        setLoaded( true );
    }, []);

    if( !loaded ) return <p>Loading...</p>
    

    return (
        <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">{ itemsInCart } artículos</span>

                <span>Subtotal</span>
                <span className="text-right">{ currencyFormat(subtotal) }</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{ currencyFormat(taxes) }</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">{ currencyFormat(total) }</span>
            </div>
            <div className="mt-5 mb-2 w-full">
                <Link
                    className="flex btn-primary justify-center"
                    href="/checkout/address">
                    Checkout
                </Link>
            </div>
      </div>
    )
}
