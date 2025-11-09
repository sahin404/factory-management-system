import Production from "../production/production.model";
import Sale from "./sales.model";


//add sales
export const addSales = async (productId: string, salesNum: number) => {
  const product = await Production.findById(productId);
  if (!product) throw new Error("Product not found!");

  // Check sufficient stock
  if (product.quantity < salesNum) {
    throw new Error("Insufficient stock to complete sale!");
  }

  // change product table
  product.quantity -= salesNum;
  await product.save();

  // create newData
  const newData = {
    productId:product._id,
    quantity:salesNum,
    price:product.price,
    totalAmount:salesNum*product.price
  }

  // save the new data into database
  const data = new Sale(newData);
  data.save();
  return product;
};
