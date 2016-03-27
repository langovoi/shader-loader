"use strict";
var path = require("path");
var fs = require("fs");

var regExpIncludeLine = "(^#include\\s+<([\\w\\\/.]+)>$)";

module.exports = shaderLoader;

function shaderLoader(shader) {
    var _this = this;
    _this.cacheable && _this.cacheable();
    var callback = _this.async();
    var firstShader = shader;
    var basePath = _this.context;
    var includes = {};

    var regExp = new RegExp(regExpIncludeLine, "gmi");

    parseCode(firstShader)
        .then(function (finalShader) {
            callback(null, "module.exports = " + JSON.stringify(finalShader));
        })
        .catch(function (error) {
                _this.emitError(error);
                callback(error);
            }
        );

    function parseCode(fileContent) {
        return new Promise(function (resolve, reject) {
            var localImports = [];
            var match;

            while ((match = regExp.exec(fileContent)) !== null) {
                localImports.push({
                    statement: match[1],
                    relativePath: match[2]
                });
            }
            var importsFoundNum = localImports.length;
            var importsLeft = localImports.length;

            while (localImports.length != 0) {
                var includeLine = localImports.pop();
                var importStatement = includeLine.statement;
                var relativePath = includeLine.relativePath;
                var includeFilePath = path.resolve(basePath, relativePath);

                checkErrors(includeFilePath);

                _this.addDependency(includeFilePath);
                (function (includeFilePath, importStatement) {
                    fs.readFile(includeFilePath, "utf-8", function (err, includeFileContent) {
                        if (err) {
                            var errMsg = ["Can't open the include", includeFilePath, "\n" + err.toString()].join(" ");
                            throw new Error(errMsg);
                        } else {
                            parseCode(includeFileContent)
                                .then(function (_content) {
                                    fileContent = fileContent.replace(importStatement, _content);
                                    importsLeft--;
                                    if (importsLeft == 0) resolve(fileContent);
                                })
                                .catch(function (error) {
                                    reject(error);
                                });
                        }
                    });
                }(includeFilePath, importStatement));
            }
            if (importsFoundNum == 0) resolve(fileContent);
        });
    }

    function checkErrors(includeFilePath) {
        if (includes.hasOwnProperty(includeFilePath)) {
            var errMsg = "Requested twice " + includeFilePath;
            throw new Error(errMsg);
        } else {
            includes[includeFilePath] = 1;
        }
    }
}
