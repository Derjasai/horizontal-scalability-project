# Automatización del Escalado Vertical y Horizontal de Máquinas EC2 para Garantizar Alta Disponibilidad en Aplicaciones Distribuidas 
Proyecto enfocado en buscar asegurar una alta disponibilidad en aplicaciones distribuidas, mediante el uso del 
escalado horizontal y la ubicación en diversas regiones físicas de servicios en la nube de AWS.

# Tecnologias / Prerrequisitos

- Pytohn
- React
- Flask
- Git

# Arquitectura

![image](https://github.com/user-attachments/assets/b561fa28-b7bb-4f01-acf6-efdf9c6c39aa)

Este proyecto utiliza una arquitectura basada en servicios de AWS para garantizar escalabilidad, alta disponibilidad y resiliencia. Toda la infraestructura está soportada dentro de una VPC proporcionando un entorno
seguro al estar aislado de la red y solo permitiendo el flujo de datos mediante el Internet Gateway. Cuando una solicitud es capaz de ingresar por medio del IG llega a un Load Balancer el cual es el encargado de 
gestionar las peticiones para reenviarlas a las diferentes instancias agrupadas en un Target Group. El Auto Scaling Group es el encargado de popular el TG con diversas instancias dependiendo del procentaje de uso de la CPU de
las EC2, las nuevas instancias EC2 que se generarán se harán mediante una plantilla definda en Launch Template. Finlamente, el grupo de instancias de EC2 se comunicaran con una base de datos NoSQL en Dynamo y un Bucket S3 para almacenar imagenes

## Inicialización

El Launchh Template tiene definido el siguiente script

```
#!/bin/bash -ex
git clone https://github.com/Derjasai/horizontal-scalability-project
cd horizontal-scalability-project/FlaskApp/
yum -y install python3-pip
pip install -r requirements.txt
yum -y install stress
export PHOTOS_BUCKET=employee-photo-bucket-project
export AWS_DEFAULT_REGION=us-east-1
export DYNAMO_MODE=on
FLASK_APP=application.py /usr/local/bin/flask run --host=0.0.0.0 --port=80
```

Este script nos permite que en cada instancia nueva que se inicie empiece a correr una aplicacion Flask en Python a ejecutarse por el puerto 80, a su vez se crean algunas variables de entorno. Si desea usar este script como ejemplo es importante tener en cuenta
que la variable `PHOTOS_BUCKET` debe llevar el valor del nombre de su propio BucketS3

# Version
1.0

# Author
Daniel Esteban Ramos Jimenez
