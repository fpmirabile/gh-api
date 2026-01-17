import express, { Request, Response, NextFunction } from 'express';
import repoRoutes from './routes/repo.routes';
import healthRoutes from './routes/health.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use((_: Request, res: Response, next: NextFunction) => {
  res.success = (data: unknown, status = 200) => {
    res.status(status).json({
      status,
      data
    });
  };

  next();
});

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const apiRouter = express.Router();
apiRouter.use('/users', repoRoutes);
apiRouter.use('/health', healthRoutes);
app.use('/api', apiRouter);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: `Route ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

export default app;
