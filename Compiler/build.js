"use strict";

const fs = require('fs');
const path = require('path');


// Delete rendered sections
deleteDirectoryContents(path.join(__dirname, '../', 'Server', "views", "sections", "rendered_sections")); 

// Delete article imports from server
deleteDirectoryContents(path.join(__dirname, '../', 'Server', "public", "section_dependencies")); 

const inputFolder = path.join(__dirname, '../', 'ScriptSections');
const buildFolder = path.join(__dirname, '../', 'Server', "views", "sections", "rendered_sections");

const uidGen = uidGenerator();
const mdFiles = getAllFilesOfType(inputFolder, ".md");

for (const mdFile of mdFiles) {
    const fileContent = fs.readFileSync(mdFile, 'utf-8').replace(/\r/g, "");

    const { rendered_content, attributes } = require("./compile.js")(fileContent, mdFile);

    const fileNameWithoutExt = path.basename(mdFile, '.md');
    const uid = uidGen.next().value;
    const newFileName = `${fileNameWithoutExt}-${uid}.ejs`;

    fs.writeFileSync(path.join(buildFolder, newFileName), rendered_content);
}

// Copy JS and CSS dependencies from template
const cssDependenciesSource = path.join(__dirname, '../Templates/css_dependencies');
const jsDependenciesSource = path.join(__dirname, '../Templates/js_dependencies');
const destination = path.join(__dirname, '../Server/public/section_dependencies');
copyFiles(cssDependenciesSource, destination);
copyFiles(jsDependenciesSource, destination);

function copyFiles(source, destination){
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    // Read all files and directories in the source directory
    const items = fs.readdirSync(source);

    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const destinationPath = path.join(destination, item);

        // Check if it's a directory
        const stat = fs.statSync(sourcePath);
        if (stat.isDirectory()) {
            // Create a new directory in the destination
            fs.mkdirSync(destinationPath);
            // Recursive call to copy files in the current directory
            copyFiles(sourcePath, destinationPath);
        } else {
            // Simply copy the file
            fs.copyFileSync(sourcePath, destinationPath);
        }
    });
};

function deleteDirectoryContents(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            deleteDirectoryContents(filePath);
            fs.rmdirSync(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    }
}

function getAllFilesOfType(dir, file_type, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getAllMdFiles(filePath, file_type, fileList);
        } else {
            if (path.extname(file) === file_type) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

function* uidGenerator() {
    let index = 0;
    while (true) {
        yield index.toString(36); // Using base36 for shorter representation
        index++;
    }
}

function get_attr(name, attributes, def = null){
    const res = attributes.filter(a => a.name.toLowerCase() == name.toLowerCase())[0];
    if (typeof res !== "undefined") {
        return [true, res]
    };
    return [false, def];
}