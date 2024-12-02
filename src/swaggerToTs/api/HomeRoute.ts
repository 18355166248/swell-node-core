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

export namespace Home {
  /**
   * No description
   * @tags login-controller
   * @name LoginUsingGet
   * @summary 登入
   * @request GET:/home/login
   */
  export namespace LoginUsingGet {
    export type RequestParams = {};
    export type RequestQuery = {
      /** redirect_uri */
      redirect_uri: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
