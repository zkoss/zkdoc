# Get Your OpenShift Ready

- Apply a new OpenShift account if you don't have a Red Hat Network
  (RHN) account.
- If you prefer to use Eclipse, you can install Eclipse plugin to create
  OpenShift domain and application without following the prerequisites
  and steps listed below. Here is the
  [video](https://www.redhat.com/openshift/community/blogs/deploying-java-apps-to-the-cloud-with-the-openshift-eclipse-plug-in)
  that demonstrates how you can use Eclipse plugin to do so. If you are
  doing so, you do not need to follow the next a few steps.
- Refer to [OpenShift User Guide](https://access.redhat.com/documentation/en-US/OpenShift_Online/2.0/html/Client_Tools_Installation_Guide/index.html)
  for required client tools.
  1.  Prerequisites for Red Hat Enterprise Linux or Fedora:
      - RHEL 6 and up or Fedora 14 and up.
      - Express repo file
        [openshift.repo](https://openshift.redhat.com/app/repo/openshift.repo)
      - View [video walkthrough](http://www.youtube.com/watch?v=KLtbuvyJFFE)
  2.  Prerequisites for Other Linuxes:
      - Root access
      - Ruby 1.8 or higher installed or available to be installed
      - Install the required packages: git, ruby, rubygems, and the ruby
        1.8 development package.
  3.  Prerequisites for Mac:
      - git
  4.  Prerequisites for Windows:
      - [Cygwin](http://www.cygwin.com/) with the following optional
        components:
        - openssh
        - ruby
        - make
        - gcc
        - git
      - [RubyGems](http://rubyforge.org/projects/rubygems)

# Create an OpenShift domain name

Run **rhc-create-domain** command to create an unique domain name for
your application.

```bash
$ rhc-create-domain -n DomainName -l rhlogin -p password
```

- -n ***DomainName*** — specifies the domain that you want to create.
  This must contain a maximum of 16 alphanumeric characters.
- -l ***rhlogin*** — your OpenShift Express or RHN account.
- -p ***password*** — your OpenShift Express or RHN password.

# Create a Maven Application

Run **rhc-create-app** command and OpenShift will create a maven project
with default page automatically.

```bash
$ rhc-create-app -a AppName -t Type -l rhlogin -p password
```

- -a ***AppName*** — The name of the application to create (maximum of
  32 alphanumeric characters).
- -t ***Type*** — The framework type to create. OpenShift Express
  currently supports the following application types:
  - php-5.3 — for PHP applications
  - wsgi-3.2 — for Web Server Gateway Interface applications
  - rack-1.1 — for Ruby Webserver Interface applications
  - perl-5.10 — for Perl applications
  - <span style="color: brown">**jbossas-7.0 — for JBoss AS applications
    (used for ZK project)**</span>
  - raw-0.1 — a raw cartridge type used to create applications of no
    specific type
- -l ***rhlogin*** — your OpenShift Express or RHN account.
- -p ***password*** — your OpenShift Express or RHN password.

Once it is done the application is on the cloud, you can visit
<http://AppName-DomainName.rhcloud.com/> to see the default OpenShift
page.

## Import into Eclipse IDE (Optional)

If you wish to use Eclipse,

- Run the following command to support Eclipse.

```bash
$ mvn eclipse:eclipse
```

- Refer to
  [here](Setting_up_IDE/Maven/Create_and_Run_ZK_Application_with_Maven_Archetype#Import_a_Maven_project_into_Eclipse)
  to import into Eclipse.

# Deploy changes to OpenShift

Once you have created an OpenShift application in your local machine
following the steps above, the application is at the same time deployed
to the cloud. To update and make changes to your application, you have
to make changes in the git directory specified during the application
creation process.  
There are two options to deploy the changes:

## Option 1: Upload contents in a Maven src structure

This option is simple and recommended. Just push the source code with
"git push" command.

```bash
$ cd AppName
$ git add .
$ git commit -a -m "Commit Message"
$ git push origin master
```

Then OpenShift will build your project on cloud. Once it's done you can
visit <http://AppName-DomainName.rhcloud.com/> to see your application.

## Option 2: Upload prebuilt contents

If you do not wish OpenShift to build your project automatically, you
have to remove <b>pom.xml</b> file and all the source code.

```bash
$ cd AppName
$ git rm -r src/ pom.xml
```

Then, copy the pre-built war file into **deployments** folder and rename
it to ROOT.war[^1]

```bash
$ cp target/prebuilt.war deployments/ROOT.war
$ git add .
$ git commit -a -m "Commit Message"
$ git push origin master
```

Once it's done you can visit <http://appName-domainName.rhcloud.com/> to
see the result

------------------------------------------------------------------------

<references/>

# Sample

- \[<http://sourceforge.net/projects/zkforge/files/Small_Talks/ZK_Sandbox_for_OpenShift/>?
  Download\] the sample maven project named openshift_zksandbox.zip.
- Sandbox sample is deployed on OpenShift at
  <http://zksandbox-zksupport.rhcloud.com/>.

[^1]: By default the `warName` is ROOT within the <b>pom.xml</b> file.
    This will render the *webapp* contents at
    <http://app_name-namespace.rhcloud.com>.  
    If you change the `warName` in <b>pom.xml</b> to "*app_name*" or if
    the `warName` in deployments folder is "*app_name.war*", then your
    base URL would become
    <http://app_name-namespace.rhcloud.com/app_name>.
