import { User } from '../src/users/user.model.js';
import { Role, UserRole } from '../src/auth/role.model.js';
import { hashPassword } from '../utils/password-utils.js';
import { SUPER_ADMIN_ROLE, MANAGER_ROLE } from './role-constants.js';

export const seedAdminUser = async () => {
  try {
    const defaultPassword = 'Admin123!';
    const hashedPassword = await hashPassword(defaultPassword);

    const adminEmail = 'admin@tareas.com';
    let adminUser = await User.findOne({ where: { Email: adminEmail } });
    if (!adminUser) {
      const adminRole = await Role.findOne({ where: { Name: SUPER_ADMIN_ROLE } });
      adminUser = await User.create({
        Name: 'Administrador', Email: adminEmail, Password: hashedPassword, Status: true,
      });
      await UserRole.create({ UserId: adminUser.Id, RoleId: adminRole.Id });
      console.log('SUPER ADMIN creado.');
    } else {
      await adminUser.update({ Password: hashedPassword });
      console.log('SUPER ADMIN sincronizado.');
    }

    const managerEmail = 'manager@tareas.com';
    let managerUser = await User.findOne({ where: { Email: managerEmail } });
    if (!managerUser) {
      const managerRole = await Role.findOne({ where: { Name: MANAGER_ROLE } });
      managerUser = await User.create({
        Name: 'Manager', Email: managerEmail, Password: hashedPassword, Status: true,
      });
      await UserRole.create({ UserId: managerUser.Id, RoleId: managerRole.Id });
      console.log('Manager creado.');
    } else {
      await managerUser.update({ Password: hashedPassword });
      console.log('Manager sincronizado.');
    }
  } catch (error) {
    console.error('Error en el seeder de usuarios:', error.message);
  }
};
