# MylesB.ca

![Screenshot of MylesB.ca](/designs/screenshot.png?raw=true "Screenshot of MylesB.ca")

Hi! This is the source code for [my homepage](https://mylesb.ca/ "Myles Braithwaite"). It
uses the Node.js static web site generator [Assemble](http://assemble.io/) and a bunch of
other Grunt tasks (see the [package.json](package.json) for more information).

## Usage

You will need to have Node.js, NPM, and Grunt installed to work on this website.

### `grunt build`

This command will build the web site.

### `grunt develop`

This command will build and run a simple web server for viewing the web site locally.

### `grunt deploy`

This command will build, compress, and deploy the web site.

## Development Environment Setup

The following is a setup guide for developing [my homepage](https://mylesb.ca "Myles Braithwaite").

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