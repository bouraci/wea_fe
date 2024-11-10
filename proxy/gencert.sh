#!/bin/bash

cd "$(dirname "$0")" || exit

CERT_DIR="./certs"
DOMAIN="localhost"

if [[ -f "$CERT_DIR/fullchain.pem" && -f "$CERT_DIR/privkey.pem" ]]; then
  echo "SSL certificate and key already exist."
  exit 0
fi

mkdir -p "$CERT_DIR"

if ! command -v mkcert &> /dev/null; then
  echo "mkcert not found. Please install mkcert and try again."
  exit 1

fi

mkcert -install

echo "Generating certificate for ${DOMAIN}..."
mkcert -cert-file "$CERT_DIR/fullchain.pem" -key-file "$CERT_DIR/privkey.pem" "$DOMAIN"

if [[ -f "$CERT_DIR/fullchain.pem" && -f "$CERT_DIR/privkey.pem" ]]; then
  echo "Certificate and key generated successfully:"
else
  echo "Error: Failed to generate SSL certificate and key."
  exit 1
fi
