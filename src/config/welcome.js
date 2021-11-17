"use strict";
const welcomeMessage = {
  message: "Welcome to Squish Task API! You can see the available services below!",
  services: {
    tasksList: {
      url: "https://www.squish.work/api/tasks",
      method: "GET",
      description: "List all the tasks available and paginates them. By default, each page shows 5 tasks.",
      queries: {
        title: {
          type: "string",
          description: "Filter results according to the substring typed.",
          default: "none",
        },
        size: {
          type: "number",
          description: "Amount of tasks showed per page.",
          default: "5",
        },
        page: {
          type: "number",
          description: "Current page showed.",
          default: "0",
        },
      },
    },
    tasksDoneList: {
      url: "https://www.squish.work/api/tasks/done",
      method: "GET",
      description: "List the tasks doned and paginates them. By default, each page shows 5 tasks.",
      queries: {
        title: {
          type: "string",
          description: "Filter results according to the substring typed.",
          default: "none",
        },
        size: {
          type: "number",
          description: "Amount of tasks showed per page.",
          default: "5",
        },
        page: {
          type: "number",
          description: "Current page showed.",
          default: "0",
        },
      },
    },
    getTask: {
      url: "https://www.squish.work/api/tasks/:id",
      method: "GET",
      description: "Get specific task according to given ID.",
      params: {
        id: {
          type: "string",
          description: "24 characters alphanumeric identificator of the task.",
        },
      },
    },
    saveTask: {
      url: "https://www.squish.work/api/tasks/save",
      method: "POST",
      description: "Create task with the given data.",
      body: {
        title: {
          type: "string",
          description: "Task title.",
          isRequired: "true",
        },
        description: {
          type: "string",
          description: "Task description.",
          isRequired: "false",
        },
        done: {
          type: "boolean",
          description: "Indicates TRUE if the task is done, and FALSE if it didn't.",
          isRequired: "false",
          default: "false",
        },
      },
    },
    updateTask: {
      url: "https://www.squish.work/api/tasks/:id",
      method: "PUT",
      description: "Update task with the given data according to given ID.",
      params: {
        id: {
          type: "string",
          description: "24 characters alphanumeric identificator of the task.",
        },
      },
      body: {
        title: {
          type: "string",
          description: "Task title.",
          isRequired: "false",
        },
        description: {
          type: "string",
          description: "Task description.",
          isRequired: "false",
        },
        done: {
          type: "boolean",
          description: "Indicates TRUE if the task is done, and FALSE if it didn't.",
          isRequired: "false",
        },
      },
    },
    deleteTask: {
      url: "https://www.squish.work/api/tasks/:id",
      method: "DELETE",
      description: "Delete task according to given ID.",
      params: {
        id: {
          type: "string",
          description: "24 characters alphanumeric identificator of the task.",
        },
      },
    },
  },
};

module.exports = { welcomeMessage };
