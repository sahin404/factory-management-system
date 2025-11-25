import {Router} from 'express'
import { getTotalEmployeesController } from './overview.controller';

const overviewRouter = Router();

overviewRouter.get('/totalEmployees', getTotalEmployeesController); 

export default overviewRouter;