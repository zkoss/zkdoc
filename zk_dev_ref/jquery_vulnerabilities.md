ZK framework includes a customized jQuery library. Replacing that
bundled jQuery in ZK to solve its security vulnerability isn't an
option. This is because ZK and jQuery are deeply integrated with
zk-specific customizations. Also, JQuery introduces breaking changes
between major versions. Simply replacing jQuery won’t work.

To address this, please upgrade ZK to a patched or non-affected version.

| ZK version | Bundled jQuery Status | Fixed Vulnerabilities |
|------------|----------------------|----------------------|
| 9.1.0 or above | 3.5.1 | <ul><li>[CVE-2020-11022](https://nvd.nist.gov/vuln/detail/CVE-2020-11022) – Affects jQuery versions >= 1.2 and < 3.5.0</li><li>[CVE-2020-11023](https://nvd.nist.gov/vuln/detail/CVE-2020-11023) – Affects jQuery versions >= 1.0.3 and < 3.5.0</li></ul> |
| 9.0.0 | 1.12.4 | |
| 8.6.4.1<br/>8.6.3.1<br/>8.6.0.2<br/>8.5.1.3<br/>8.5.0.1 | 1.10.2 with security patches | <ul><li>[CVE-2015-9251](https://nvd.nist.gov/vuln/detail/CVE-2015-9251) ([ZK-3724](https://tracker.zkoss.org/browse/ZK-3724)) – Affects jQuery versions < 3.0.0</li><li>[CVE-2019-11358](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-11358) ([ZK-4599](https://tracker.zkoss.org/browse/ZK-4599)) – Affects jQuery versions < 3.4.0</li></ul> |

You can check the zk-bundled jQuery version by this JS variable
`jq.fn.jquery`.
