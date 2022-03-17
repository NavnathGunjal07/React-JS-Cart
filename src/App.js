import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from "firebase"

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading : true
    }

    this.db = firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }

  componentDidMount(){
    this.db 
    .collection("Products")
    .onSnapshot((snapshot)=>{
      const products =  snapshot.docs.map((doc)=>{
       let data = doc.data();
       data['id'] = doc.id;
       return data;
       })
       this.setState({
         products,
         loading:false
       });
    });
    
  }
// add data to firebase
  addProduct = () => {
    this.db 
    .collection("Products")
    .add({
      img: '',
      price:900,
      qty:8,
      title: "Washing machine"
    })
    .then((docRef) => {
      console.log("Product has been added ", docRef);

    })
    .catch((error)=>{
      console.log("Error", error);
    })
  }
  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })
//updating quantity in firebase
    const docRef = this.db.collection("Products").doc(products[index].id);
    docRef.update({
      qty:products[index].qty+1
    })
    .then(() =>{
      console.log("Product quantity increased successfully");
    })
    .catch((error)=>{
      console.log("Error", error);
    });
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    //updating quantity in firebase store
    const docRef = this.db.collection("Products").doc(products[index].id);
    docRef.update({
      qty:products[index].qty-1
    })
    .then(() =>{
      console.log("Product quantity decrease successfully");
    })
    .catch((error)=>{
      console.log("Error", error);
    });
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })

    //deleting product from firebase
     //updating quantity in firebase store
     const docRef = this.db.collection("Products").doc(id);

     docRef
     .delete()
     .then(() =>{
      console.log("Product deleted successfully");
    })
    .catch((error)=>{
      console.log("Error", error);
    });
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })

    return cartTotal;
  }
  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20, fontSize:10}}>Add a Product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading&&<h1>Loading products...</h1>}
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
