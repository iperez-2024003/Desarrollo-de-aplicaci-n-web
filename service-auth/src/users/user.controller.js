import { findUserById } from '../../helpers/user-db.js';
import { buildUserResponse } from '../../utils/user-helpers.js';
import { asyncHandler } from '../../middlewares/server-genericError-handler.js';

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await findUserById(userId);

  return res.status(200).json({
    success: true,
    message: 'Perfil obtenido exitosamente',
    data: buildUserResponse(user),
  });
});
