# Workday Integration App

This Node.js application fetches data from a Workday custom report. It uses Basic Authentication with credentials provided via environment variables.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the following environment variables:
   - `WORKDAY_BASE_URL` – Workday tenant base URL, e.g. `https://wd5-impl-services1.workday.com`
   - `WORKDAY_USERNAME` – integration user name
   - `WORKDAY_PASSWORD` – integration user password

## Usage

Run the script with the path to a custom report:

```bash
node index.js TENANT/REPORT_NAME
```

The script sends a GET request to
`$WORKDAY_BASE_URL/ccx/service/customreport2/TENANT/REPORT_NAME`
and prints the JSON response.

This utility can be adapted to other Workday REST endpoints or incorporated into larger integration workflows.
