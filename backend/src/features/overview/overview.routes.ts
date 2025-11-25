import {Router} from 'express'
import { getPresentEmployeesController, getTotalEmployeesController } from './overview.controller';

const overviewRouter = Router();

overviewRouter.get('/totalEmployees', getTotalEmployeesController); 
overviewRouter.get('/totalPresentEmployees/:date', getPresentEmployeesController); 

export default overviewRouter;