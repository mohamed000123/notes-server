export function validateRequest(schema, type) {
  return (req, res, next) => {
    const { error } = schema.validate(req[type]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((e) => e.message).join(",");
      console.log("error", message);
      res.status(422).json({ error: message });
    }
  };
}
