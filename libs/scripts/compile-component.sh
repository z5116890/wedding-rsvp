#!/usr/bin/env bash

echo "$(date '+%H:%M:%S') Running $(basename $0) in $(basename $(pwd))..."
echo

THISSCRIPTDIR=$(dirname $0)

set -e

tsconfig_file="tsconfig.json"

while getopts ":p:" opt; do
  case $opt in
    p)
      tsconfig_file=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done
shift $((OPTIND-1))

if [ ! -f $tsconfig_file ]; then
  echo -e "\033[1;31mERROR:\033[0m Missing tsconfig file=${tsconfig_file}"
  exit 2
fi

mkdir -p src/app
find src/app -type f ! -name "*.ts" -a ! -name "*.spec.ts*" | while read f
do
  target=$(echo $f | sed -e's#src/app#dist#')
  mkdir -p $(dirname ${target})
  cp $f $target
done

echo "tsc -p $tsconfig_file..."

if ! ./node_modules/.bin/tsc -p $tsconfig_file ; then
  exit 2
fi

if [ -d "./libs" ]; then
  ls -d libs/* | while read d ; do

    if [[ -d "node_modules/$(basename $d)" ]] ; then
      echo
      echo -e "\033[1;31mERROR:\033[0m $d shadows node_modules/$(basename $d). Exiting."
      echo
      exit 2
    fi

    echo "Copying lib $d to dist/node_modules/"
    mkdir -p dist/node_modules/$(basename $d)
    cp -r $d dist/node_modules/
  done
fi

echo "$(date '+%H:%M:%S') compile-component.sh complete"
