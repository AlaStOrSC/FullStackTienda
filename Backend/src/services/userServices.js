const Usuario = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Pedrosanchez123';

async function getUserById(id) {
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    console.log('Usuario encontrado:', usuario);
    return usuario;
  } catch (err) {
    console.error('Error al obtener usuario por ID:', err);
    throw err;
  }
}

async function insertUser(userData) {
  try {
    const { email, password, role, ...restoDatos } = userData;

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      throw new Error('El email ya está en uso, pilla otro');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      ...restoDatos,
      email,
      password: hashedPassword,
      role: role || 'usuario',
    });

    const response = await usuario.save();
    return response;
  } catch (err) {
    console.error('Error al crear usuario en el servicio:', err); 
    throw err;
  }
}

async function getUsers() {
  try {
    const usuarios = await Usuario.find();
    console.log('Usuarios:', usuarios);
    return usuarios;
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    throw err;
  }
}

async function updateUser(id, userData) {
  try {
    userData.ultimaActualizacion = new Date();

    const usuario = await Usuario.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    console.log('Usuario actualizado:', usuario);
    return usuario;
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    throw err;
  }
}

async function deleteUser(id) {
  try {
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    console.log('Usuario eliminado:', usuario);
    return usuario;
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    throw err;
  }
}

const loginUser = async (email, password) => {
  const user = await Usuario.findOne({ email });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

  console.log('Token generado:', token);

  return token;
}

module.exports = {
  insertUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
}

