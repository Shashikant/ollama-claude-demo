# Test Cases: US-001

| ID | Title | Description | Expected Result | Priority |
|---|---|---|---|---|
| TC-01 | Valid Login | Login with `standard_user` | Redirected to Products page | High |
| TC-02 | Invalid Login | Login with wrong credentials | Error: "Username and password do not match" | High |
| TC-03 | Locked User | Login with `locked_out_user` | Error: "Epic sadface: Sorry, this user has been locked out" | Medium |
| TC-04 | Product Details | Click 'Sauce Labs Backpack' | Details displayed correctly | Medium |
| TC-05 | Add to Cart | Click 'Add to cart' | Cart count increases to 1 | High |
| TC-06 | Cart Validation | Verify item in cart | Name and Price match product | High |
| TC-07 | Checkout Form | Fill valid info | Redirected to Overview page | High |
| TC-08 | Empty Checkout | Submit empty form | Error: "First Name is required" | Medium |
| TC-09 | Complete Order | Click 'Finish' | Confirmation: "Thank you for your order!" | High |
