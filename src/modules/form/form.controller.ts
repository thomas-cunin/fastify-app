// file: form.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { FormService } from './form.service';

const formService = new FormService();

export const getForms = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const forms = await formService.getAllForms();
        return reply.status(200).send(forms);
    } catch (error) {
        reply.status(500).send({ error: 'Unable to fetch forms' });
    }
};

export const createForm = async (
    request: FastifyRequest<{ Body: { title: string } }>,
    reply: FastifyReply
) => {
    const { title } = request.body;

    try {
        const newForm = await formService.createForm({ title });
        return reply.status(201).send(newForm);
    } catch (error) {
        reply.status(500).send({ error: 'Unable to create form' });
    }

};

export const getFormById = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    const { id } = request.params;

    try {
        const form = await formService.getFormById(id);
        if (!form) {
            return reply.status(404).send({ error: 'Form not found' });
        }
        return reply.status(200).send(form);
    } catch (error) {
        reply.status(500).send({ error: 'Unable to fetch form' });
    }
};