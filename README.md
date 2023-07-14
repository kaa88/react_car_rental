# TO DO:
- remake store with redux toolkit
- server (auth, db, account)
- account page
- minify (webpack)
- print.scss - move specific styles inside the component
- rename color vars
- remove dependencies from components, but use 'script manager' to control them (e.g. when menu opens -> close modal by using a dispatch)
- cookie popup
- add-feedback modal
- header account button image
- default account image (svg)
- forms spam-bot check (invisible field)

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
server default controllers, user controller