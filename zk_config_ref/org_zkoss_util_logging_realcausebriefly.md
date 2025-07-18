**Property:**

`org.zkoss.util.logging.realCauseBriefly`

`Default: 6`  
{% include version-badge.html version=3.6.1 %}

It defines the number of lines to log an error message.

If nonpositive is specified, the full stack traces are logged. Notice
that \# of lines don't include packages starting with `java`, `javax`,
`sun`, or `bsh`.
