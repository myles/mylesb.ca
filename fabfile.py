#!/usr/bin/env python

import os
import json
import datetime
from glob import glob
from tempfile import tempdir

from fabric.contrib.project import rsync_project
from fabric.api import env, puts, local, task, hosts, execute, runs_once, put, sudo

from jinja2 import Environment, FileSystemLoader

env.hosts = [
	'nfs-myles-myles',
	'panda',
]
env.use_ssh_config = True
env.output_path = os.path.abspath('./_output/')
env.site_path = os.path.abspath('./site/')
env.static_path = os.path.abspath('./static/')
env.template_path = os.path.abspath('./templates/')
env.etc_path = os.path.abspath('./etc/')
env.template_context = {
	'site_url': 'http://mylesb.ca/',
	'static_url': '/static',
	'now': datetime.datetime.now()
}

def render(template, destination, **kwargs):
	jenv = Environment(loader=FileSystemLoader([env.template_path, env.site_path]))
	
	params = dict(env.template_context, **kwargs)
	params["page_url"] = template
	
	text = jenv.get_template(template).render(params)
	
	if template.endswith('.json'):
		text = json.dumps(json.loads(text.encode("utf-8")), sort_keys=True)
	
	with open(destination, "w") as output:
		puts("Rendering: {} to {}".format(template, destination))
		output.write(text.encode("utf-8"))

def render_site():
	file_types = ('.html', '.txt', '.xml', '.json')
	
	for root, dirs, docs in os.walk(env.site_path):
		for directory in dirs:
			directory = os.path.join(root, directory).replace(env.site_path, env.output_path)
			local('mkdir -p %s' % directory)
		
		for doc in docs:
			if doc.endswith(file_types):
				doc_loc = os.path.join(root, doc).replace(env.site_path + '/', '')
				render(doc_loc, os.path.join(env.output_path, doc_loc))

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

def copy_htaccess():
	local ("cp %s/htaccess.htaccess %s/.htaccess" % (env.site_path, env.output_path))

def clean():
	local("rm -fr %s/*" % env.output_path)

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
	render_site()
	copy_static_dir()
	copy_htaccess()

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