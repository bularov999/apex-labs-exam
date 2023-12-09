const roots = {
  authRoot: '/auth',
};

export const routes = {
  root: '/api/v1',
  swagger: 'api/v1/docs',
  auth: {
    root: roots.authRoot,
    login: '/login',
    register: '/register',
    validate: '/validate',
    refreshToken: '/refresh-token',
  },
};
