import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

export const findAllTasks = async (request, response) => {
  try {
    const { page, size, title } = request.query;
    const filterCondition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    const { limit, offset } = getPagination(page, size);
    const tasks = await Task.paginate(filterCondition, { limit, offset });
    if (tasks.docs == "" || tasks.docs == null) {
      response.status(404).json({ message: `There aren't any tasks!` });
    } else {
      response.status(200).json({
        tasks: tasks.docs,
        totalItems: tasks.totalDocs,
        totalPages: tasks.totalPages,
        currentPage: tasks.page - 1,
      });
    }
  } catch (error) {
    handleError(error, response);
  }
};

export const findDoneTasks = async (request, response) => {
  try {
    const { page, size, title } = request.query;
    const filterCondition = title ? { done: true, title: { $regex: new RegExp(title), $options: "i" } } : { done: true };
    const { limit, offset } = getPagination(page, size);
    const tasks = await Task.paginate(filterCondition, { limit, offset });
    if (tasks.docs == "" || tasks.docs == null) {
      response.status(404).json({ message: `There aren't any done tasks!` });
    } else {
      response.status(200).json({
        tasks: tasks.docs,
        totalItems: tasks.totalDocs,
        totalPages: tasks.totalPages,
        currentPage: tasks.page - 1,
      });
    }
  } catch (error) {
    handleError(error, response);
  }
};

export const findTask = async (request, response) => {
  try {
    const task = await Task.findById(request.params.id);
    if (task == null || task == "") {
      response.status(404).json({ message: `Task with ID ${request.params.id} does not exists!` });
    } else {
      response.status(200).json(task);
    }
  } catch (error) {
    handleError(error, response);
  }
};

export const createTask = async (request, response) => {
  if (!request.body.title) {
    return response.status(400).send({ message: "Title is a required field and can't be empty!" });
  }
  try {
    const { title, description, done } = request.body;
    const newTask = new Task({ title: title, description: description, done: done ? done : false });
    const taskSaved = await newTask.save();
    response.status(200).json({ message: `Task created successfully!`, task: taskSaved });
  } catch (error) {
    handleError(error, response);
  }
};

export const updateTask = async (request, response) => {
  try {
    const taskUpdated = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (taskUpdated == null || taskUpdated == "") {
      response.status(404).json({ message: `Task with ID ${request.params.id} does not exists!` });
    } else {
      response.status(200).json({ message: `Task updated successfully!`, task: taskUpdated });
    }
  } catch (error) {
    handleError(error, response);
  }
};

export const deleteTask = async (request, response) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(request.params.id);
    if (taskDeleted == null || taskDeleted == "") {
      response.status(404).json({ message: `Task with ID ${request.params.id} does not exists!` });
    } else {
      response.status(200).json({ message: `Task with ID ${taskDeleted.id} deleted successfully!` });
    }
  } catch (error) {
    handleError(error, response);
  }
};

function handleError(error, response) {
  let errorMessage = error.toString();
  let errorCode = 0;
  if (error.name == "MongooseServerSelectionError" || error.name == "MongooseError") {
    errorCode = 1;
    errorMessage = "Can't establish connection with database! Try again later!";
  } else if (error.name == "CastError") {
    errorCode = 2;
    errorMessage = "ID must have 24 alphanumeric characters!";
  }
  response.status(500).json({ errorCode: errorCode, errorMessage: errorMessage });
}
