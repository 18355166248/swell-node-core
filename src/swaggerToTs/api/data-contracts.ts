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

/** BatchAddMarketingRuleProductReqVo */
export interface BatchAddMarketingRuleProductReqVo {
  itemIds?: string[];
  ruleNo?: string;
}

/** ChangeMarketingRuleStatusReqVo */
export interface ChangeMarketingRuleStatusReqVo {
  ruleNo?: string;
  status?: string;
}

/** ChangeProductRuleRelationStatusReqVo */
export interface ChangeProductRuleRelationStatusReqVo {
  itemId?: string;
  /** @format int32 */
  priority?: number;
  ruleNo?: string;
  status?: string;
}

/** CreateMarketingRuleRequestVo */
export interface CreateMarketingRuleRequestVo {
  calcRuleContent?: string;
  externalRuleNo?: string;
  filterRuleContent?: string;
  marketingMode?: string;
  ruleDesc?: string;
  ruleName?: string;
  /** @format int32 */
  ruleType?: number;
}

/** MarketingRuleProductVo */
export interface MarketingRuleProductVo {
  itemId?: string;
  itemName?: string;
  /** @format int32 */
  priority?: number;
  productNo?: string;
  ruleNo?: string;
  status?: string;
  unitPrice?: string;
}

/** MarketingRuleQueryVo */
export interface MarketingRuleQueryVo {
  /** @format int32 */
  pageNo?: number;
  /** @format int32 */
  pageSize?: number;
  ruleName?: string;
  ruleNo?: string;
  /** @format int32 */
  ruleType?: number;
}

/** MarketingRuleVo */
export interface MarketingRuleVo {
  calcRuleContent?: string;
  calcRuleNo?: string;
  externalRuleNo?: string;
  filterRuleContent?: string;
  filterRuleNo?: string;
  marketingMode?: string;
  ruleDesc?: string;
  ruleName?: string;
  ruleNo?: string;
  /** @format int32 */
  ruleType?: number;
  status?: string;
}

/** ProductItemVo */
export interface ProductItemVo {
  itemId?: string;
  itemName?: string;
  unitPrice?: string;
}

/** UpdateMarketingRuleRequestVo */
export interface UpdateMarketingRuleRequestVo {
  ruleDesc?: string;
  ruleName?: string;
  ruleNo?: string;
  /** @format int32 */
  ruleType?: number;
}

/** CommonResponse«List«ProductItemVo»» */
export interface CommonResponseListProductItemVo {
  data?: ProductItemVo[];
  msg?: string;
  ret?: string;
}

/** CommonResponse«Page«MarketingRuleProductVo»» */
export interface CommonResponsePageMarketingRuleProductVo {
  data?: PageMarketingRuleProductVo;
  msg?: string;
  ret?: string;
}

/** CommonResponse«Page«MarketingRuleVo»» */
export interface CommonResponsePageMarketingRuleVo {
  data?: PageMarketingRuleVo;
  msg?: string;
  ret?: string;
}

/** CommonResponse«Void» */
export interface CommonResponseVoid {
  msg?: string;
  ret?: string;
}

/** CommonResponse«string» */
export interface CommonResponseString {
  data?: string;
  msg?: string;
  ret?: string;
}

/** Page«MarketingRuleProductVo» */
export interface PageMarketingRuleProductVo {
  empty?: boolean;
  items?: MarketingRuleProductVo[];
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pages?: number;
  /** @format int32 */
  total?: number;
}

/** Page«MarketingRuleVo» */
export interface PageMarketingRuleVo {
  empty?: boolean;
  items?: MarketingRuleVo[];
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pages?: number;
  /** @format int32 */
  total?: number;
}
