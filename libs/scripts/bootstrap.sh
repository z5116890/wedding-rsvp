#!/usr/bin/env bash

set -e

echo "$(date '+%H:%M:%S') Running $(basename "$0") in $(basename "$(pwd)")..."
echo

SCRIPTDIR=$(dirname "$0")

  if [[ "$git_exists" == "true" && "$aws_exists" == "true" && "$sha256sum_exists" == "true" ]] ; then

    SYSTEM_NAME=$(basename "$(git config --get remote.origin.url)" .git)

    MODULE=$(basename "$(pwd)")

    if [[ "$(uname -m)" == "x86_64" ]] ; then
      CPU_ARCH="amd64"
    else
      CPU_ARCH="arm64"
    fi

    cache_key="$SYSTEM_NAME-$MODULE-npm-$CPU_ARCH-$(sha256sum package.json | cut -d ' ' -f 1)-$(sha256sum package-lock.json | cut -d ' ' -f 1)"

    restore_cache "$cache_key" node_modules

  fi

  if [[ ! -d node_modules ]] ; then

    dependencies=$(jq '.dependencies' 'package.json')
    peer_dependencies=$(jq '.peerDependencies' 'package.json')
    dev_dependencies=$(jq '.devDependencies' 'package.json')

    if [[ "$dependencies" == "null" && "$peer_dependencies" == "null" && "$dev_dependencies" == "null" ]]; then

      echo "$(date '+%H:%M:%S') No 'dependencies', 'peerDependencies' or 'devDependencies'. Not executing npm ci"

    else

      echo "$(date '+%H:%M:%S') Executing npm ci, as node_modules cache not found..."
      if ! npm ci --no-audit ; then
        exit 2 # Exit code 2 means no automatic recovery
      fi

    fi

  fi

# else

#   set +e # grep exits with 1 if nothing found, so turn off error check for this line.
#   missing=$(npm ls --include=dev --include=prod --depth=0 2>/dev/null | grep -c "UNMET DEPENDENCY")
#   set -e

#   if [ "$missing" -gt 0 ]; then

#     echo "$(date '+%H:%M:%S') Executing npm ci as ${missing} unmet dependencies..."
#     npm ci --no-audit

#   fi
# fi

echo "$(date '+%H:%M:%S') bootstrap.sh complete"
