# MylesB.ca

![Screenshot of MylesB.ca](/designs/screenshot.png?raw=true "Screenshot of MylesB.ca")

Hi! This is the source code for [my homepage](https://mylesb.ca/ "Myles Braithwaite"). It uses the Node.js static web site generator [Assemble](http://assemble.io/) and a bunch of other Grunt tasks (see the [package.json](package.json) for more information).

## Objectives

1. A webpage for linking to all my other webpages and social network profiles.
2. Contact information.
3. [GnuPG Public Key](https://mylesb.ca/gpg/ "Myles Braithwaite's GnuPG Public Key"), [SSH Public Key](https://mylesb.ca/ssh/ "Myles Braithwaite's SSH Public Key"), and [XMPP OTR Fingerprints](https://mylesb.ca/otr "Myles Braithwaite's XMPP OTR Fingerprints") information page.
4. List of my avatars.

## Development Environment Setup

You can run `./script/bootstrap` in the project path to setup your environment.

The following is a step by step guide for developing [my homepage](https://mylesb.ca "Myles Braithwaite").

### Requirements

* [Node.js](https://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/)
* [Bower](https://bower.io/) - `sudo npm install -g bower`
* [Grunt](http://gruntjs.com/) - `sudo npm install -g grunt-cli`
* [SASS](http://sass-lang.com/) - `sudo gem install sass`
* [scss-lint](https://github.com/brigade/scss-lint) - `sudo gem install scss_lint`

### Clone the Repository

```shell
$ git clone git@github.com:myles/mylesb.ca.git mylesb.ca
$ cd mylesb.ca
mylesb.ca $ 
```

### Install the Dependencies

Install the Node.js dependencies:

```shell
mylesb.ca $ npm install
```

Install the Bower assets:

```shell
mylesb.ca $ bower install
```

## Usage

You will need to have Node.js, NPM, and Grunt installed to work on this website.

### `grunt build` or `./script/build`

This command will build the web site.

### `grunt develop` or `./script/server`

This command will build and run a simple web server for viewing the web site locally.

### `grunt test` or `./script/test`

This command will run the tests.

### `grunt deploy` or `./script/deploy`

This command will build, compress, and deploy the web site.