# SAAS Subscription Server

## Key Generation

Generate key for JWT token:
https://stackoverflow.com/questions/50943739/how-do-i-get-a-key-for-jsonwebtoken-secret

```
openssl genrsa -out saas-subscription-server.pem 2048
openssl rsa -in saas-subscription-server.pem -out saas-subscription-server-public.pem -outform PEM -pubout
```
