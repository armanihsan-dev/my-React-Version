import React from './react';
import './App.css';
import render from './react-dom';
const div = (
  <div className="container" id="app" title="the-container">
    {'hello'} <b>world</b>
  </div>
);
const div2 = <div>hello</div>;
const fruits = [
  'Apple',
  'Banana',
  'Orange',
  'Mango',
  'Strawberry',
  'Grapes',
  'Pineapple',
];
// function Card(props) {
//   return (
//     <div className="container">
//       {fruits.map((fruit, index) => {
//         return (
//           <ul key={index}>
//             <li>{fruit}</li>
//           </ul>
//         );
//       })}
//     </div>
//   );
// }
function Card({ title, image, brand, price }) {
  return (
    <div className="card">
      <img src={image} alt="iphone" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{brand}</p>
        <p>
          <b>${price}</b>
        </p>
      </div>
    </div>
  );
}

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    render(
      <div className="container">
        {data.products.map((product) => {
          return (
            <Card
              key={product.id}
              title={product.title}
              brand={product.brand}
              price={product.price}
              image={product.thumbnail}
            />
          );
        })}
      </div>,
      document.getElementById('root')
    );
  });
console.log(<Card />);
// render(
//   <Card>
//     <h1>Hi , first child</h1>
//     <span>Hi span</span>
//   </Card>,
//   document.getElementById('root')
// );
