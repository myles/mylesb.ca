#!/bin/sh

fab build

watchmedo shell-command --patterns="*.html,*.css,*.js,*.txt" --recursive --wait --command='fab build' ./site/ ./static/ ./templates/
