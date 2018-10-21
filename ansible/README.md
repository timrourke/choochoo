# Provision scripts for stanleyci

This repository contains the provisioning scripts used for [stanleyci](https://github.com/timrourke/stanleyci), along
with a Vagrantfile to aid in local development.

## Getting Started

### Clone stanleyci

Clone [stanleyci](https://github.com/timrourke/stanleyci) into a folder that is a _sibling_
of this repository on your local filesystem.

### Install Python

If you do not have Python already installed, [go get it here](https://www.python.org/downloads/).

### Install Ansible

You will need to have Ansible installed locally to provision the Vagrant machine
(or a production instance). [Read about installing Ansible here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).

### Vagrant for local development

If you don't already have it, [download Vagrant](https://www.vagrantup.com/downloads.html)
for your preferred platform. Comes with a nice installer, easy to get started.

### VirtualBox for local development

If you don't already have it, [download VirtualBox](https://www.virtualbox.org/wiki/Downloads)
for your preferred platform. Also easy to install.

### Configure your local OS's hosts file

For mac users, you'll want to add a line to your `/etc/hosts` file pointing the
IP address `192.168.50.4` to the hostname `stanleyci.localdev`.

### Vagrant up

Change directories into the folder you cloned this repository into. From there,
run this command:

```bash
vagrant up
```

You should see the Vagrant box download, set itself up, and then run the Ansible
provisioning steps.

If all that shit works, browse to [http://stanley.localdev](http://stanley.localdev)
and you'll see the app.

