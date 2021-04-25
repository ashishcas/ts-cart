import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';


import { Container, ProgressHolder, StyledIcon } from "./style";

import { Item } from "./components/Item/index";

import { Cart } from "./components/Cart";

export type CartItemType = {
  id: number;
  category: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  description: string;
}

const getProducts = async(): Promise<CartItemType[]> => 
  await ( await fetch('https://fakestoreapi.com/products')).json()


function App() {

  
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading , error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => items.reduce( (ack: number , item) =>  ack+item.amount, 0);

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {

        console.log({ack});
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleAddtoCart = (clickedItem : CartItemType) => {
    setCartItems(prev => {
      const isItemExists = prev.find(item => item.id === clickedItem.id);

      if(isItemExists){
        return prev.map(item => 
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            item.id === clickedItem.id
            ? {...item, amount: item.amount+1}
            : item
          )  
      }
      return [...prev, {...clickedItem, amount: 1}]
    });
  };

  if(error){
    return (<div>Something went wrong</div>);
  }

  return (
    isLoading ? 
    (
      <ProgressHolder >
        <LinearProgress />
      </ProgressHolder>
    )
    :
    (
      <>
      <Container>
        <Drawer  anchor="right" open={openCart}  onClose={ () => setOpenCart(false) }>
          <Cart 
          cartItems={cartItems} 
          addtoCart={handleAddtoCart} 
          removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledIcon  onClick={() => {setOpenCart(true)}}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
          </Badge>
        </StyledIcon>
        <Grid container spacing={3}>
          {
            data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item  item={item} handleAddtoCart={handleAddtoCart}/>
              </Grid>
            ))
          }

        </Grid>
      </Container>
      </>
    )
  );
}

export default App;
