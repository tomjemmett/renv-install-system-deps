'use strict';

const core = require('@actions/core');

const fs = require('fs');
const got = require('got');
const { exec } = require('child_process');

let unique = (a) => [...new Set(a)];

async function getDependencies() {
  let rawdata = fs.readFileSync('renv.lock');
  let renv = JSON.parse(rawdata);

  let packages = Object.entries(renv.Packages).filter(([k, v]) => v.Source == 'Repository').map(([k, v]) => k);

  let url = 'https://packagemanager.rstudio.com/__api__/repos/1/sysreqs?all=false' +
    '&distribution=ubuntu&release=22.04' +
    packages.reduce((p, c) => p + '&pkgname=' + c, '');

  try {
    const response = await got(url, { json: true });

    let r = response.body.requirements.flatMap(o => o.requirements.install_scripts);
    return unique(r).reduce((p, c) => p + 'sudo ' + c + '\n', '');
  } catch (error) {
    core.setFailed(error.response.body);
  }
}

async function installDependencies() {
  let deps = await getDependencies();

  if (error) {
    core.setFailed(error.message);
    return;
  }
  if (stderr) {
    core.setFailed(stderr);
    return;
  }
  console.log(stdout);
}

installDependencies();