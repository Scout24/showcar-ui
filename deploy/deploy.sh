#!/bin/bash

set -e

fail() {
  echo "FAIL: $*"
  exit 1
}

upload_to_s3() {
    echo "Uploading assets to s3://as24-showcar-assets/${SERVICE_NAME}/${BRANCH}/${COMMIT_HASH}/"

    aws --region "eu-west-1" s3 cp dist "s3://as24-showcar-assets/${SERVICE_NAME}/${BRANCH}/${COMMIT_HASH}/" --recursive --exclude "*.html" --cache-control "max-age=2592000" --acl public-read
    aws --region "eu-west-1" s3 cp dist "s3://as24-showcar-assets/${SERVICE_NAME}/${BRANCH}/${COMMIT_HASH}/" --recursive --exclude "*" --include "*.html" --cache-control "max-age=300" --acl public-read

    aws --region "eu-west-1" s3 cp dist "s3://as24-showcar-assets/${SERVICE_NAME}/${BRANCH}/latest/" --recursive --exclude "*.html" --cache-control "max-age=2592000" --acl public-read
    aws --region "eu-west-1" s3 cp dist "s3://as24-showcar-assets/${SERVICE_NAME}/${BRANCH}/latest/" --recursive --exclude "*" --include "*.html" --cache-control "max-age=300" --acl public-read

    aws --region "eu-west-1" s3 cp dist "s3://as24-showcar-assets/${SERVICE_NAME}/" --recursive --exclude "*" --include "*-fragment.html" --cache-control "max-age=300" --acl public-read
}

upload_to_s3
