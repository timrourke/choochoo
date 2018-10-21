Vagrant.configure("2") do |config|
  # Use Ubuntu 16.04 as our base image
  config.vm.box = "ubuntu/xenial64"

  # Define a static IP for this machine
  # IMPORTANT: add this IP to your /etc/hosts file on your host OS
  config.vm.network "private_network", ip: "192.168.50.4"

  # Forward port 80 and 443 to localhost
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 443, host: 4443


  # Install python, an Ansible dependency
  config.vm.provision :shell, :inline => "sudo apt-get update && sudo apt-get install -y python"

  # Provision the machine with Ansible
  config.vm.provision :ansible do |ansible|
    ansible.inventory_path = "ansible/ansible_hosts"
    ansible.playbook = "ansible/playbook.yml"
    ansible.limit = "choochoo_local"
  end

  config.vm.synced_folder "./api", "/var/www/api",
	id: "api",
	type: "nfs"

  config.vm.synced_folder "./frontend", "/var/www/frontend",
	id: "frontend",
	type: "nfs"
end
