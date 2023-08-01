# TO DO:
- user role 'GUEST' with 'frozen' settings
- minify (webpack)
- print.scss - move specific styles inside the component
- cookie popup
- forms spam-bot check (invisible field)
- global error handler, tests
- fix gitignore
- rotation alert
- scroll page to top when go to another page

========

# Server
User data (auth)
- id
- email
- password hash
- refresh token
- role (admin, user)
- image
- currency
- lang
- reservation
- reserv. history

Data (no auth)
- currencies
- cars
- feedbacks

# Cookie
httpOnly
- user id
- user role
- refresh token
simple
- currency
- lang

# Storage
- access token
- form data current choice?

# User creation
- 1 admin account
- 'create guest account' button
	- use 'random' fn to fill email & pw
	- create server scheduller to delete guest accounts & reservations every 3 days


===================

Continue:
