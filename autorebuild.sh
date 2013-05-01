#!/bin/sh

fab build

watchmedo shell-command \
	--patterns="*.html,*.css,*.js,*.txt"
	--recursive \
	--command='fab build' \
	site/ static/ template/
