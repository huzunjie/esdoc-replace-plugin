# copy file

> A copyfile plugin for ESDoc.

Config example：
```
{
  "title": "example",
  "source": "./src",
  "destination": "./esdoc" ,
  "plugins": [{
    "name": "esdoc-replace-plugin",
    "option": [{
      "filepath": "./esdoc/css/style.css",
      "rules": [{
        "substr": "./esdoc/css",
        "replacement": "val"
      },{
        "regexp": "test(\\d+)",
        "replacement": "testNum"
      }]
    }]
  }]
}
```