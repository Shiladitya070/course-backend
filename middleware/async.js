const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
      next(err);
    }
  };
};

module.exports = asyncWrapper;
