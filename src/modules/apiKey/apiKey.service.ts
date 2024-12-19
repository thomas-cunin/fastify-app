import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export  class ApiKeyService {
    static generateApiKey(): string
    {
        return "api_bearer_v1_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+ Math.random().toString(36).substring(2, 15)+ Math.random().toString(36).substring(2, 15)+ Math.random().toString(36).substring(2, 15);
    }

    async createApiKey(data: { note:string, durationInDays: number, workspaceId: string }) {
       const expiresAt = new Date();
         expiresAt.setDate(expiresAt.getDate() + data.durationInDays);
        return prisma.apiKey.create({
            data : {
                note: data.note,
                key: ApiKeyService.generateApiKey(),
                workspaceId: data.workspaceId,
                expiresAt: expiresAt,
            },
        });
    }
}