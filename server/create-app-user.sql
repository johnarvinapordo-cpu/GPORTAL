CREATE DATABASE IF NOT EXISTS cmdi_portal;

CREATE USER IF NOT EXISTS 'cmdi_app'@'localhost' IDENTIFIED BY 'cmdi_app_password';
CREATE USER IF NOT EXISTS 'cmdi_app'@'127.0.0.1' IDENTIFIED BY 'cmdi_app_password';

GRANT ALL PRIVILEGES ON cmdi_portal.* TO 'cmdi_app'@'localhost';
GRANT ALL PRIVILEGES ON cmdi_portal.* TO 'cmdi_app'@'127.0.0.1';

FLUSH PRIVILEGES;
