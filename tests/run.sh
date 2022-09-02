#!/bin/sh
mkdir -p output
mkdir -p output/pdf
mkdir -p output/svg

set -e

echo "utils"
  node utils
echo "a4"
  node a4
echo "a4-no-debtor-no-amount-no-reference"
  node a4-no-debtor-no-amount-no-reference
echo "a6-5"
  node a6-5.mjs
echo "a6-5-housenmuber"
  node a6-5-buildingnumber
echo "av1av2"
  node av1av2
echo "english"
  node english
echo "euro"
  node euro
echo "french"
  node french
echo "italian"
  node italian
echo "message"
  node message
echo "no-reference-message"
  node no-reference-message
echo "message-additional-information"
  node message-additional-information
echo "additional-information"
  node additional-information
echo "multipage"
  node multipage
echo "no-amount"
  node no-amount
echo "no-debtor"
  node no-debtor
echo "no-debtor-no-amount"
  node no-debtor-no-amount
echo "no-debtor-no-amount-no-reference"
  node no-debtor-no-amount-no-reference
echo "no-debtor-no-reference"
  node no-debtor-no-reference
echo "no-scissors"
  node no-scissors
echo "no-scissors-no-outlines"
  node no-scissors-no-outlines
echo "no-scissors-no-separate"
  node no-scissors-no-separate
echo "no-separate-no-outlines"
  node no-separate-no-outlines
echo "no-scissors-no-separate-no-outlines"
  node no-scissors-no-separate-no-outlines
echo "normal-iban-creditor-reference"
  node normal-iban-creditor-reference
echo "normal-iban-no-reference"
  node normal-iban-no-reference
echo "not-enough-space"
  node not-enough-space
echo "not-enough-space-a4"
  node not-enough-space-a4
echo "qr-iban"
  node qr-iban
echo "separate"
  node separate
echo "separate-scissors"
  node separate-scissors
echo "callback"
  node callback
echo "callback-with-options"
  node callback-with-options
echo "event"
  node event
echo "stream"
  node stream
echo "zip-string"
  node zip-string
echo "standalone-pdfkit"
  node standalone-pdfkit
echo "multiple-bills"
  node multiple-bills