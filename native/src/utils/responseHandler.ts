// src/utils/responseHandler.ts
import { Response } from 'express';
export const sendSuccess = (res: any, data: any) => {
  res.status(200).json({ success: true, data });
};

export const sendError = (res: any, error: any) => {
  res.status(500).json({ success: false, error: error.message || error });
};

