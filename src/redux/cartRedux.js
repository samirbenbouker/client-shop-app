import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    emptyCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    deleteProduct: (state, action) => {
      const index = existProduct(state.products, action.payload.product)
      if(index !== false) {
        state.quantity -= 1;
        state.products.splice(existProduct(state.products, action.payload.product), 1)
        state.total -= action.payload.product.quantity * action.payload.product.price
      }
    },
    editProduct: (state, action) => {
      const index = existProduct(state.products, action.payload.product)
      const edit = action.payload.edit
      if(index !== false) {
        if(edit === "asc") {
          state.products[index] = {... state.products[index].quantity+1}
          state.total += action.payload.product.price
        } else {
          state.products[index] = {... state.products[index].quantity-1}
          state.total -= action.payload.product.price
        }
      }
    }
  },
});

const existProduct = (products, product) => {
  for(let i = 0; i < products.length; i++) {
    if(products[i]._id === product._id && products[i].quantity === product.quantity) {
      return i
    }
  }

  return false
}

export const { addProduct, emptyCart, deleteProduct, editProduct } = cartSlice.actions;
export default cartSlice.reducer;
