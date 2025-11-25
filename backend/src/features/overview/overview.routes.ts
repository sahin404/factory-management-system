import {Router} from 'express'
import { getPresentEmployeesController, getProductsStockController, getSalaryStatusController, getSalesController, getTotalEmployeesController } from './overview.controller';

const overviewRouter = Router();

overviewRouter.get('/totalEmployees', getTotalEmployeesController); 
overviewRouter.get('/totalPresentEmployees/:date', getPresentEmployeesController);
overviewRouter.get('/salaryStatus/:month', getSalaryStatusController);
overviewRouter.get('/productsStock', getProductsStockController);
overviewRouter.get("/getSales", getSalesController);

export default overviewRouter;