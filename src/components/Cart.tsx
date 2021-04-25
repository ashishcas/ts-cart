
//Types 
import { CartItemType } from '../App';

// Styles 
import { Wrapper, Rupee } from './style';


import { CartItem } from './CartItem';

type Props = {
    cartItems: CartItemType[],
    addtoCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
}

export const Cart : React.FC<Props> = ({cartItems, addtoCart, removeFromCart}) => {

    const caluculateTotal = ( item: CartItemType[]) => {
      return (item.reduce((ack: number, item) =>  ack +item.amount * item.price, 0));
    }
    return(
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 && (<p>No items in cart</p>)}
            {cartItems.map(item => (
                <CartItem 
                   key={item.id}
                   item={item}
                   addtoCart={addtoCart}
                   removeFromCart={removeFromCart} 
                />
            ))}
            <h2>Total :  <Rupee>&#8377;</Rupee>{(caluculateTotal(cartItems)).toFixed(2)}</h2>
        </Wrapper>
    )
}
