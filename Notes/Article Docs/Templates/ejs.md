# Docs for the .ejs files in the templates folders
(Strongly interlinkt with the .json file, see Templates)

The ejs file for each component recieves the following object:

```js
    {
        children,
        attr,
        str_attr,
        // meta_data,
        get_uid,
        error
    }
```

## children
An array of children. Each child exposes these relecant attributes:

```json
    {
        "render_self": "function, returns string on render",
        // Maybe we some day want to add that it takes in an object form the parent
        "type": "TEXT || TAG || LIST || HTML_EMBEDDING || JS_EMBEDDING || CSS_EMBEDDING",
        "error": "function, same as this.error",
        "name": "Tag_Name || undefined",
        "is_tag" : "bool",
        "is_tag_child": "bool"
    }
```

## attr
The attributes are a dict:

```js
    attr[attr_name] = {
        is_specified: "bool",
        name: attr_name,
        value: "Attr Value",
        type: "Enum | Value | Bool"
    }
```

## str_attr
An array of string attributes provided by the file. (As strings)

# meta_data
```json
    {
        // Maybe some stuff will be added later
    }
```

## get_uid
A function, returns a uid (string) useful for id's.

## error
A function taking a string as input to throw an error at the line the tag is specified.
