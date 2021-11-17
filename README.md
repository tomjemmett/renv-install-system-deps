# renv-install-system-deps

This action is to be used with `{renv}` and [`r-lib/actions/setup-renv`](https://github.com/r-lib/actions/tree/master/setup-renv). It reads the `renv.lock` file, and passes the list of packages to [rspm](https://packagemanager.rstudio.com/) in order to get a list of system dependencies to install.

Currently this is hard wired to work on Ubuntu 20.04.