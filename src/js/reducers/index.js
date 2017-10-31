import { combineReducers } from 'redux';
import header from './header';
import page from './page';
import external from './external';
import block from './block';
import leftmenu from './leftmenu';
import imagelibrary from './imagelibrary';
import fileop from './fileop';
import stylepanel from './stylepanel';

const rootReducer = combineReducers({
  header,
  page,
  external,
  block,
  leftmenu,
  stylepanel,
  imagelibrary,
  fileop
});

export default rootReducer;