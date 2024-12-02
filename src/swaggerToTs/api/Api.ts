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

import {
  BatchAddMarketingRuleProductReqVo,
  ChangeMarketingRuleStatusReqVo,
  ChangeProductRuleRelationStatusReqVo,
  CommonResponseListProductItemVo,
  CommonResponsePageMarketingRuleProductVo,
  CommonResponsePageMarketingRuleVo,
  CommonResponseString,
  CommonResponseVoid,
  CreateMarketingRuleRequestVo,
  MarketingRuleQueryVo,
  UpdateMarketingRuleRequestVo,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name BatchAddMarketingRuleProductsUsingPost
   * @summary 批量新增商品绑定
   * @request POST:/api/marketing_rule/batchAddMarketingRuleProducts
   */
  batchAddMarketingRuleProductsUsingPost = (req: BatchAddMarketingRuleProductReqVo, params: RequestParams = {}) =>
    this.request<CommonResponseVoid, void>({
      path: `/api/marketing_rule/batchAddMarketingRuleProducts`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name ChangeMarketingRuleStatusUsingPost
   * @summary 变更支付营销规则状态
   * @request POST:/api/marketing_rule/changeMarketingRuleStatus
   */
  changeMarketingRuleStatusUsingPost = (req: ChangeMarketingRuleStatusReqVo, params: RequestParams = {}) =>
    this.request<CommonResponseVoid, void>({
      path: `/api/marketing_rule/changeMarketingRuleStatus`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name ChangeProductRuleRelationStatusUsingPost
   * @summary 变更商品绑定状态
   * @request POST:/api/marketing_rule/changeProductRuleRelationStatus
   */
  changeProductRuleRelationStatusUsingPost = (req: ChangeProductRuleRelationStatusReqVo, params: RequestParams = {}) =>
    this.request<CommonResponseVoid, void>({
      path: `/api/marketing_rule/changeProductRuleRelationStatus`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name CreateMarketingRuleUsingPost
   * @summary 创建支付营销规则
   * @request POST:/api/marketing_rule/createMarketingRule
   */
  createMarketingRuleUsingPost = (ruleReq: CreateMarketingRuleRequestVo, params: RequestParams = {}) =>
    this.request<CommonResponseString, void>({
      path: `/api/marketing_rule/createMarketingRule`,
      method: "POST",
      body: ruleReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name GetMarketingRuleProductsUsingPost
   * @summary 查询营销规则绑定的商品列表
   * @request POST:/api/marketing_rule/getMarketingRuleProducts
   */
  getMarketingRuleProductsUsingPost = (queryVo: MarketingRuleQueryVo, params: RequestParams = {}) =>
    this.request<CommonResponsePageMarketingRuleProductVo, void>({
      path: `/api/marketing_rule/getMarketingRuleProducts`,
      method: "POST",
      body: queryVo,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name GetMarketingRulesUsingPost
   * @summary 查询营销规则列表
   * @request POST:/api/marketing_rule/getMarketingRules
   */
  getMarketingRulesUsingPost = (queryVo: MarketingRuleQueryVo, params: RequestParams = {}) =>
    this.request<CommonResponsePageMarketingRuleVo, void>({
      path: `/api/marketing_rule/getMarketingRules`,
      method: "POST",
      body: queryVo,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name GetProductItemsUsingPost
   * @summary 查询商品信息
   * @request POST:/api/marketing_rule/getProductItems
   */
  getProductItemsUsingPost = (itemIds: string[], params: RequestParams = {}) =>
    this.request<CommonResponseListProductItemVo, void>({
      path: `/api/marketing_rule/getProductItems`,
      method: "POST",
      body: itemIds,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags marketing-rule-controller
   * @name UpdateMarketingRuleUsingPost
   * @summary 更新支付营销规则
   * @request POST:/api/marketing_rule/updateMarketingRule
   */
  updateMarketingRuleUsingPost = (ruleReq: UpdateMarketingRuleRequestVo, params: RequestParams = {}) =>
    this.request<CommonResponseVoid, void>({
      path: `/api/marketing_rule/updateMarketingRule`,
      method: "POST",
      body: ruleReq,
      type: ContentType.Json,
      ...params,
    });
}
