#!/usr/bin/env bash
#
# <%- description %>

set -o errexit
set -o pipefail
set -o nounset

main() {
	echo "Hello world"
}

main "$@"
