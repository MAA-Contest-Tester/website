#!/bin/sh

DIR=$(realpath "$(dirname "$0")")
cd "$DIR" || exit 1
yarn install || exit 1
cd "$DIR/functions" || exit 1
(npm install && npm run build) || exit 1
