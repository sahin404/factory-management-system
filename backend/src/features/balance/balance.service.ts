import Balance from "./balance.model"

export const balance = async()=>{

    const result  = await Balance.findOne();
    if(!result){
        const newBalance = new Balance({balance:0});
        await newBalance.save();
        return newBalance;
    }
    return result;
}