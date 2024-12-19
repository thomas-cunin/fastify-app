import { PrismaClient } from '@prisma/client';
import { ApiKeyService } from '../apiKey/apiKey.service';
const prisma = new PrismaClient();

const apiKeyService = new ApiKeyService();

export class WorkspaceService {


    async createWorkspace(data: { name: string }) {


        const workspace = await prisma.workspace.create({
            data : {
                name: data.name,
            },
        } );

        if (!workspace) {
            throw new Error('Unable to create workspace');
        }
        const apiKey = await apiKeyService.createApiKey({
            note: 'Default API Key',
            durationInDays: 365,
            workspaceId: workspace.id,
        } );

        return {...workspace, apiKey};
        }
}