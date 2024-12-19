import { FastifyRequest, FastifyReply } from 'fastify';
import { WorkspaceService} from "./workspace.service";

const workspaceService = new WorkspaceService();
export const createWorkspace = async (
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply
) => {
    const { name } = request.body;

    try {
        const newWorkspace = await workspaceService.createWorkspace({ name });
        return reply.status(201).send(newWorkspace);
    } catch (error) {
        reply.status(500).send({ error: 'Unable to create form' });
    }

};