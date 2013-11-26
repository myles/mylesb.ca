#!/usr/bin/env python

import os
import datetime
from glob import glob
from tempfile import tempdir

from fabric.contrib.project import rsync_project
from fabric.api import env, puts, local, task, hosts, execute, runs_once

from jinja2 import Environment, FileSystemLoader

env.hosts = ['nfs-myles-myles', 'panda',]
env.use_ssh_config = True
env.output_path = os.path.abspath('./_output/')
env.site_path = os.path.abspath('./site/')
env.static_path = os.path.abspath('./static/')
env.template_path = os.path.abspath('./templates/')
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
    
    with open(destination, "w") as output:
        puts("Rendering: {} to {}".format(template, destination))
        output.write(text.encode("utf-8"))

def render_site():
    file_types = ('**.html', '**.txt', '**.xml')
    
    files_grabbed = []
    
    for file_type in file_types:
        files_grabbed.extend(glob("%s/%s" % (env.site_path, file_type)))
    
    for template in files_grabbed:
        filename = os.path.basename(template)
        render(filename, os.path.join(env.output_path, filename))

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
    
    local("cp %s/js/sjcl.js %s/static/js/" % (env.static_path, env.output_path))

def copy_htaccess():
    local ("cp %s/htaccess.htaccess %s/.htaccess" % (env.site_path, env.output_path))

def clean():
    local("rm -fr %s/*" % env.output_path)

@task(aliases=['build', 'build_html'])
@hosts('localhost')
def build_site():
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

@hosts('webfaction')
def deploy_webfaction():
    env.user = 'myles'
    rsync_project(
        local_dir=env.output_path + "/",
        remote_dir='/home/myles/webapps/myles',
        delete=True,
        extra_opts='--exclude=".DS_Store"'
    )

@task
@runs_once
def deploy():
    build_site()
    execute(deploy_panda)
    execute(deploy_nfs)
    execute(deploy_webfaction)

