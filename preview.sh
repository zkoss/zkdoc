#!/usr/bin/env bash
bundle exec jekyll serve --incremental --config _config.yml,_config.dev.yml $@
# /b website