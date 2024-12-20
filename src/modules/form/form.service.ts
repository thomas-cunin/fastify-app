// file: form.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormService {
    async getAllForms() {
        return prisma.form.findMany();
    }

    async createForm(data: { title: string }) {
        return prisma.form.create({
            data : {
                title: data.title,
                workspaceId: '1',
            }
        });
    }

    async getFormById(id: string) {
        return prisma.form.findUnique({
            where: { id },
        });
    }
}
