# SVN Repository

Depending on the branch you want, you could check out the source codes
from the following paths.

| Version              | URL                                                              | Description                                                                                                                                                                                               |
|----------------------|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.\* (current)     | <https://zk1.svn.sourceforge.net/svnroot/zk1/branches/5.0/>      | The 5.0 branch. It is the working repository for the most up-to-date source codes for current ZK 5                                                                                                        |
| 6.0.\* (upcoming)    | <https://zk1.svn.sourceforge.net/svnroot/zk1/branches/6.0/>      | The 6.0 branch. It is the working repository for the most up-to-date source codes for upcoming ZK 6                                                                                                       |
| 3.6.\* (maintaining) | <https://zk1.svn.sourceforge.net/svnroot/zk1/trunk/>             | The 3.6 branch. It is the working repository for the most up-to-date source codes for maintaining ZK 3.6. Though it is named *trunk*, it is used only for the 3.6 branch now.                             |
| 3.0.\* (maintaining) | <https://zk1.svn.sourceforge.net/svnroot/zk1/branches/3.0/>      | The 3.0 branch. It is the working repository for the most up-to-date source codes for maintaining ZK 3.0                                                                                                  |
| 2.4.\* (maintaining) | <https://zk1.svn.sourceforge.net/svnroot/zk1/branches/2.4/>      | The 2.4 branch. It is the working repository for the most up-to-date source codes for maintaining ZK 2.4                                                                                                  |
| Releases (frozen)    | https://zk1.svn.sourceforge.net/svnroot/zk1/releases/*x*.*y*.*z* | The releases. We won't change the code in this repository. The URL depends on the version you want to check out. For a complete list, please visit <http://zk1.svn.sourceforge.net/viewvc/zk1/releases/>. |

# Maven Build

Since ZK 5.0.5 release, we put an Eclipse project setting into each
submodule folder, such as *zk*, *zul*, *zkdemo*, and so on. After that
time, you can check out the source code from the SVN path above as an
Eclipse Maven project to develop/build it. Or you can use Maven command
line to build the ZK Jar files.

For example,

```bash
$ svn checkout https://zk1.svn.sourceforge.net/svnroot/zk1/releases/5.0.5/zul zul
$ cd zul
$ mvn clean package
```

**See Also**

- [{{site.baseurl}}/zk_installation_guide/maven_setup]({{site.baseurl}}/zk_installation_guide/maven_setup)
