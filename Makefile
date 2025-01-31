# Makefile for various SSH and Docker operations

# Variables
SSH_DIR := $(HOME)/.ssh

# Phony targets
.PHONY: all copy-id-pub copy-id img-prune dev help

# Default target
all: help

# Copy public SSH key to clipboard
copy-id-pub:
	@pbcopy < $(SSH_DIR)/id_rsa.pub
	@echo "Public key copied to clipboard"

# Copy private SSH key to clipboard
copy-id:
	@pbcopy < $(SSH_DIR)/id_rsa
	@echo "Private key copied to clipboard"

# Remove all unused Docker images
img-prune:
	@docker image prune -af
	@echo "Unused Docker images removed"

# Run development environment with Doppler
serve:
	@doppler run --config dev -- ng serve

# Help target
help:
	@echo "Available targets:"
	@echo "  copy-id-pub  - Copy public SSH key to clipboard"
	@echo "  copy-id      - Copy private SSH key to clipboard"
	@echo "  img-prune    - Remove all unused Docker images"
	@echo "  dev          - Run development environment with Doppler"
	@echo "  help         - Show this help message"
