#!/bin/bash

direccion="."
inicio=$1
final=$2

if [ -n "$3" ]; then
  direccion=$3
fi

if [ -z "$inicio" ] || [ -z "$final" ] ; then
  echo "Uso1: ./createTalleres.sh inicio final direccion"
  echo "Uso2: ./createTalleres.sh inicio final "
  echo "Ejemplo: ./createTalleres.sh 1 30"
  echo "Ejemplo: ./createTalleres.sh 1 30 modulo2"
  exit 1
fi

mkdir -p "$direccion"

for i in $(seq "$inicio" "$final")
do
  touch "$direccion/taller${i}.html"
done
