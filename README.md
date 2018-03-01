# colorpicker

A color picker react UI component.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@jworkshop/colorpicker.svg
[npm-url]: http://npmjs.org/package/@jworkshop/colorpicker
[travis-image]: https://img.shields.io/travis/JWorkshop/colorpicker.svg
[travis-url]: https://travis-ci.org/JWorkshop/colorpicker
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@jworkshop/colorpicker.svg
[download-url]: https://npmjs.org/package/@jworkshop/colorpicker

## install

[![NPM](https://nodei.co/npm/@jworkshop/colorpicker.png)](https://nodei.co/npm/@jworkshop/colorpicker)

## Usage

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";

import ColorPicker from "@jworkshop/colorpicker";

import "./style.css";

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: { r: 125, g: 125, b: 125, a: 1 }
    };
  }

  render() {
    const { color } = this.state;

    return (
      <ColorPicker
        className="example"
        style: { ... },
        paletteClassName="paletteClassName"
        paletteStyle: { ... },
        dialogWidth={200}
        dialogHeight={190}
        color={color}
        onChange={value => this.setState({ color: value })}
      />
    );
  }
}

ReactDOM.render(<Test />, document.getElementById("root"));
```
