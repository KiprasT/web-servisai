# API for restaurant ordering system

> Kipras Tarasevičius

A basic CRUD project, that implements a super simple orders platform.

## Where are the docs?

> https://documenter.getpostman.com/view/8652555/SzKWvy27?version=latest#2a3b1fcc-e45e-404b-a053-2919d64aed1e

## How to start

```shell
git clone https://github.com/KiprasT/web-servisai
cd web-servisai
git submodule init
git submodule update
```

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
