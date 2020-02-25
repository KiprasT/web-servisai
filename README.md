# API for restaurant ordering system

> Kipras Tarasevičius

A basic CRUD project, that implements a super simple orders platform.

## How to start

```shell
docker-compose build
docker-compose up
```

Everything a handled by Docker:

- Programming language: NodeJS
- Port: 5000
- Database: MongoDB

## How to use

- Import Postman collection to Postman
- Run all 5 CRUD requests

## What does it do?

- Create orders (currently only a dish name is required to be provided)
- Update order (set the order to be `served`)
- Get all orders
- Get a single order
- Delete order
