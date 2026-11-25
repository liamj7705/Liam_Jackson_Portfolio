/**
 * Contact controller.
 * CRUD operations for messages sent through the contact form.
 */
import Contact from "../models/contact.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

// Create a new message (public)
const create = async (req, res) => {
  // Don't let the sender set these fields; the schema defaults are used instead
  delete req.body.read;
  delete req.body.created;

  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(201).json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Get all messages
const list = async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Param middleware: find a message by :contactId and attach it to req.contact
const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        error: "Contact not found",
      });
    }
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve contact",
    });
  }
};

// Return a single message
const read = (req, res) => {
  return res.json(req.contact);
};

// Update a message (e.g. mark it as read)
const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact = extend(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete a single message
const remove = async (req, res) => {
  try {
    let contact = req.contact;
    let deletedContact = await contact.deleteOne();
    res.json(deletedContact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete every message
const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    return res.json({ message: `${result.deletedCount} contacts deleted` });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, contactByID, read, list, remove, removeAll, update };
