const roots = {
  postRoot: '/post',
};

export const routes = {
  root: '/api/v1',
  swagger: 'api/v1/docs',
  post: {
    root: roots.postRoot,
    create: '/create',
    update: '/update/:id',
    delete: '/delete/:id',
    find: 'find',
    findOne: 'one',
  },
};
