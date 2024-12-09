# Automatización del Escalado Vertical y Horizontal de Máquinas EC2 para Garantizar Alta Disponibilidad en Aplicaciones Distribuidas 
Proyecto enfocado en buscar asegurar una alta disponibilidad en aplicaciones distribuidas, mediante el uso del  escalado horizontal y la ubicación en diversas regiones físicas de servicios en la nube de AWS.

# Tecnologias / Prerrequisitos

- Pytohn
- React
- Flask
- Git

# Arquitectura

![image](https://github.com/user-attachments/assets/b561fa28-b7bb-4f01-acf6-efdf9c6c39aa)

Este proyecto utiliza una arquitectura basada en servicios de AWS para garantizar escalabilidad, alta disponibilidad y resiliencia. Toda la infraestructura está soportada dentro de una VPC proporcionando un entorno seguro al estar aislado de la red y solo permitiendo el flujo de datos mediante el Internet Gateway. Cuando una solicitud es capaz de ingresar por medio del IG llega a un Load Balancer el cual es el encargado de gestionar las peticiones para reenviarlas a las diferentes instancias agrupadas en un Target Group. El Auto Scaling Group es el encargado de popular el TG con diversas instancias dependiendo del procentaje de uso de la CPU de las EC2, las nuevas instancias EC2 que se generarán se harán mediante una plantilla definda en Launch Template. Finlamente, el grupo de instancias de EC2 se comunicaran con una base de datos NoSQL en Dynamo y un Bucket S3 para almacenar imagenes.

## ¿Que es escalabilidad horizontal?

La escalabilidad horizontal hace referencia a la posibilidad de agrear instancias homogeneas (iguales) de tal forma que el sistema no esté soportado en única instancia, si no que está en múltiples al mismo tiempo. Dependiendo de si nuestro servidor tiene la posibilidad de guardar o no estado internamente nos enfrentaremos a problemas de integridad de datos. Para esto es necesario tener en cuenta que al contar con múltiples instancias necesitamos contar un balanceador de carga, el cual es el  componente encargado de gestionar las solicitudes entrantes para redirigirlas específicamente a cada instancia siguiendo un algoritmo definido, entre estos algortmos el más popular es el Round Robin o un algoritmo que se enfoque dependiendo de la carga de cada instancia

## ¿Que es escalabilidad vertical?

La escalabilidad vertical habla sobre la capacidad que tiene un servidor de incrementar sus especificaciones, a diferencia de la escalabilidad horizontal aquí no nos enfocamos en que las solicitudes entrantes se puedan repartir en diferentes instancias, si no que buscamos que nuestra única instancia pueda crecer de tal manera que sea capaz de gestionar todas las solicitudes entrantes sin problema alguno. Esto tiene como desafíos encontrar los requisitos mínimos con los cuales la instancia podrá gestionar todo por si sola pero sin sobrepasarse con el precio de lo mismo.

## ¿Como lo vemos en AWS?

En este caso la escalabilidad horizontal la tenemos en el diagrama de arquitectura descrito, donde haciendo uso de los diferentes servicios que nos ofrece AWS podemos lograr una escalabilidad automatica que responde al procentaje usado de la CPU, así mismo la escalabilidad vertical la podemos encontrar en el Launch Template, donde aquí podemos específicar si necesitamos un componente más portente (como puede ser el procesador de la máquina virtual) o incluso si queremos agregar más almacenamiento en caso de requerirlo.

# Inicialización

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
