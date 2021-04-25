import Button from '@material-ui/core/Button';


//Types 
import { CartItemType } from '../../App';

// Styles 

import { Container , Rupee} from './style';

type Props = {
    item: CartItemType,
    handleAddtoCart: (clickedItem: CartItemType) => void
};

export const Item: React.FC<Props> = ({item, handleAddtoCart}) => {
    return(
        <Container>
            <img src={item.image} alt={item.title} />
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3><Rupee>&#8377;</Rupee>{item.price}</h3>
            </div>
            <Button onClick={() => handleAddtoCart(item)}>Add to Cart</Button>
        </Container>
    );
};