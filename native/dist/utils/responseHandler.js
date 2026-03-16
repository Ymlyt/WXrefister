"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data) => {
    res.status(200).json({ success: true, data });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, error) => {
    res.status(500).json({ success: false, error: error.message || error });
};
exports.sendError = sendError;
