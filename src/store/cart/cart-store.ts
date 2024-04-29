import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State{
    cart: CartProduct[];
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subtotal: number;
        total: number;
        taxes: number;
        itemsInCart: number;
    };
    addProductToCart: ( product: CartProduct ) => void;
    updateProductQuantity: (  product: CartProduct, quantity: number ) => void;
    removeProduct: ( product: CartProduct ) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
            //Methods 
            getTotalItems: () => {
                const { cart } = get();
                const total =  cart.reduce( ( total, productInCart ) => total + productInCart.quantity, 0 );
                return total;
            },
            addProductToCart: ( product: CartProduct ) => {
                const { cart } = get();
                const productInCart = cart.some( 
                    (productCart) => productCart.id === product.id  &&  productCart.size === product.size
                );
    
                if( !productInCart ){
                    set({ cart: [...cart, product] });
                    return;
                }
    
                const updatedCartProducts = cart.map( (productCart) => {
                        if( productCart.id === product.id  &&  productCart.size === product.size ){
                            return {
                                ...productCart,
                                quantity: productCart.quantity + product.quantity
                            }
                        }
                        return productCart;
                    }
                );
                set({ cart: updatedCartProducts });
            },
            updateProductQuantity: ( product: CartProduct, quantity: number ) => {
                const { cart } = get();
    
                const updatedCartProducts = cart.map( (productCart) => {
                        if( productCart.id === product.id  &&  productCart.size === product.size ){
                            return { ...productCart, quantity }
                        }
                        return productCart;
                    }
                );
                set({ cart: updatedCartProducts });
            },
            removeProduct: ( product: CartProduct ) => {
                const { cart } = get();
    
                const updatedCartProducts = cart.filter( 
                    (productCart) => productCart.id !== product.id  ||  productCart.size !== product.size
                );
                set({ cart: updatedCartProducts });
            },
            getSummaryInformation: () => {
                const { cart } = get();

                const subtotal = cart.reduce( ( subTotal, productInCart ) => subTotal + (productInCart.quantity * productInCart.price), 0 );
                const taxes = subtotal * 0.15;
                const total = subtotal + taxes;
                const itemsInCart =  cart.reduce( ( total, productInCart ) => total + productInCart.quantity, 0 );

                return {
                    subtotal,
                    total,
                    taxes,
                    itemsInCart
                }
            }
        }), 
        {
            name: 'shopping-cart',
        }
    )
)