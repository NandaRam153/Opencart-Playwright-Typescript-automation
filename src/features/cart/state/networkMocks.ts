/** Deterministic network-mock payloads for hybrid UI demos (ADR-009). Not used by real SUT API tests. */

/** Body returned by a mocked failing `checkout/cart/add` response (HTTP 500). */
export const MOCK_CART_ADD_ERROR_BODY = 'Mocked cart service unavailable.';

/**
 * Minimal HTML that satisfies CartPage empty-cart assertions when the cart
 * document is fulfilled via `page.route`.
 */
export const MOCK_EMPTY_CART_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Shopping Cart</title></head>
<body>
  <div id="content">
    <h1>Shopping Cart</h1>
    <p>Your shopping cart is empty!</p>
  </div>
</body>
</html>`;
