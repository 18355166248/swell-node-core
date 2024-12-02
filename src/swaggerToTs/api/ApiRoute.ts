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

export namespace Api {
  /**
   * No description
   * @tags marketing-rule-controller
   * @name BatchAddMarketingRuleProductsUsingPost
   * @summary 批量新增商品绑定
   * @request POST:/api/marketing_rule/batchAddMarketingRuleProducts
   */
  export namespace BatchAddMarketingRuleProductsUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchAddMarketingRuleProductReqVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponseVoid;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name ChangeMarketingRuleStatusUsingPost
   * @summary 变更支付营销规则状态
   * @request POST:/api/marketing_rule/changeMarketingRuleStatus
   */
  export namespace ChangeMarketingRuleStatusUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeMarketingRuleStatusReqVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponseVoid;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name ChangeProductRuleRelationStatusUsingPost
   * @summary 变更商品绑定状态
   * @request POST:/api/marketing_rule/changeProductRuleRelationStatus
   */
  export namespace ChangeProductRuleRelationStatusUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeProductRuleRelationStatusReqVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponseVoid;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name CreateMarketingRuleUsingPost
   * @summary 创建支付营销规则
   * @request POST:/api/marketing_rule/createMarketingRule
   */
  export namespace CreateMarketingRuleUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateMarketingRuleRequestVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponseString;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name GetMarketingRuleProductsUsingPost
   * @summary 查询营销规则绑定的商品列表
   * @request POST:/api/marketing_rule/getMarketingRuleProducts
   */
  export namespace GetMarketingRuleProductsUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MarketingRuleQueryVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponsePageMarketingRuleProductVo;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name GetMarketingRulesUsingPost
   * @summary 查询营销规则列表
   * @request POST:/api/marketing_rule/getMarketingRules
   */
  export namespace GetMarketingRulesUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MarketingRuleQueryVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponsePageMarketingRuleVo;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name GetProductItemsUsingPost
   * @summary 查询商品信息
   * @request POST:/api/marketing_rule/getProductItems
   */
  export namespace GetProductItemsUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponseListProductItemVo;
  }

  /**
   * No description
   * @tags marketing-rule-controller
   * @name UpdateMarketingRuleUsingPost
   * @summary 更新支付营销规则
   * @request POST:/api/marketing_rule/updateMarketingRule
   */
  export namespace UpdateMarketingRuleUsingPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateMarketingRuleRequestVo;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResponseVoid;
  }
}
