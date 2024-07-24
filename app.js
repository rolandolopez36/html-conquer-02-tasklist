// Importa la biblioteca ethers.js y los detalles del contrato
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

// Referencias a elementos HTML
const connectButton = document.getElementById("connectButton"); // Botón para conectar MetaMask
const taskForm = document.getElementById("taskForm"); // Formulario para agregar tareas
const taskList = document.getElementById("taskList"); // Contenedor para la lista de tareas

// Asigna las funciones a los eventos de los botones
connectButton.onclick = connect; // Conecta MetaMask cuando se hace clic
taskForm.onsubmit = addTask; // Agrega una tarea cuando se envía el formulario

// Función para conectar con MetaMask
async function connect() {
  // Verifica si MetaMask está disponible
  if (typeof window.ethereum !== "undefined") {
    try {
      // Solicita acceso a la cuenta de MetaMask
      console.log("Solicitando acceso a MetaMask...");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Conectado a MetaMask");
      connectButton.innerHTML = "Connected"; // Actualiza el texto del botón
      // Obtiene las cuentas conectadas en MetaMask
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      // Verifica el balance de ETH de la cuenta conectada
      await checkEthBalance(accounts[0]);
      // Carga las tareas desde el contrato inteligente
      await loadTasks();
    } catch (error) {
      // Maneja cualquier error durante la conexión
      console.error("Error al conectar a MetaMask:", error);
    }
  } else {
    // Si MetaMask no está instalado, actualiza el botón para indicar que se necesita instalación
    connectButton.innerHTML = "Please install MetaMask";
    console.log("MetaMask no está instalado");
  }
}

// Función para verificar el balance de ETH de una cuenta
async function checkEthBalance(account) {
  if (window.ethereum) {
    try {
      // Solicita el balance de la cuenta especificada
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      // Muestra el balance en ETH
      console.log("Eth Balance", ethers.utils.formatEther(balance));
    } catch (err) {
      // Maneja cualquier error al obtener el balance de ETH
      console.error("Error al obtener el balance de ETH:", err);
    }
  }
}

// Función para agregar una nueva tarea
async function addTask(event) {
  event.preventDefault(); // Previene el envío del formulario y la recarga de la página

  const taskText = document.getElementById("taskText").value; // Obtiene el texto de la tarea
  const taskDifficulty = document.getElementById("taskDifficulty").value; // Obtiene la dificultad de la tarea

  // Verifica si MetaMask está disponible
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // Crea un proveedor de ethers.js usando MetaMask
    const signer = provider.getSigner(); // Obtiene el firmante (cuenta de usuario) desde MetaMask
    const contract = new ethers.Contract(contractAddress, abi, signer); // Crea una instancia del contrato inteligente
    try {
      // Envía la transacción para agregar una nueva tarea al contrato inteligente
      console.log("Enviando transacción para agregar tarea...");
      const transactionResponse = await contract.addTask(
        taskText,
        taskDifficulty
      );
      console.log("Transacción enviada:", transactionResponse);
      // Espera a que la transacción sea confirmada
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Tarea agregada correctamente");
      // Carga las tareas desde el contrato inteligente después de agregar una nueva
      await loadTasks();
    } catch (error) {
      // Maneja cualquier error durante la transacción
      console.error("Error al agregar la tarea:", error);
    }
  } else {
    // Si MetaMask no está disponible, muestra un mensaje en la consola
    console.log("MetaMask no está disponible");
  }
}

// Función para cargar las tareas desde el contrato inteligente
async function loadTasks() {
  // Verifica si MetaMask está disponible
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // Crea un proveedor de ethers.js usando MetaMask
    const contract = new ethers.Contract(contractAddress, abi, provider); // Crea una instancia del contrato inteligente
    try {
      // Obtiene todas las tareas del contrato inteligente
      const tasks = await contract.getAllTasks();
      console.log("Tareas obtenidas:", tasks);
      // Muestra las tareas en la interfaz
      displayTasks(tasks);
    } catch (error) {
      // Maneja cualquier error al obtener las tareas
      console.error("Error al obtener las tareas:", error);
    }
  } else {
    // Si MetaMask no está disponible, muestra un mensaje en la consola
    console.log("MetaMask no está disponible");
  }
}

// Función para mostrar las tareas en la interfaz
function displayTasks(tasks) {
  taskList.innerHTML = ""; // Limpia la lista de tareas actual
  // Itera sobre cada tarea y la agrega al contenedor de la lista de tareas
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.innerHTML = `<strong>Tarea ${index + 1}:</strong> ${task}`;
    taskList.appendChild(taskItem);
  });
}

// Función para escuchar la confirmación de la transacción
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`); // Muestra el hash de la transacción
  return new Promise((resolve, reject) => {
    // Escucha el evento de confirmación de la transacción
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Transacción completada con ${transactionReceipt.confirmations} confirmaciones.`
      );
      resolve(); // Resuelve la promesa cuando la transacción está confirmada
    });
  });
}
