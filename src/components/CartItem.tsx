import Button from '@material-ui/core/Button';

//Types 
import { CartItemType } from '../App';

// Styles 

import { Container, Rupee } from './style';


type Props = {
    item: CartItemType,
    addtoCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
}

export const CartItem : React.FC<Props> = ({item, addtoCart, removeFromCart}) => {
    return(
        <Container>
            <div>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price : <Rupee>&#8377;</Rupee>{item.price}</p>
                    <p>Total : <Rupee>&#8377;</Rupee>{(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className='buttons'>
                    <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => removeFromCart(item.id)}
                    >
                    -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => addtoCart(item)}
                    >
                    +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Container>
    )
}