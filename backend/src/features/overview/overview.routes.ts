import {Router} from 'express'
import { getPresentEmployeesController, getProductsStockController, getSalaryStatusController, getTotalEmployeesController } from './overview.controller';

const overviewRouter = Router();

overviewRouter.get('/totalEmployees', getTotalEmployeesController); 
overviewRouter.get('/totalPresentEmployees/:date', getPresentEmployeesController);
overviewRouter.get('/salaryStatus/:month', getSalaryStatusController);
overviewRouter.get('/productsStock', getProductsStockController);


export default overviewRouter;