#!/bin/bash

set -e

ASSET_PATH="/assets/external/${SERVICE_NAME}/${BRANCH}/${COMMIT_HASH}"

fail() {
  echo "FAIL: $*"
  exit 1
}

prepare_assets() {
    echo "Preparing assets with ${ASSET_PATH}"

    sed -i -e "s=@@ASSET_PATH=${ASSET_PATH}=" dist/index.html
    sed -i -e "s=@@ASSET_PATH=${ASSET_PATH}=" dist/index-standalone.html
    sed -i -e "s=showcar-icons.js.map=${ASSET_PATH}/showcar-icons.js.map=" dist/showcar-icons.js
    sed -i -e "s=showcar-tracking.js.map=${ASSET_PATH}/showcar-tracking.js.map=" dist/showcar-tracking.js
    sed -i -e "s=showcar-ui.js.map=${ASSET_PATH}/showcar-ui.js.map=" dist/showcar-ui.js
    sed -i -e "s=showcar-ui.css.map=${ASSET_PATH}/showcar-ui.css.map=" dist/showcar-ui.css
}

prepare_assets
