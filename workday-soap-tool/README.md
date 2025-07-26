# Workday SOAP Tool

This Node.js CLI helps build and send SOAP requests using data from Workday RaaS (Report-as-a-Service).
It demonstrates how to combine report data with prompts to generate simple inbound integrations.

## Setup

```
npm install
```

Set the same environment variables used by the integration app:

- `WORKDAY_BASE_URL`
- `WORKDAY_USERNAME`
- `WORKDAY_PASSWORD`

## Usage

```
node soap_tool.js
```

The script will:

1. List example RaaS reports to retrieve.
2. Display a snippet of the returned data.
3. Prompt for the worker ID and field to update.
4. Generate a SOAP request and optionally send it to Workday.

This tool is intentionally minimal but provides a foundation for building more advanced automation.
