import Fastify from 'fastify';
import { formRoutes } from './modules/form/form.routes';
import {a} from "vitest/dist/chunks/suite.B2jumIFP";
import {PrismaClient} from "@prisma/client";
import {workspaceRoutes} from "./modules/workspace/workspace.routes";
const prisma = new PrismaClient();
const app = Fastify({
    logger: true,
});
// Supposez que vous avez un tableau ou un Set de clés statiques
const staticKeys = new Set([
    process.env.SUPER_ADMIN_API_KEY, // Clé statique pour le back-office
]);

app.addHook('preHandler', async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reply.code(401).send({ error: 'Missing or invalid Authorization header' });
        return;
    }

    const apiKey = authHeader.slice('Bearer '.length);

    // 1. Vérifier si c'est une clé statique
    if (staticKeys.has(apiKey)) {
        // Clé statique validée
        // Ici, pas de workspace spécifique associé.
        // Vous pouvez si besoin marquer le request comme venant d'un admin.
        // @ts-ignore
        request.isAdmin = true;
        return; // Laissez passer, la route pourra vérifier request.isAdmin si nécessaire
    }

    // 2. Si pas statique, vérification en base pour clé dynamique
    const workspace = await prisma.workspace.findFirst({
        where: {
            ApiKey: {
                some: {
                    key: apiKey,
                    expiresAt: { gt: new Date() } // si expiration gérée
                }
            }
        }
    });

    if (!workspace) {
        reply.code(401).send({ error: 'Invalid API Key' });
        return;
    }

    // Clé dynamique valide, on associe le workspace
    // @ts-ignore
    request.workspace = workspace;
});

// Enregistrement des routes
app.register(formRoutes, { prefix: '/api' });
app.register(workspaceRoutes, { prefix: '/api' });

export default app;