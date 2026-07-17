export const success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    ok: true,
    data,
  });
};

export const created = (res, data) => {
  return success(res, data, 201);
};

export const noContent = (res) => {
  return res.status(204).send();
};

export const paginated = (res, data, total, page, limit) => {
  return res.status(200).json({
    ok: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};
