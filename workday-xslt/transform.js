const fs = require('fs');
const xsltProcessor = require('xslt-processor');

function transform(xmlPath, xslPath) {
  const xml = fs.readFileSync(xmlPath, 'utf-8');
  const xsl = fs.readFileSync(xslPath, 'utf-8');

  const doc = xsltProcessor.xmlParse(xml);
  const stylesheet = xsltProcessor.xmlParse(xsl);

  return xsltProcessor.xsltProcess(doc, stylesheet);
}

const [xmlPath, xslPath] = process.argv.slice(2);
if (!xmlPath || !xslPath) {
  console.error('Usage: node transform.js path/to/input.xml path/to/style.xsl');
  process.exit(1);
}

try {
  const result = transform(xmlPath, xslPath);
  console.log(result);
} catch (err) {
  console.error('Transformation failed:', err.message);
  process.exit(1);
}
