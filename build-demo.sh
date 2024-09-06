#!/usr/bin/env sh
#
# Build using a single component as entry point.
# Run as: ./build-demo.sh <component-name>
# This will build using ./src/components/<component-name>/demo.js as entry point for the application.

set -e

if [ -z "${1}" ]; then
    printf "Missing argument as: %s anvil-404\\n" "${0}" >&2
    exit 1
fi

npm run tsc

entry="./src/components/${1}/demo.js"

printf "Building with entry=%s\\n" "${entry}" >&2

entry="${entry}" npm run build-app
