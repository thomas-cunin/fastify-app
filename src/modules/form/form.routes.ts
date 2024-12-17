// file: form.routes.ts
import { FastifyInstance } from 'fastify';
import { getForms,createForm,getFormById } from './form.controller';

export async function formRoutes(app: FastifyInstance) {
    app.get('/forms', getForms);

    app.post('/form',{
        schema: {
            body: {
                type: 'object',
                    required: ['title'],
                    properties: {
                    title: { type: 'string', minLength: 1 },
                },
            },
            response: {
                201: {
                    type: 'object',
                        properties: {
                        id: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        title: { type: 'string' },
                    },
                },
            },
        },
    }, createForm);

    app.get('/form/:id', {
        schema: {
            params: {
                type: 'object',
                    required: ['id'],
                    properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'object',
                        properties: {
                        id: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        title: { type: 'string' },
                    },
                },
            },
        },
    }, getFormById);
}