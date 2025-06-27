ZK framework includes a customized jQuery library. Replacing that
bundled jQuery in ZK to solve its security vulnerability isn't an
option. This is because ZK and jQuery are deeply integrated with
zk-specific customizations. Also, JQuery introduces breaking changes
between major versions. Simply replacing jQuery won’t work.

To address this, please upgrade ZK to a patched or non-affected version.

<table>
<thead>
<tr class="header">
<th><center>
<p>ZK version</p>
</center></th>
<th><center>
<p>Bundled jQuery Status</p>
</center></th>
<th><center>
<p>Fixed Vulnerabilities</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>9.1.0 or above</p></td>
<td><p>3.5.1</p></td>
<td><ul>
<li><a
href="https://nvd.nist.gov/vuln/detail/CVE-2020-11022">CVE-2020-11022</a>
– Affects jQuery versions &gt;= 1.2 and &lt; 3.5.0,</li>
<li><a
href="https://nvd.nist.gov/vuln/detail/CVE-2020-11023">CVE-2020-11023</a>
– Affects jQuery versions &gt;= 1.0.3 and &lt; 3.5.0,</li>
</ul></td>
</tr>
<tr class="even">
<td><p>9.0.0</p></td>
<td><p>1.12.4</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>8.6.4.1<br />
8.6.3.1<br />
8.6.0.2<br />
8.5.1.3<br />
8.5.0.1</p></td>
<td><p>1.10.2 with security patches</p></td>
<td><ul>
<li><a
href="https://nvd.nist.gov/vuln/detail/CVE-2015-9251">CVE-2015-9251</a>
(<a href="https://tracker.zkoss.org/browse/ZK-3724">ZK-3724</a>) –
Affects jQuery versions &lt; 3.0.0</li>
<li><a
href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-11358">CVE-2019-11358</a>(<a
href="https://tracker.zkoss.org/browse/ZK-4599">ZK-4599</a>) – Affects
jQuery versions &lt; 3.4.0</li>
</ul></td>
</tr>
</tbody>
</table>

You can check the zk-bundled jQuery version by this JS variable
`jq.fn.jquery`.
