# Workday XSLT Transformations

This directory provides simple XSLT stylesheets and a Node.js script for transforming Workday XML. These examples can convert common objects such as Workers to more readable HTML or JSON.

## Setup

Install dependencies:

```bash
npm install
```

## Usage

Run the transformer with an XML file and an XSL stylesheet:

```bash
node transform.js path/to/input.xml xslt/worker-to-html.xsl
```

The output is printed to STDOUT so you can redirect it to a file or pipe it into another tool.

These stylesheets are intentionally simple. They can be extended for other Workday objects and combined with a frontend or Workday Extend app to present report data.
