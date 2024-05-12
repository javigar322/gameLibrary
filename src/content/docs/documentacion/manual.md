---
title: Manual de despliegue
description: Manual de despliegue
---

## Pre requisitos

- Node.js - v18.17.1 o v20.3.0 o superior. (La v19 no es soportada).
- Editor de código - Se recomienda VS Code con la extensión oficial de Astro.
- Terminal - Astro es usado a través de la interfaz de línea de comandos (CLI).
- Base de datos - tener una base de datos en mongodb, ya sea local o en la nube para trabajar con ella

## Instalación

:::caution
El proyecto usa pnpm y no npm como se suele estar acostumbrado
por ello antes de empezar usa el comando para instalarlo si
no lo tenias :

```sh
npm install -g pnpm
```

:::

Si todo está ya instalado puedes empezar con clonar
el repositorio de github para empezar a trabajar con
él, instalar las dependencias e iniciarlo.

```sh
# haz git clone del proyecto con :
git clone https://github.com/javigar322/gameLibrary.git

# actualiza las dependencias del proyectos
pnpm install

```

## Conexión con terceros

Antes de poder iniciar el proyecto hay que configurar
el archivo **.env** , en este se encuentra las
propiedades principales para que la aplicación funcione ,
por ello en el repo debe de haber un .env.example en donde
te encuentras que deberías escribir en tu archivo ya que
usar información que no deberías de compartir ni hacerla
pública.

Lo primero que hay que hacer es conectarse con la base de datos de mongodb ,
si no te va a dar un error de conexión por ello te dejo [aquí](https://www.mongodb.com/docs/manual/installation/) una guía que te puede servir si no sabes como.

La otra conexión que hay que hacer es con la api de twitch
para poder iniciar sesión [aquí](https://dev.twitch.tv/docs/api/)
te dejo una guía de como podrías hacerlo.

:::tip
Astro se inicia en el localhost:4321 y se
abre tanto el servidor como el cliente por
lo que no hace falta hacer nada más.
:::

si ya tienes todo conectado no debería de haber ningún problema
en iniciarlo con :

```sh
pnpm astro dev
```

## Build

Para crear tu build y hacer un despliegue de la app o tener
la capacidad de hacer una búsqueda en la documentación
ya que no se puede hacer de la forma normal solo tienes que :

```sh
# construir el proyecto
pnpm astro build

# iniciarlo
pnpm astro preview
```
