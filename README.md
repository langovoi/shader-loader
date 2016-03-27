# Shader loader

Shader loader (GLSL) for Webpack with recursive import of `#include` statements.

## Installation

`npm install sc0rp1d/shader-loader --save-dev`

## Usage

1. Add to your webpack.config.js
```js
loaders: [
    {
        test: /\.(glsl|fsh|vsh)/,
        loader: "shader"
    }
]
```
2. Now you can use `require` of `import` (ES2015) for `.glsl`, `.fsh` and `.vsh` files
```js
import myShader from "./../shaders/test.glsl";
```
```js
var myShader = require("./../shaders/test.glsl");
```

## Support

Please [open an issue](https://github.com/sc0rp1d/shader-loader/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/sc0rp1d/shader-loader/compare/).

## License

The MIT License (MIT)

Copyright (c) 2016 Mark Langovoi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.