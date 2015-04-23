Kurento One2One widget
======================


Build
-----

Be sure to have installed [Node.js](http://node.js) and [Bower](http://bower.io)
in your system. For example, you can install it on Ubuntu and Debian running the
following commands:

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g bower
```

Install other npm dependencies by running:

```bash
npm install
```

For build the widget you need download grunt:

```bash
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

Settings and Usage
------------------

### Preferences

- **HTML Verb**: Method/verb to use for retrieving web pages.
- **Base URL**: It will be used by the widget to build URL.
- **Home page URL**: It will be loaded when we click in the "Home" link.
- **Autorefresh period (minutes)**: Refreshing interval in minutes. You can use 0 for making this widget not autorefresh web pages.
- **Use Proxy**: Use WireCloud proxy to retreive web pages.

### Wiring

#### Input Endpoints:

- **URL**: The url to load. Example: `www.imdb.com/find?q=`
- **Parameters**: Parameters of the url. Example: `avatar`

#### Output Endpoints:

N/A

Copyright and License
---------------------

Copyright 2012-2015 CoNWeT Lab., Universidad Politecnica de Madrid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
