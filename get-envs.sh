#!/bin/bash

# Logger function
source "./logger.sh"

# Check if config is provided
if [ $# -eq 0 ]; then
    log "ERROR" "Config is not set. Usage: $0 <config> [options]"
    exit 1
fi

# Set config
CONFIG="$1"

# Get the STRAPI_URL value from Doppler
STRAPI_URL="$(doppler secrets get STRAPI_URL --plain --config "$CONFIG")"
echo "STRAPI_URL: $STRAPI_URL"

# Get the DOPPLER_CONFIG value from Doppler
DOPPLER_CONFIG="$(doppler secrets get DOPPLER_CONFIG --plain --config "$CONFIG")"
echo "DOPPLER_CONFIG: $DOPPLER_CONFIG"
