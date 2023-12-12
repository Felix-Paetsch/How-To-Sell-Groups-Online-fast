Urls are important mainly for importing css and js. There are the following types of urls:

## Dependencies
Although not quite an URL dependencies are the things specified in Templates/css_dependencies and Templates/js_dependencies.
They should only constis of [a-zA-Z], "-" and "_".
Note that dependencies cannot be used in dependencies themselfes.

## Absolute links
Links starting with `http` or `https`, will be left as is.

## Relative to Website base path
Use "§/" to mean a path relative to the website base path. So assuming your website runs on `localhost:3000`, the following urls will be translated as:

§/css/general/footer.css
-> localhost:3000/css/general/footer.css

§/js/general/changeclass.js
-> localhost:3000/js/general/changeclass.js

Note that this actually refers to the files in `Server/public`

## Relative to Templates
Use "$/" to mean relative to the `css_dependencies` or `js_dependencies` inside the `Templates` folder. So the following urls will be refering to:

$/abc/stuff.css
-> Templates/css_dependencies/abc/stuff.css

$/hello.js
-> Templates/js_dependencies/hello.js

Note that this actually will be translated, assuming we run on localhost:3000, to

$/abc/stuff.css
-> localhost:3000/article_imports/abc/stuff.css

Refering to files inside `Server/public/article_imports``