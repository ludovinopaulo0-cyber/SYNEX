import { c as createServerRpc, r as requireAdmin, A as AdminError } from "./admin.server-viLczT-C.mjs";
import { $ as createServerFn } from "./server.mjs";
import { o as object, s as string, n as number } from "./schemas-CrY2pnAI.mjs";
import "node:crypto";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const BASE_URL = "https://resell.codes/api/v1";
class SupplierError extends Error {
}
function apiKey() {
  const key = process.env.RESELLCODES_API_KEY?.trim();
  if (!key) {
    throw new SupplierError(
      "A chave da ReSellCodes não está configurada (RESELLCODES_API_KEY)."
    );
  }
  return key;
}
async function call(path, init) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${apiKey()}`,
        ...init?.body ? { "Content-Type": "application/json" } : {},
        ...init?.headers
      }
    });
  } catch {
    throw new SupplierError("Não consegui contactar a ReSellCodes. Tenta novamente.");
  }
  if (response.status === 429) {
    throw new SupplierError("Demasiados pedidos à ReSellCodes. Espera um pouco.");
  }
  if (!response.ok) {
    let message = `A ReSellCodes recusou o pedido (${response.status}).`;
    try {
      const body = await response.json();
      if (body?.error?.message) message = body.error.message;
    } catch {
    }
    throw new SupplierError(message);
  }
  return await response.json();
}
async function searchGiftCardCategories(q) {
  const query = q ? `?q=${encodeURIComponent(q)}` : "";
  return call(`/gift-cards/categories${query}`);
}
async function giftCardOffers(categoryId) {
  return call(
    `/gift-cards/categories/${encodeURIComponent(categoryId)}/cards`
  );
}
async function orderGiftCard(categoryId, cardId, quantity) {
  return call("/gift-cards/order", {
    method: "POST",
    body: JSON.stringify({ category_id: categoryId, card_id: cardId, quantity })
  });
}
async function searchGameKeys(q) {
  const query = q ? `?q=${encodeURIComponent(q)}` : "";
  return call(`/game-keys${query}`);
}
async function gameKeyOffers(gameId) {
  return call(
    `/game-keys/${encodeURIComponent(gameId)}/keys`
  );
}
async function orderGameKey(gameId, keyId, quantity) {
  return call("/game-keys/order", {
    method: "POST",
    body: JSON.stringify({ game_id: gameId, key_id: keyId, quantity })
  });
}
async function getSupplierOrder(number2) {
  return call(`/orders/${number2}`);
}
async function supplierAccount() {
  return call("/me");
}
const authed = object({
  token: string().min(1)
});
function toClientError(error) {
  if (error instanceof AdminError || error instanceof SupplierError) {
    throw new Error(error.message);
  }
  console.error("[synex] supplier request failed", error);
  throw new Error("Não foi possível falar com o fornecedor. Tenta novamente.");
}
const supplierBalance_createServerFn_handler = createServerRpc({
  id: "bb69a002fcddfa3ef395b784de66ec5896129c6b5206b6ac6120d6079b2eaca7",
  name: "supplierBalance",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierBalance.__executeServer(opts));
const supplierBalance = createServerFn({
  method: "POST"
}).inputValidator(authed).handler(supplierBalance_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await supplierAccount();
  } catch (error) {
    toClientError(error);
  }
});
const supplierSearchGiftCards_createServerFn_handler = createServerRpc({
  id: "06051ef87a9bb2c19c93b458a10112c94f93de70c581669bef238ccf2fb96f7c",
  name: "supplierSearchGiftCards",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierSearchGiftCards.__executeServer(opts));
const supplierSearchGiftCards = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  q: string().max(80)
})).handler(supplierSearchGiftCards_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await searchGiftCardCategories(data.q);
  } catch (error) {
    toClientError(error);
  }
});
const supplierGiftCardOffers_createServerFn_handler = createServerRpc({
  id: "5a83c4eebcb494f6119a3247a654dc9be7c7d366e989f6a175397bd0565e50ec",
  name: "supplierGiftCardOffers",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierGiftCardOffers.__executeServer(opts));
const supplierGiftCardOffers = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  categoryId: string().min(1).max(120)
})).handler(supplierGiftCardOffers_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await giftCardOffers(data.categoryId);
  } catch (error) {
    toClientError(error);
  }
});
const supplierOrderGiftCard_createServerFn_handler = createServerRpc({
  id: "32921a888acb2ff385a820124def84a53d0206a540a44bb022ba4ab6716cc3e1",
  name: "supplierOrderGiftCard",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierOrderGiftCard.__executeServer(opts));
const supplierOrderGiftCard = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  categoryId: string().min(1).max(120),
  cardId: string().min(1).max(120),
  quantity: number().int().min(1).max(100)
})).handler(supplierOrderGiftCard_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await orderGiftCard(data.categoryId, data.cardId, data.quantity);
  } catch (error) {
    toClientError(error);
  }
});
const supplierSearchGameKeys_createServerFn_handler = createServerRpc({
  id: "a6fc7603d4d10da36139988ff2f11bacc2b9b26182fa11b9ebafe67c4625775f",
  name: "supplierSearchGameKeys",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierSearchGameKeys.__executeServer(opts));
const supplierSearchGameKeys = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  q: string().max(80)
})).handler(supplierSearchGameKeys_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await searchGameKeys(data.q);
  } catch (error) {
    toClientError(error);
  }
});
const supplierGameKeyOffers_createServerFn_handler = createServerRpc({
  id: "db8b0b767ded61ca87d8af8f2acda7a41bb91d6b7c59ce431a4634db39ae09b5",
  name: "supplierGameKeyOffers",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierGameKeyOffers.__executeServer(opts));
const supplierGameKeyOffers = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  gameId: string().min(1).max(120)
})).handler(supplierGameKeyOffers_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await gameKeyOffers(data.gameId);
  } catch (error) {
    toClientError(error);
  }
});
const supplierOrderGameKey_createServerFn_handler = createServerRpc({
  id: "bff1aae1529b11f60b9f885b36c7f677c244d1b33732fcff8b574104fb7a74d5",
  name: "supplierOrderGameKey",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierOrderGameKey.__executeServer(opts));
const supplierOrderGameKey = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  gameId: string().min(1).max(120),
  keyId: string().min(1).max(120),
  quantity: number().int().min(1).max(100)
})).handler(supplierOrderGameKey_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await orderGameKey(data.gameId, data.keyId, data.quantity);
  } catch (error) {
    toClientError(error);
  }
});
const supplierOrderStatus_createServerFn_handler = createServerRpc({
  id: "cbd541fb092abfc190af6db592643213bc7288df7c9d54add4a3aa56e0afaf6c",
  name: "supplierOrderStatus",
  filename: "src/server/supplier.functions.ts"
}, (opts) => supplierOrderStatus.__executeServer(opts));
const supplierOrderStatus = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  number: number().int().min(1)
})).handler(supplierOrderStatus_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await getSupplierOrder(data.number);
  } catch (error) {
    toClientError(error);
  }
});
export {
  supplierBalance_createServerFn_handler,
  supplierGameKeyOffers_createServerFn_handler,
  supplierGiftCardOffers_createServerFn_handler,
  supplierOrderGameKey_createServerFn_handler,
  supplierOrderGiftCard_createServerFn_handler,
  supplierOrderStatus_createServerFn_handler,
  supplierSearchGameKeys_createServerFn_handler,
  supplierSearchGiftCards_createServerFn_handler
};
