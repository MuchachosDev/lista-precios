import {
  addFactor,
  deleteFactor,
  editFactor,
} from '../controller/factor.controller.js';
import RouterBase from './index.js';

export default class FactorRouter extends RouterBase {
  init() {
    this.post('/', ['MANAGER'], addFactor);
    this.put('/:fid', ['MANAGER'], editFactor);
    this.delete('/:fid', ['MANAGER'], deleteFactor);
  }
}
