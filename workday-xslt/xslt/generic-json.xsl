<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:wd="urn:com.workday/bsvc">

  <xsl:output method="text" />

  <xsl:template match="/">
    {
    <xsl:apply-templates select="*"/>
    }
  </xsl:template>

  <xsl:template match="*">
    "<xsl:value-of select="local-name()" />": {
    <xsl:for-each select="*">
      "<xsl:value-of select="local-name()" />": "<xsl:value-of select="text()" />"<xsl:if test="position() != last()">,</xsl:if>
    </xsl:for-each>
    }<xsl:if test="position() != last()">,</xsl:if>
  </xsl:template>

</xsl:stylesheet>
