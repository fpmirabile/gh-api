import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const data = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };

  res.success(data);
});

export default router;
