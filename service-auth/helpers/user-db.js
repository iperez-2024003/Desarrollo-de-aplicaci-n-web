import { User } from '../src/users/user.model.js';
import { UserRole, Role } from '../src/auth/role.model.js';
import { USER_ROLE } from './role-constants.js';
import { hashPassword } from '../utils/password-utils.js';
import { Op } from 'sequelize';

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { Email: email.toLowerCase() },
      include: [
        {
          model: UserRole,
          as: 'UserRoles',
          include: [{ model: Role, as: 'Role' }],
        },
      ],
    });

    return user;
  } catch (error) {
    console.error('Error buscando usuario por email:', error);
    throw new Error('Error al buscar usuario');
  }
};

export const findUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: UserRole,
          as: 'UserRoles',
          include: [{ model: Role, as: 'Role' }],
        },
      ],
    });

    return user;
  } catch (error) {
    console.error('Error buscando usuario por ID:', error);
    throw new Error('Error al buscar usuario');
  }
};

export const checkUserExists = async (email) => {
  try {
    const existingUser = await User.findOne({
      where: { Email: email.toLowerCase() },
    });

    return !!existingUser;
  } catch (error) {
    console.error('Error verificando si el usuario existe:', error);
    throw new Error('Error al verificar usuario');
  }
};

export const createNewUser = async (userData) => {
  const transaction = await User.sequelize.transaction();

  try {
    const { name, email, password } = userData;

    const hashedPassword = await hashPassword(password);

    const user = await User.create(
      {
        Name: name,
        Email: email.toLowerCase(),
        Password: hashedPassword,
        Status: true,
      },
      { transaction }
    );

    const roleToAssign = USER_ROLE;
    const userRole = await Role.findOne({
      where: { Name: roleToAssign },
      transaction,
    });
    if (userRole) {
      await UserRole.create(
        {
          UserId: user.Id,
          RoleId: userRole.Id,
        },
        { transaction }
      );
    }

    await transaction.commit();

    const completeUser = await findUserById(user.Id);
    return completeUser;
  } catch (error) {
    await transaction.rollback();
    console.error('Error creando usuario:', error);
    throw new Error('Error al crear usuario');
  }
};
