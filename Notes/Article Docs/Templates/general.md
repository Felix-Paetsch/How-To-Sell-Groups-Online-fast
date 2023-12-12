This folder is for development of tags and their functionality. It contains the following subfolder:

## 1. Article templates
Different templates for article pages. Currently only for having an article on the server.
Potentially later there is also be a template for self contained pages.
We will have to figure out which kinds of data are send with for each article independently.

## 2. CSS dependencies
This folder contains css dependencies one can require. Either a single file or a group of files. The dependencies which are groups of files or a shortcut for files are listed in

```json dependency_map.json
    {
        "dependency_name": "file", // single string
        "dependency_name2": ["list_of_files"], // array of strings
    }
```

The file names follow the typical url naming convention. You can deposit CSS files inside this folder and subfolders.

## 3. JS dependencies
The same as CSS dependencies really. Note that if CSS and JS have the same dependency name and it is included, then both are included

## 4. Tags
Here are the custom tags specified like `Example` or `Important`.
For each tag you have a folder that contains:

- .ejs  file
- .json file
- .css  file (optional)
- .js   file (optional)


### JSON file
The json file should look like:

```json
    {
        "name": "Beispiel",     
            // Component name
            // If you want to be a child of a component,
            // use Parent::MyName
        "attr": [],             // Array of attributes
        "string_attributes": 0, 
            // Either int or [min, max], (-1 = infty)
            //  How many string attributes the component takes
        "dependencies": [
            // List of typical url / dependency naming convention;
            // JS and CSS will be included (once)
        ],
        "options": [
            // Default: []
        ]
    }
```

#### Attribues
You can specify attributes as follows

- Simple string (boolean, default: false)

    ```json
        {
            "attr": ["colorfull"]
        }
    ```

- Enum

    ```json
        {
            "attr": [{
                "name": "colorfull",
                "enum_values": ["color-yes", "color-no"]
            }]
        }
    ```

- Values
    ```json
        {
            "attr": [{
                "name": "colorfull",
                "options": ["value"]
            }]
        }
    ```

Default values: 
```t
    string_attr: False (otherwise True)
    enum: The first one (as string)
    with_value: null
```

#### general
In general, you can always add a "descr" key to the attribute. Even if it is just a simple string:

```json
    {
        "attr": [{
            "name": "colorfull",
            "descr": "This is what the attribute does"
        }]
    }
```

You can also add the string "required" to the options of an attribute to make it mandatory.

#### options
The current supported options are:
(Wanna-be supported)

```js
    "allow_only_children" 
    // Only child elements can start with Parent Prefix
    "general_purpose"
    // Allow to be refered to outside of parents
```

### CSS && JS files
The CSS and JS are optional. They are inserted once, right before the first occurence of the tag in the dom. Additionally, they JS is wrapped in "{}".

### EJS file
The meat of the tag. The .ejs file gets passed data to render itself. See ejs.md

## 5. STD tags
These tags are specified just like normal tags. However they have there own designated syntax and parsed types instead of the typical "tag".
The main example is a list which is specified by

```
    - Nummerated List
    * Unnummerated List
```

Note that their specifying json file looks a little bit different:

```json
    {
        "parsed_name": "LIST",
        "dependencies": [
            // List of typical url / dependency naming convention;
            // JS and CSS will be included (once)
        ],
        "custom_children": true
            // Information out whether it hase children to render or handles them differently
            // Mainly just useful to know
    }
```

The main purpose of the json file is to inform on later inspection, since there wount be many STD tags.
Maybe add a md file for which attributes get send with.