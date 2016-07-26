# Usage

Set the environment variables
- export CONFLUENCEURL=https://<username>:<password@host
- export PROXYURL=http://<username>:<password@host

Then run

```
gulp -s <source directory with svg files> -t <target directory where svg files are moved to>
```

Gulp will poll the source directory looking for svg files.
It will convert them to png and upload to confluence.

This is used to synchronize diagrams from Sparx EA into confluence.
