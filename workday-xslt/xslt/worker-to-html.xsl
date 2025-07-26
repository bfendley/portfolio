<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes" />

  <xsl:template match="/">
    <html>
      <body>
        <h2>Workers</h2>
        <table border="1">
          <tr>
            <th>Worker ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
          <xsl:apply-templates select="//wd:Worker" xmlns:wd="urn:com.workday/bsvc" />
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="wd:Worker" xmlns:wd="urn:com.workday/bsvc">
    <tr>
      <td><xsl:value-of select="wd:Worker_ID"/></td>
      <td><xsl:value-of select="wd:Personal_Data/wd:Name_Data/wd:Formatted_Name"/></td>
      <td><xsl:value-of select="wd:Work_Contact_Data/wd:Internet_Email_Address"/></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>
