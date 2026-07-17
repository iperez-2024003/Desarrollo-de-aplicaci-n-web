import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';
import { generateUserId } from '../../helpers/uuid-generator.js';

export const User = sequelize.define(
  'User',
  {
    Id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      field: 'id',
      defaultValue: () => generateUserId(),
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'name',
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio.' },
        len: {
          args: [1, 50],
          msg: 'El nombre no puede tener más de 50 caracteres.',
        },
      },
    },
    Email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        notEmpty: { msg: 'El correo electrónico es obligatorio.' },
        isEmail: { msg: 'El correo electrónico no tiene un formato válido.' },
        len: {
          args: [1, 150],
          msg: 'El correo electrónico no puede tener más de 150 caracteres.',
        },
      },
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password',
      validate: {
        notEmpty: { msg: 'La contraseña es obligatoria.' },
        len: {
          args: [8, 255],
          msg: 'La contraseña debe tener entre 8 y 255 caracteres.',
        },
      },
    },
    Status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      field: 'status',
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
