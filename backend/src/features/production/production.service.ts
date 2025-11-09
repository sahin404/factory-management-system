import Production from "./production.model";
import { UpdateData } from "./production.types";

// get product
export const getProduct = async (searchQuery?:string, page:number=1) => {
  const filter = searchQuery? { name: { $regex: searchQuery, $options: "i" } } : {};

  const limit = 5;
  const products = await Production.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Production.countDocuments(filter);
  if (!products) throw new Error("No Product Found!");

  return {products,total};
};


// get a Product by id
export const getProductById = async(productId:string)=>{
  const product = await Production.findById(productId);
  return product;
}

// update a product
export const updateProduct = async (productId: string, updateData: UpdateData) => {
  const updatedProduct = await Production.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};