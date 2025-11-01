import Production from "./production.model";

// add product
export const addProduct = async (num: number) => {
  let product = await Production.findOne();
  if (!product) {
    product = new Production({ products: num });
  } else {
    product.products += num;
  }
  await product.save();

  return product;
};

// get product
export const getProduct = async () => {
  const product = await Production.findOne();
  if (!product) throw new Error("No Product Found!");

  return product;
};

// update price
export const updatePrice = async (newPrice: number) => {
  const product = await Production.findOne();
  if (!product) throw new Error("No Product Found!");

  product.price = newPrice;
  await product.save();
  return product;
};
