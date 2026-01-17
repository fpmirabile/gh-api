import express from 'express';
import repoRoutes from './routes/repo.routes';
import healthRoutes from './routes/health.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const apiRouter = express.Router();
apiRouter.use('/users', repoRoutes);
apiRouter.use('/health', healthRoutes);

app.use('/api', apiRouter);

export default app;
