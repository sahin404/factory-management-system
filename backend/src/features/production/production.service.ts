import Production from "./production.model";

// get product
export const getProduct = async (searchQuery?:string) => {
  const filter = searchQuery? { name: { $regex: searchQuery, $options: "i" } } : {};
  const products = await Production.find(filter);
  if (!products) throw new Error("No Product Found!");

  return products;
};

