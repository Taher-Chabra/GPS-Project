import Client from "../models/clients.model.ts";

declare global {
  namespace Express {
    interface Request {
      client?: typeof Client;
    }
  }
}
