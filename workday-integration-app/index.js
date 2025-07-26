const axios = require('axios');

async function fetchCustomReport(reportPath) {
  const { WORKDAY_BASE_URL, WORKDAY_USERNAME, WORKDAY_PASSWORD } = process.env;
  if (!WORKDAY_BASE_URL || !WORKDAY_USERNAME || !WORKDAY_PASSWORD) {
    console.error('Missing WORKDAY_BASE_URL, WORKDAY_USERNAME or WORKDAY_PASSWORD environment variables');
    process.exit(1);
  }

  const url = `${WORKDAY_BASE_URL}/ccx/service/customreport2/${reportPath}`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: WORKDAY_USERNAME,
        password: WORKDAY_PASSWORD
      }
    });
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error('Failed to fetch report:', err.message);
  }
}

const [reportPath] = process.argv.slice(2);

if (!reportPath) {
  console.log('Usage: node index.js TENANT/REPORT_NAME');
  process.exit(0);
}

fetchCustomReport(reportPath);
