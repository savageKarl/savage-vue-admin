import { about } from './modules/about';
import { permission } from './modules/permission';
import { dashboard } from './modules/dashboard';
import { editor } from './modules/editor';
import { error } from './modules/error';
import { login } from './modules/login';

export const routes = [
  ...dashboard,
  ...permission,
  ...editor,
  ...error,
  ...about,
  ...login,
];