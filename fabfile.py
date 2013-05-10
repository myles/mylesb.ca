#!/usr/bin/env python

import os
import datetime
from glob import glob

from fabric.api import env, puts, local, task, hosts
from fabric.contrib.project import rsync_project

from jinja2 import Environment, FileSystemLoader

env.hosts = ['nfs-myles-myles']
env.use_ssh_config = True
env.remote_path = '/home/public'
env.output_path = os.path.abspath('./_output/')
env.site_path = os.path.abspath('./site/')
env.static_path = os.path.abspath('./static/')
env.template_path = os.path.abspath('./templates/')
env.template_context = {
	'site_url': 'http://mylesb.ca/',
	'now': datetime.datetime.now()
}

def render(template, destination, **kwargs):
	jenv = Environment(loader=FileSystemLoader([env.template_path, env.site_path]))
	
	params = dict(env.template_context, **kwargs)
	params["page_url"] = template
	
	text = jenv.get_template(template).render(params)
	
	with open(destination, "w") as output:
		puts("Rendering: {} to {}".format(template, destination))
		output.write(text.encode("utf-8"))

def render_site():
	file_types = ('**.html', '**.txt')
	
	files_grabbed = []
	
	for file_type in file_types:
		files_grabbed.extend(glob("%s/%s" % (env.site_path, file_type)))
	
	for template in files_grabbed:
		filename = os.path.basename(template)
		render(filename, os.path.join(env.output_path, filename))

def compile_js():
	local("mkdir -p %s/static/js/" % env.output_path)
	local("cat %(static_path)s/js/bootstrap/bootstrap-transition.js %(static_path)s/js/bootstrap/bootstrap-alert.js %(static_path)s/js/bootstrap/bootstrap-button.js %(static_path)s/js/bootstrap/bootstrap-carousel.js %(static_path)s/js/bootstrap/bootstrap-collapse.js %(static_path)s/js/bootstrap/bootstrap-dropdown.js %(static_path)s/js/bootstrap/bootstrap-modal.js %(static_path)s/js/bootstrap/bootstrap-tooltip.js %(static_path)s/js/bootstrap/bootstrap-popover.js %(static_path)s/js/bootstrap/bootstrap-scrollspy.js %(static_path)s/js/bootstrap/bootstrap-tab.js %(static_path)s/js/bootstrap/bootstrap-typeahead.js %(static_path)s/js/bootstrap/bootstrap-affix.js > %(output_path)s/static/js/bootstrap.js" % { 'static_path': env.static_path, 'output_path': env.output_path })

def compile_css():
	local("mkdir -p %s/static/css/" % env.output_path)
	local("lessc %s/less/style.less > %s/static/css/style.css" % (env.static_path, env.output_path))

@task(name="Copy/Compile all the static assests.")
@hosts('localhost')
def copy_static_dir():
	local("mkdir -p %s/static/img/" % env.output_path)
	local("cp %s/img/* %s/static/img/" % (env.static_path, env.output_path))
	
	compile_js()
	compile_css()

def copy_htaccess():
	local ("cp %s/htaccess.htaccess %s/.htaccess" % (env.site_path, env.output_path))

def clean():
	local("rm -fr %s/*" % env.output_path)

@task(aliases=['build', 'build_html'], name="Build web site to HTML")
@hosts('localhost')
def build_html():
	clean()
	local("mkdir -p %s" % env.output_path)
	render_site()
	copy_static_dir()
	copy_htaccess()

@task(name="Deploy web site.")
@hosts('nfs-myles-myles')
def deploy():
	build_html()
	
	rsync_project(
		local_dir=env.output_path + "/",
		remote_dir=env.remote_path,
		delete=True,
		extra_opts='--exclude=".DS_Store"'
	)