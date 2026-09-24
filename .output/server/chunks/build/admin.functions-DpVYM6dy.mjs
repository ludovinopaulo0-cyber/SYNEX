import { c as createServerRpc, b as pinIsConfigured, s as setupPin, f as authenticateAdmin, v as verifySession, g as endSession, h as changePin, A as AdminError } from "./admin.server-D0tbPMwO.mjs";
import { $ as createServerFn } from "./server.mjs";
import { o as object, s as string } from "./schemas-CrY2pnAI.mjs";
import "node:crypto";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const pinSchema = object({
  pin: string().min(4).max(24)
});
function toClientError(error) {
  if (error instanceof AdminError) throw new Error(error.message);
  console.error("[synex] admin auth failed", error);
  throw new Error("Não foi possível concluir o pedido. Tenta novamente.");
}
const getAdminStatus_createServerFn_handler = createServerRpc({
  id: "c962a5d7fbda97df77a182f57d61572a8f532932a758bb3a14005ea967d38d64",
  name: "getAdminStatus",
  filename: "src/server/admin.functions.ts"
}, (opts) => getAdminStatus.__executeServer(opts));
const getAdminStatus = createServerFn().handler(getAdminStatus_createServerFn_handler, async () => {
  return {
    configured: await pinIsConfigured()
  };
});
const createAdminPin_createServerFn_handler = createServerRpc({
  id: "244cbf2cbe082686ba4a903262e4b9f1518a0015f2e0e1fdf19bceffad45f9bb",
  name: "createAdminPin",
  filename: "src/server/admin.functions.ts"
}, (opts) => createAdminPin.__executeServer(opts));
const createAdminPin = createServerFn({
  method: "POST"
}).inputValidator(pinSchema).handler(createAdminPin_createServerFn_handler, async ({
  data
}) => {
  try {
    return {
      token: await setupPin(data.pin)
    };
  } catch (error) {
    toClientError(error);
  }
});
const adminLogin_createServerFn_handler = createServerRpc({
  id: "263bd70d1804a67d4dddede387d919e0b357a91a8745b685045216115f131092",
  name: "adminLogin",
  filename: "src/server/admin.functions.ts"
}, (opts) => adminLogin.__executeServer(opts));
const adminLogin = createServerFn({
  method: "POST"
}).inputValidator(pinSchema).handler(adminLogin_createServerFn_handler, async ({
  data
}) => {
  try {
    return {
      token: await authenticateAdmin(data.pin)
    };
  } catch (error) {
    toClientError(error);
  }
});
const adminSessionValid_createServerFn_handler = createServerRpc({
  id: "151070df37d7314ac70f86b2cc96c7f645f5d0853297a943e73ceea83192cd84",
  name: "adminSessionValid",
  filename: "src/server/admin.functions.ts"
}, (opts) => adminSessionValid.__executeServer(opts));
const adminSessionValid = createServerFn({
  method: "POST"
}).inputValidator(object({
  token: string().min(1)
})).handler(adminSessionValid_createServerFn_handler, async ({
  data
}) => {
  return {
    valid: await verifySession(data.token)
  };
});
const adminLogout_createServerFn_handler = createServerRpc({
  id: "4cc4e122782d959242dc5168a6cf40d85642479c38f1768b56ceb0fb02d46ae3",
  name: "adminLogout",
  filename: "src/server/admin.functions.ts"
}, (opts) => adminLogout.__executeServer(opts));
const adminLogout = createServerFn({
  method: "POST"
}).inputValidator(object({
  token: string().min(1)
})).handler(adminLogout_createServerFn_handler, async ({
  data
}) => {
  await endSession(data.token);
  return {
    ok: true
  };
});
const adminChangePin_createServerFn_handler = createServerRpc({
  id: "2d7645931714107e3ee0dd6733e4a688d3bd292bf21c5549803311103d8db73a",
  name: "adminChangePin",
  filename: "src/server/admin.functions.ts"
}, (opts) => adminChangePin.__executeServer(opts));
const adminChangePin = createServerFn({
  method: "POST"
}).inputValidator(object({
  token: string().min(1),
  currentPin: string().min(4).max(24),
  nextPin: string().min(4).max(24)
})).handler(adminChangePin_createServerFn_handler, async ({
  data
}) => {
  try {
    await changePin(data.token, data.currentPin, data.nextPin);
    return {
      ok: true
    };
  } catch (error) {
    toClientError(error);
  }
});
export {
  adminChangePin_createServerFn_handler,
  adminLogin_createServerFn_handler,
  adminLogout_createServerFn_handler,
  adminSessionValid_createServerFn_handler,
  createAdminPin_createServerFn_handler,
  getAdminStatus_createServerFn_handler
};
