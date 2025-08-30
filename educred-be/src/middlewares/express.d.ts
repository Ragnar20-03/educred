import { Request } from "express";

// Extend the Request interface to include custom properties
declare global {
    namespace Express {
        interface Request {
            uid?: string; // Add any other custom properties as needed,
            aid?: string
        }
    }
}