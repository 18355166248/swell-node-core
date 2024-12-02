/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, RequestParams } from "./http-client";

export class Home<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags login-controller
   * @name LoginUsingGet
   * @summary 登入
   * @request GET:/home/login
   */
  loginUsingGet = (
    query: {
      /** redirect_uri */
      redirect_uri: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/home/login`,
      method: "GET",
      query: query,
      ...params,
    });
}
