import Fastify from 'fastify';
import { formRoutes } from './modules/form/form.routes';

const app = Fastify({
    logger: true,
});

// Enregistrement des routes
app.register(formRoutes, { prefix: '/api' });

export default app;