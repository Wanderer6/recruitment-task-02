# UI Tests for online clothing store

## Approach
Approach for the tests is to use first product on the list to make sure tests won't break when some products are sold.

## Tags
- @cart - Run all cart tests
- @basicCart - Basic cart test
- @quickShop - Add products to cart using quick shop option
- @miniCart - Validate mini cart functionality

Run tests with tag - npx playwright test --grep "@cart"

## Modals and components
In this project modals are popups and components are reusable parts of the website like header.