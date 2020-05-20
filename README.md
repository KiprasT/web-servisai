# API for restaurant ordering system

> Kipras Tarasevičius

A basic CRUD project, that implements a super simple orders platform.

## Where are the docs?

> https://documenter.getpostman.com/view/8652555/SzKWvy27?version=latest

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

## SOAP

- Endpoint always: `localhost:5000/wsdl`
- Method always: `POST`

### Get order:

```xml
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
  <s11:Body>
    <ns1:OrderRequest xmlns:ns1='http://tempuri.org/'>
      <ns1:_id>5eb3c9e7b46fa9fdc6f5c7e6</ns1:_id>
    </ns1:OrderRequest>
  </s11:Body>
</s11:Envelope>
```

### Get all orders:

```xml
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
  <s11:Body>
    <ns1:OrdersRequest xmlns:ns1='http://tempuri.org/'>
    </ns1:OrdersRequest>
  </s11:Body>
</s11:Envelope>
```

### Create order:

```xml
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
  <s11:Body>
    <ns1:CreateOrderRequest xmlns:ns1='http://tempuri.org/'>
      <ns1:dish>Banana Pie</ns1:dish>
    </ns1:CreateOrderRequest>
  </s11:Body>
</s11:Envelope>
```

### Delete order:

```xml
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
    <s11:Body>
        <ns1:DeleteOrderRequest xmlns:ns1='http://tempuri.org/'>
            <ns1:_id>5eb3c9e7b46fa9fdc6f5c7e6</ns1:_id>
        </ns1:DeleteOrderRequest>
    </s11:Body>
</s11:Envelope>
```
