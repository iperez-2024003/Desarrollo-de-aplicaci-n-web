export const buildUserResponse = (user) => {
  return {
    id: user.Id,
    name: user.Name,
    email: user.Email,
    role: user.UserRoles?.[0]?.Role?.Name ?? 'USER_ROLE',
    status: user.Status,
    createdAt: user.CreatedAt,
    updatedAt: user.UpdatedAt,
  };
};
