import configServer from "../config/configServer";
import { sign, verify } from "jsonwebtoken";
import payloadRequest from "./payloadRequest";

export default class JwtManager {
  static generateStaffAuthorization(id: string): string {
    const secret = configServer.server.jwt_staff_secret;
    const expiration = configServer.server.jwt_expiration;
    return sign({ id }, secret, {
      expiresIn: expiration,
    });
  }

  static verifyStaffAuthorization(jwt: string): payloadRequest {
    const secret = configServer.server.jwt_staff_secret;
    return verify(jwt, secret) as payloadRequest;
  }

  static generateSessionToken(id: string): string {
    const secret = configServer.server.jwt_session_secret;
    const expiration = configServer.server.jwt_session_expiration;
    return sign({ id }, secret, { expiresIn: expiration });
  }

  static verifySessionToken(jwt: string): payloadRequest {
    const secret = configServer.server.jwt_session_secret;
    return verify(jwt, secret) as payloadRequest;
  }
}
