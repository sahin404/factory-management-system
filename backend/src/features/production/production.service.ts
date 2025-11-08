import Production from "./production.model";

// get product
export const getProduct = async () => {
  const products = await Production.find();
  if (!products) throw new Error("No Product Found!");

  return products;
};

