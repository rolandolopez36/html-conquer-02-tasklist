// Exporta la dirección del contrato desplegado
export const contractAddress = "0xAEF7360a51Df6Eb8D0855097F09e3201a4780B3A";

// Exporta el ABI del contrato inteligente, define la interfaz del contrato
export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
      {
        internalType: "enum TaskList.difficulty",
        name: "_dif",
        type: "uint8",
      },
    ],
    name: "addTask",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTasks",
    outputs: [
      {
        internalType: "string[]",
        name: "_allTasks",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_id",
        type: "uint8",
      },
    ],
    name: "getTaskById",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "text",
            type: "string",
          },
          {
            internalType: "enum TaskList.difficulty",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "id",
            type: "uint8",
          },
        ],
        internalType: "struct TaskList.Task",
        name: "_task",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
