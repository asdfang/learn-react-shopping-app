import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Card, Image, Level, Column, Title, Button } from 'rbx';
import Sidebar from 'react-sidebar';
import './ProductsContainer.css';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductCard = ({ product }) => {
  const src = "data/products/" + product.sku + "_1.jpg";
  return (
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={src} />
        </Image.Container>
      </Card.Image>
      <Card.Content textAlign="centered">
        <Title size="5">{product.title}</Title>
        <Title subtitle size="6">{product.description || 'Description N/A'}</Title>
        <Title subtitle size="5">${product.price.toFixed(2)}</Title>
        <Button className="add-button" color="dark">Add to Cart</Button>
      </Card.Content>
      <Level>
  
      </Level>
    </Card>
  );
};

const ProductsContainer = ({ products }) => (
  <Column.Group multiline className="ProductsContainer">
    {products.map(product =>
      <Column key={product.sku} size="one-quarter">
        <ProductCard product={product} />
      </Column>)}
  </Column.Group>
);

const findProduct = (sku, products) => {
  return products.filter(p => p.sku === sku)[0];
};

const CartCard = ({ product, products }) => {
  const src = "data/products/" + product.sku + "_2.jpg";
  const productInfo = findProduct(product.sku, products);
  return (
    <Card>
      <Card.Header>
        <Card.Header.Icon>
          <Image.Container>
            <Image src={src} />
          </Image.Container>
        </Card.Header.Icon>
      </Card.Header>
      <Card.Content>
        { productInfo.title } <br />
        Quantity: { product.count } <br />
        Total cost:  ${ (productInfo.price*product.count).toFixed(2) }
      </Card.Content>
    </Card>
  )
};

const Cart = ({ cartState, products }) => {
  const productsToDisplay = cartState.cartItems.filter(product => product.count > 0);
  console.log(productsToDisplay);
  return (
     <div>
     { productsToDisplay.map(product => <CartCard key={product.sku} product={product}
                                                  products={products} />) }
    </div>
  )
}

const CartContainer = ({ cartState, products }) => {
  const cartStyle = {
    sidebar: {
      background: "#222222",
      padding: 8,
      color: "white",
      width: 400,
    },
  };
  const [cartOpen, setCartOpen] = useState(false);
  return (
  <Sidebar sidebar={<Cart cartState={cartState} products={products}/>}
           pullRight={true}
           open={cartOpen}
           onSetOpen={setCartOpen}
           sidebarClassName={"cart"}
           styles={cartStyle}>
    <Button className="cart-button" color="black" size="large"
            onClick={() => setCartOpen(true)}>Cart</Button>
  </Sidebar>);
};

const SizeButtons = () => (
  <div className="size-buttons">
    <strong>Sizes:</strong>
    <Button.Group>
      {sizes.map(size => (
        <Button key={size} rounded color="light">{size}</Button>
      ))}
    </Button.Group>
  </div>
);

const App = () => {
  const [data, setData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
      const initialCart = [];
      Object.values(json).forEach(product => {
        initialCart.push({
          "sku": product["sku"],
          "count": 0 });
      });
      initialCart[0].count = 1;
      initialCart[1].count = 2;
      setCartItems(initialCart);
    };
    fetchProducts();
  }, []);

  return (
    <Column.Group>
      <Column size={3}><SizeButtons /></Column>
      <Column size={8}><ProductsContainer cartState={{cartItems, setCartItems}} products={products}/></Column>
      <Column size={1}><CartContainer cartState={{cartItems, setCartItems}} products={products}/></Column>
    </Column.Group>
  );
}

export default App;
