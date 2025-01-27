import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  if (request.body.toLowerCase().includes('fuck')) {
    return reply.status(403).send('unresolved');
  } else {
    return reply.send(request.body.toUpperCase());
  }
});

fastify.post('/lowercase', (request, reply) => {
  if (request.body.toLowerCase().includes('fuck')) {
    return reply.status(403).send('unresolved');
  } else {
    return reply.send(request.body.toLowerCase());
  }
});

fastify.get('/user/:id', (request, reply) => {
  const {id } = request.params;

  if (id in users) {
    return reply.send(users[id]);
  } else {
    return reply.status(400).send('User not exist');
  }
});

fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;

  if (!filter || !value) {
    return reply.send(Object.values(users));
  }
  const result = Object.values(users).filter((users) => String(users[filter]) === value);
  return reply.send(result);
});

export default fastify;
