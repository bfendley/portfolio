const axios = require('axios');
const inquirer = require('inquirer');
const { create } = require('xmlbuilder2');

async function fetchCustomReport(reportPath) {
  const { WORKDAY_BASE_URL, WORKDAY_USERNAME, WORKDAY_PASSWORD } = process.env;
  if (!WORKDAY_BASE_URL || !WORKDAY_USERNAME || !WORKDAY_PASSWORD) {
    throw new Error('Missing WORKDAY_BASE_URL, WORKDAY_USERNAME or WORKDAY_PASSWORD');
  }
  const url = `${WORKDAY_BASE_URL}/ccx/service/customreport2/${reportPath}`;
  const response = await axios.get(url, {
    auth: { username: WORKDAY_USERNAME, password: WORKDAY_PASSWORD }
  });
  return response.data;
}

function buildSoap(workerId, field, value) {
  return create({ version: '1.0', encoding: 'UTF-8' })
    .ele('soapenv:Envelope', {
      'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:wd': 'urn:com.workday/bsvc'
    })
    .ele('soapenv:Body')
    .ele('wd:Put_Worker_Request')
    .ele('wd:Worker_Reference')
    .ele('wd:ID', { 'wd:type': 'Employee_ID' }).txt(workerId).up().up()
    .ele('wd:Worker_Data')
    .ele(`wd:${field}`).txt(value)
    .end({ prettyPrint: true });
}

async function sendSoap(xml) {
  const { WORKDAY_BASE_URL, WORKDAY_USERNAME, WORKDAY_PASSWORD } = process.env;
  const url = `${WORKDAY_BASE_URL}/ccx/service/put`;
  const headers = { 'Content-Type': 'text/xml' };
  const response = await axios.post(url, xml, {
    auth: { username: WORKDAY_USERNAME, password: WORKDAY_PASSWORD },
    headers
  });
  return response.data;
}

async function main() {
  const reports = [
    { name: 'Sample Worker Report', path: 'tenant/Worker_Report' }
  ];

  const { report } = await inquirer.prompt({
    type: 'list',
    name: 'report',
    message: 'Choose a RaaS report',
    choices: reports.map(r => ({ name: r.name, value: r.path }))
  });

  const data = await fetchCustomReport(report);
  const first = Array.isArray(data) ? data[0] : data;
  console.log('Sample data:');
  console.log(JSON.stringify(first, null, 2));

  const answers = await inquirer.prompt([
    { type: 'input', name: 'workerId', message: 'Worker ID to update:' },
    { type: 'input', name: 'field', message: 'Field to change (e.g. Last_Name):' },
    { type: 'input', name: 'value', message: 'New value:' },
    { type: 'confirm', name: 'send', message: 'Send SOAP request?', default: false }
  ]);

  const xml = buildSoap(answers.workerId, answers.field, answers.value);
  console.log('SOAP message:\n', xml);

  if (answers.send) {
    try {
      const resp = await sendSoap(xml);
      console.log('Response:\n', resp);
    } catch (err) {
      console.error('Failed to send SOAP request:', err.message);
    }
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Error:', err.message);
  });
}
