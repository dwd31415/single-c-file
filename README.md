Single-C-File
=============

Single-C-File was built to merge large numbers of c or c++ source code files into one single .cxx file.
This is usefull for various reasons:
* To use the .cxx file as a replacement for cross platform libraries
* To slim down then build process
* To make sharing code easier

Features
========
what can you do with Single-C-File?
* Merge C/C++ files(Obviously)
* Integrate all headers into the file(except you don't want that)
* Organize the file with the build in header tracking system

How cam Single-C-File be used?
* On Standalone machines using Node.js
* Integrated into cloud build system(using Node.js)
* Actually on any platform where Node.js runs.

How to get started?
==================

Getting Started is fairly easy, you just have to add file to your project, that contains the relative paths of all your source files, they must be seperated by newlines.This file is your project definition file. Than copy the single-c-file.js file from this repository to them same folder. Once you have done that, just execute the following command:

<pre><code>
node single-c-file.js project_definiton_filename
</code></pre>

It will genterate a file called [project_definiton_filename]_merged.cxx, you can now compile this file with any c++ compiler.
If you don't want to merge your headers into the file, than add this argument at the end of the command:
<pre><code>
dontImportHeaders
</code></pre>

Additional Information:
=====================

###What is this Node.js actually?

Node.js is a JavaScript interpreter, that allows you to run .js on your Linux/Mac OS or Windows computer.

###Why JavaScript?

Single-C-File was built with Automated Cloud Builds in mind and is therefore written in a leanguage, that can be run on the web and on standalone computers.


License
=======
Single-C-File is open source. It is released unter the MIT-License.
Please have a look at LICENSE.

