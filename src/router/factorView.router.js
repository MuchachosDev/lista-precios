import {
  addFactorPage,
  editFactorPage,
  manageFactorsPage,
} from '../controller/factorView.controller.js';
import RouterBase from './index.js';

export default class FactorViewRouter extends RouterBase {
  init() {
    this.get('/add-factor', ['MANAGER'], addFactorPage);
    this.get('/manage-factors', ['MANAGER'], manageFactorsPage);
    this.get('/edit-factor/:fid', ['MANAGER'], editFactorPage);
  }
}
