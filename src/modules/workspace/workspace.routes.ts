import { FastifyInstance } from 'fastify';
import {createWorkspace} from "./workspace.controller";

export async function workspaceRoutes(app: FastifyInstance) {
    app.get('/workspaces', async (request, reply) => {
        // @ts-ignore
        if (!request.isAdmin) {
            reply.code(403).send({ error: 'Forbidden' });
            return;
        }
        reply.send({ message: 'Get all workspaces' });
    });

    app.post('/workspace', {
        schema: {
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {type: 'string', minLength: 1},
                },
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: {type: 'string'},
                        createdAt: {type: 'string', format: 'date-time'},
                        updatedAt: {type: 'string', format: 'date-time'},
                        name: {type: 'string'},
                        apiKey: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                expiresAt: {type: 'string', format: 'date-time'},
                                key: {type: 'string'},
                                note: {type: 'string'}
                            },
                        },

                    },
                },
            },
        }
    }, createWorkspace);

    // app.get('/workspace/:id', async (request, reply) => {
    //     const { id } = request.params;
    //     reply.send({ message: `Get workspace with id: ${id}` });
    // });
}