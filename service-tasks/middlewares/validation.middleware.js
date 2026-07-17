export const validate = (validationFn) => {
  return (req, res, next) => {
    const result = validationFn({ ...req.body, ...req.query, ...req.params });
    if (!result.valid) {
      return res.status(400).json({
        ok: false,
        error: 'Error de validación',
        details: result.errors,
      });
    }
    next();
  };
};
