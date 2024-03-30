#!/usr/bin/env sh

# Install submodules
echo 'Installing project submodules...'
git submodule update --init
git submodule update --recursive --remote

# Install dependencies
echo 'Installing project dependencies...'
