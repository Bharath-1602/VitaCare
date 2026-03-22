# VitaCare Microservices Deployment Guide (AWS EC2 - Ubuntu)

This guide covers the step-by-step process of deploying the VitaCare Healthcare Microservices application on an AWS EC2 instance running Ubuntu.

## Prerequisites

1. An **AWS Account**.
2. An **EC2 Instance** running **Ubuntu 22.04 LTS**.
3. A Security Group with the following inbound ports open:
   - `22` (SSH)
   - `80` (HTTP - Frontend & API Gateway)
   - `443` (HTTPS - Optional, for SSL)
   - `3001` to `3009` (Optional, if you want direct access to services. Best practice is to block these from the internet and route everything through port 80).

---

## Step 1: Connect to your EC2 Instance

Open your terminal and connect using SSH and your key pair:

```bash
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

---

## Step 2: Install Docker & Docker Compose

Run the following commands to update your system and install Docker:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install prerequisites
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y

# Add ubuntu user to docker group (so you don't need sudo for docker commands)
sudo usermod -aG docker ubuntu
```

> **Note:** Log out and log back in (or run `newgrp docker`) for the group changes to take effect.

Install Docker Compose:

```bash
# Download the latest version of Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

---

## Step 3: Clone the Repository

Clone your project to the EC2 instance. (Assuming your code is in a Git repository):

```bash
git clone https://github.com/your-username/VitaCare.git
cd VitaCare
```

---

## Step 4: Configure Environment Variables

Create a `.env` file in the root of the project (if not already present or ignored by git):

```bash
nano .env
```

Add the following (replace `JWT_SECRET` with a secure random string):

```env
JWT_SECRET=your_super_secure_jwt_secret_key_here

# MongoDB URIs
MONGO_URI_USERS=mongodb://mongo-users:27017/vitacare_users
MONGO_URI_DOCTORS=mongodb://mongo-doctors:27017/vitacare_doctors
MONGO_URI_PATIENTS=mongodb://mongo-patients:27017/vitacare_patients
MONGO_URI_APPOINTMENTS=mongodb://mongo-appointments:27017/vitacare_appointments
MONGO_URI_VITALS=mongodb://mongo-vitals:27017/vitacare_vitals
MONGO_URI_FORUM=mongodb://mongo-forum:27017/vitacare_forum
MONGO_URI_COMPLAINTS=mongodb://mongo-complaints:27017/vitacare_complaints

# Ports
USER_SERVICE_PORT=3002
DOCTOR_SERVICE_PORT=3005
REGISTRATION_SERVICE_PORT=3004
APPOINTMENT_SERVICE_PORT=3001
VITAL_SIGNS_SERVICE_PORT=3003
FORUM_SERVICE_PORT=3007
COMPLAINT_SERVICE_PORT=3008
ADMIN_SERVICE_PORT=3009
```
Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

---

## Step 5: Build and Run Containers

Now build and start all the services using Docker Compose:

```bash
# Build the images (this takes a few minutes)
docker-compose build

# Start all containers in detached mode
docker-compose up -d
```

---

## Step 6: Verify Deployment

Check the status of all running containers:

```bash
docker-compose ps
```

You should see 9 microservice containers, 7 mongo containers, the frontend, and the API gateway running.

Check logs to ensure databases connected properly:
```bash
docker-compose logs user-management-service
```

### Accessing the Application

1. Open your web browser.
2. Navigate to `http://your-ec2-public-ip`
3. You should see the VitaCare frontend. The Nginx API gateway handles routing all `/api/*` traffic automatically to the correct microservice running on the backend network.

---

## Troubleshooting

- **Containers failing to start**: Check memory. EC2 instances with 1GB RAM (t2.micro) might struggle with 17 simultaneous containers. We recommend at least a **t3.medium (4GB RAM)** for running this full architecture smoothy.
- **Permission Denied for Docker**: Ensure you ran `newgrp docker` or logged out/in after adding the ubuntu user to the docker group.
- **Can't access site**: Verify the EC2 Security Group allows inbound HTTP traffic on port 80 from `0.0.0.0/0`.
