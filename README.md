# MylesB.ca

![Screenshot of MylesB.ca](/designs/screenshot.png?raw=true "Screenshot of MylesB.ca")

Hi! This is the source code for [my homepage](https://mylesb.ca/ "Myles Braithwaite"). It
uses the Node.js static web site generator [Assemble](http://assemble.io/) and a bunch of
other Grunt tasks (see the [package.json](package.json) for more information).

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

## Development Environment Setup

You can run `./script/bootstrap` in the project path to setup your environment.

The following is a step by step guide for developing [my homepage](https://mylesb.ca "Myles Braithwaite").

### Requirements

* Node.js
* Ruby
* Bower - `sudo npm install -g bower`
* Grunt - `sudo npm install -g grunt-cli`
* SASS - `sudo gem install sass`
* scss-lint - `sudo gem install scss_lint`

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