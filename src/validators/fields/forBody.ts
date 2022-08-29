import { Request } from "express";

export function forBody(request: Request) {
  return request.body;
}
