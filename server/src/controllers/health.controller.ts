import { Request, Response } from 'express';
import { ApiResponse } from '../types/index.js';

export function getHealth(_req: Request, res: Response<ApiResponse<{ status: string }>>) {
  return res.status(200).json({
    success: true,
    data: {
      status: 'ok',
    },
  });
}
