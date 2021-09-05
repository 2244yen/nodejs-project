"use strict";

import VoucherController from "../controllers/VoucherController";
import * as VoucherSchema from "./schemas/voucherSchema";
import * as CommonSchema from "./schemas/commonSchema";

export default (() => {
  const vCtrl = new VoucherController();

  return [
    {
      method: "GET",
      path: "/v1/vouchers",
      options: {
        handler: vCtrl.index,
        tags: ["api", "Voucher"],
        validate: {
          query: CommonSchema.PaginationSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: VoucherSchema.VoucherListResSchema
          }
        }
      }
    },
    {
      method: "POST",
      path: "/v1/vouchers",
      options: {
        handler: vCtrl.create,
        tags: ["api", "Voucher"],
        validate: {
          payload: VoucherSchema.VoucherSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: VoucherSchema.VoucherResSchema
          }
        }
      }
    },
    {
      method: "DELETE",
      path: "/v1/vouchers/{id}",
      options: {
        handler: vCtrl.delete,
        tags: ["api", "Voucher"],
        validate: {
          params: CommonSchema.ParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    }
  ]
})();