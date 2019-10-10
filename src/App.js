import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Card, Image, Level, Column, Title, Button } from 'rbx';
import './ProductsContainer.css';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductsContainer = ({ products }) => (
  <Column.Group multiline className="ProductsContainer">
    {products.map(product =>
      <Column key={product.sku} size="one-quarter">
        <ProductCard product={product} />
      </Column>)}
  </Column.Group>
)

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
        <Title size="4">{product.title}</Title>
        <Title subtitle size="5">{product.description || 'Description N/A'}</Title>
        <Title subtitle size="5">${product.price.toFixed(2)}</Title>
        <Button.Group align="centered">
          {sizes.map(size => (
            <Button key={size} rounded color="light">{size}</Button>
          ))}
        </Button.Group>
      </Card.Content>
      <Level>
  
      </Level>
    </Card>
  );
}


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    // <ul>
    //   {products.map(product => <ProductCard key={product.sku} product={product} />)}
    //   {/* <li key={products.sku}>{product.title}</li>)} */}
    // </ul>
    <ProductsContainer products={products} />
  );
}

export default App;
