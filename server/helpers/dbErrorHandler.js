/**
 * Database error helper.
 * Turns MongoDB / Mongoose errors into readable messages.
 */

// Get a readable message from a database error
const getErrorMessage = (err) => {
  // Still log the full error so it shows up in the server terminal
  console.log(err);

  let message = "";

  if (err.code) {
    // MongoDB error codes
    switch (err.code) {
      case 11000:
      case 11001:
        // Duplicate key (a unique field already exists)
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    // Mongoose validation errors: use the last field's message
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Never send an empty message back to the client
  return message || "Something went wrong";
};

// Build a message like "Email already exists" from a duplicate key error
const getUniqueErrorMessage = (err) => {
  let output;
  try {
    // Newer MongoDB versions list the duplicate field in err.keyValue, e.g. { email: "a@b.com" }.
    // Older versions only include it in the message text, so fall back to reading it from there.
    let fieldName = err.keyValue
      ? Object.keys(err.keyValue)[0]
      : err.message.substring(
          err.message.lastIndexOf(".$") + 2,
          err.message.lastIndexOf("_1")
        );
    output =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

export default { getErrorMessage };
