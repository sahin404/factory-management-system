
import Balance from "../balance/balance.model";
import Production from "../production/production.model";

interface SaleData {
  quantity: number;
}

// Sell product
export const sellProduct = async (data: SaleData) => {
  const { quantity } = data;

  const product = await Production.findOne();
  if (!product) throw new Error("No Product Found!");

  if (quantity > product.products) {
    throw new Error("Not enough stock to complete this sale!");
  }

  // Sale amount based on current price
  const saleAmount = quantity * product.price;

  // Update main balance
  const balance = await Balance.findOne();
  if (!balance) throw new Error("Balance record not found!");
  balance.balance += saleAmount;
  await balance.save();

  // Reduce stock
  product.products -= quantity;
  await product.save();

  return {
    soldQuantity: quantity,
    saleAmount,
    remainingStock: product.products,
    balance: balance.balance,
  };
};

