#!/bin/bash

# Установка nodejs
if ! command -v node; then
    packagesNeeded='nodejs'
    if command -v apk;       then apk add --no-cache $packagesNeeded
    elif command -v apt-get; then apt-get install $packagesNeeded
    elif command -v dnf;     then dnf install $packagesNeeded
    elif command -v zypper;  then zypper install $packagesNeeded
    elif command -v yum;     then yum install $packagesNeeded
    else
        echo "Ошибка при установке - необходимо в ручном режиме установить: $packagesNeeded">&2;
        exit 1
    fi
fi

# Установка пакетного менеджера для nodejs - npm
if ! command -v npm; then
    packagesNeeded='npm'
    if command -v apk;       then apk add --no-cache $packagesNeeded
    elif command -v apt-get; then apt-get install $packagesNeeded
    elif command -v dnf;     then dnf install $packagesNeeded
    elif command -v zypper;  then zypper install $packagesNeeded
    elif command -v yum;     then yum install $packagesNeeded
    else
        echo "Ошибка при установке - необходимо в ручном режиме установить: $packagesNeeded">&2;
        exit 1
    fi
fi

# Установка зависимостей приложения
npm ci

# Файл конфигурации для включения в sytemctl

echo "[Unit]
Description=API для АТС в МУ
After=syslog.target network.target

[Service]
Type=simple
User=root
WorkingDirectory=${PWD}
ExecStart=/usr/bin/node server.js

Restart=always

[Install]
WantedBy=multi-user.target" > /lib/systemd/system/api-atc.service

# Установка добавленного конфига
systemctl daemon-reload
systemctl start api-atc.service
systemctl enable api-atc.service
systemctl status api-atc.service
