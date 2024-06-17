# Overview

By default, the 2-digit year start is set to 1929.

However, you can configure it different, and it will affect how
[datebox](ZK_Component_Reference/Input/Datebox) and
[calendar](ZK_Component_Reference/Input/Calendar) components
behave.

The 2-digit year start is used for the format with "yy" pattern only,
change the parse result in the 100 years span after that year. For
example, 2 digit year start 1950 will parse \[0-49\] : 2000-2049 and
\[50-99\] : 1950-1999

If a property called `org.zkoss.web.preferred.2DigitYearStart` defined
in the library property (i.e.,
<javadoc>org.zkoss.lang.Library</javadoc>). If so, use it.

## 2DigitYearStart

Only allow positive integer. For example:

``` xml
<library-property>
    <name>org.zkoss.web.preferred.2DigitYearStart</name>
    <value>1950</value>
</library-property>
```

# Version History

| Version | Date     | Content                                    |
|---------|----------|--------------------------------------------|
| 8.6.2   | May 2019 | The the 2 digit year start is configurable |
