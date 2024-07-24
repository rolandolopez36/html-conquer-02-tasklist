# README.md

## Lista de Tareas dApp

Una aplicación web descentralizada (dApp) para gestionar una lista de tareas utilizando un contrato inteligente desplegado en la blockchain. Los usuarios pueden conectar sus billeteras MetaMask, agregar tareas con diferentes niveles de dificultad y ver todas las tareas agregadas.

## Herramientas Utilizadas

- **HTML, CSS, JavaScript**: Herramientas web estándar para construir la interfaz de usuario.
- **Ethers.js**: Librería para interactuar con la blockchain de Ethereum y contratos inteligentes.
- **MetaMask**: Extensión de navegador que actúa como billetera de criptomonedas para interactuar con la blockchain.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- MetaMask - Extensión para el navegador

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

Asegúrate de tener el archivo `constants.js` configurado correctamente con la dirección del contrato y el ABI.

## Uso

1. Abre `index.html` en tu navegador. Puedes hacerlo directamente desde tu explorador de archivos o usando una extensión de servidor en vivo como "Live Server" en VSCode.
2. Conecta tu billetera MetaMask haciendo clic en el botón "Connect".
3. Agrega nuevas tareas ingresando una descripción y seleccionando el nivel de dificultad, luego haciendo clic en "Agregar Tarea".
4. Las tareas agregadas se mostrarán en la lista de tareas.

## Estructura del Proyecto

```arduino
.
├── index.html
├── app.js
├── ethers-5.6.esm.min.js
└── constants.js
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

Consejos Adicionales

Actualiza tu fork: Asegúrate de mantener tu fork actualizado con el repositorio original para evitar conflictos.
Documenta tus cambios: Si haces cambios significativos, actualiza la documentación y los comentarios en el código.
Sigue las pautas de estilo: Adhiérete a las convenciones de codificación y estilo del proyecto.

¡Gracias por contribuir!

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
