#!/usr/bin/env sh
# Build using a single component as entry point.
# Run as: ./build-demo.sh <component-name> [tsc]
# This will build using ./src/components/<component-name>/demo.js as entry point for the application.
# If second argument is set (to anything) script will first typescript compile the code.
#

if [ -z "${1}" ]; then
    printf "Missing argument as: %s anvil-404 [tsc]\\n" "${0}" >&2
    exit 1
fi

if [ -n "${2}" ]; then
    npm run tsc

    if [ $? -gt 0 ]; then
        exit 1
    fi
fi

entry="./src/components/${1}/demo.js"

printf "Building with entry=%s\\n" "${entry}"

entry="${entry}" npm run build-app
