#!/usr/bin/env python

import os

from fabric.contrib.project import rsync_project
from fabric.api import env, puts, local, task, hosts, execute, runs_once, put, sudo

import yaml

with open('_config.yml') as f:
	env.config = yaml.load(f)

env.use_ssh_config = True
env.hosts = [
	'nfs-myles-myles',
	'panda',
]

env.output_path = os.path.abspath(env.config['destination'])
env.static_path = os.path.abspath(env.config['static_dir'])
env.etc_path = os.path.abspath(env.config['etc_dir'])

def compile_js():
	local("mkdir -p %s/static/js/" % env.output_path)
	local("""cat %(static_path)s/js/bootstrap/transition.js \
					%(static_path)s/js/bootstrap/alert.js \
					%(static_path)s/js/bootstrap/button.js \
					%(static_path)s/js/bootstrap/carousel.js \
					%(static_path)s/js/bootstrap/collapse.js \
					%(static_path)s/js/bootstrap/dropdown.js \
					%(static_path)s/js/bootstrap/modal.js \
					%(static_path)s/js/bootstrap/tooltip.js \
					%(static_path)s/js/bootstrap/popover.js \
					%(static_path)s/js/bootstrap/scrollspy.js \
					%(static_path)s/js/bootstrap/tab.js \
					%(static_path)s/js/bootstrap/affix.js \
					> %(output_path)s/static/js/bootstrap.js""" % {
	    'static_path': env.static_path,
	    'output_path': env.output_path
	})

@task
@hosts('localhost')
def compile_css():
	local("mkdir -p %s/static/css/" % env.output_path)
	local("lessc %s/less/style.less > %s/static/css/style.css" % (env.static_path, env.output_path))

@task
@hosts('localhost')
def copy_static_dir():
	local("mkdir -p %s/static/img/" % env.output_path)
	local("cp -r %s/img/* %s/static/img/" % (env.static_path, env.output_path))
	
	compile_js()
	compile_css()
	
	local("cp %s/js/sjcl.js %s/static/js/" % (env.static_path, env.output_path))
	
	local("cp -r %s/fonts %s/static/" % (env.static_path, env.output_path))
	
	local("cp -r %s/uploads %s/static/"  % (env.static_path, env.output_path))

@task
@hosts('localhost')
def export_gpg_public_key():
	local("gpg --armor --export me@mylesbraithwaite.com > %s" % os.path.join(env.static_path, 'uploads/5A2FE7BF.asc'))
	local("gpg --armor --export mbraithwaite@braithwaite.ca > %s" % os.path.join(env.static_path, 'uploads/72C89F91.asc'))

@task
@hosts('localhost')
def build():
	clean()
	local("mkdir -p %s" % env.output_path)
	jekyll('build')
	copy_static_dir()

@task
@hosts('localhost')
def run():
	local("mkdir -p %s" % env.output_path)
	jekyll('serve --watch')

@hosts('nfs-myles-myles')
def deploy_nfs():
	rsync_project(
		local_dir=env.output_path + "/",
		remote_dir='/home/public',
		delete=True,
		extra_opts='--exclude=".DS_Store"'
	)

@hosts('panda')
def deploy_panda():
	env.user = 'myles'
	rsync_project(
		local_dir=env.output_path + "/",
		remote_dir='/srv/www/ca_mylesb_www/html',
		delete=True,
		extra_opts='--exclude=".DS_Store"'
	)

@task
@runs_once
def deploy():
	build()
	execute(deploy_panda)
	execute(deploy_nfs)

@task
@hosts('panda')
def update_nginx_config():
	put(
		local_path = os.path.join(env.etc_path, 'nginx.conf'),
		remote_path = '/etc/nginx/sites-available/ca_mylesb_www',
		use_sudo = True
	)
	sudo('/etc/init.d/nginx restart')

def jekyll(directives=''):
  """
  A simple wrapper around the jekyll command.
  """
  local('jekyll %s' % directives)

def clean():
  """
  This will clean the site directory.
  """
  local('rm -fr %s' % os.path.abspath(env.config['destination']))