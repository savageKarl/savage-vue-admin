import { about } from './modules/about';
import { permission } from './modules/permission';
import { dashboard } from './modules/dashboard';
import { editor } from './modules/editor';
import { error } from './modules/error';
import { login } from './modules/login';
import {map} from './modules/map';

export const routes = [
  ...dashboard,
  ...map,
  ...permission,
  ...editor,
  ...error,
  ...about,
  ...login,
];