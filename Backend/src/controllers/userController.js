// Importación de servicios
const { getUsers, updateUser, insertUser, deleteUser, getUserById, loginUser } = require('../services/userServices');
const {
  createUserValidations,
  updateUserValidations,
  getUserValidations,
  deleteUserValidations,
  getUserByIdValidations,
  loginValidations,
} = require('../validations/userValidations');

const userController = {
  getUserController: [
    ...getUserValidations,
    async (req, response) => {
      try {
        const data = await getUsers();
        response.status(200).json(data);
      } catch (error) {
        console.log('Error al recoger usuario de la BBDD', error);
        response.status(500).json({ error: 'Error al recoger usuario de la BBDD' });
      }
    },
  ],

createUser: [
  ...createUserValidations,
  async (req, res) => {
    try {
      const newUser = await insertUser(req.body);
      console.log('Usuario creado:', newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error en createUser:', error);
      res.status(500).json({ message: 'Error interno del servidor', success: 'NOK', error: error.message });
    }
  },
],

  updateUser: [
    ...updateUserValidations,
    async (req, response) => {
      try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = await updateUser(id, userData);
        response.status(200).json(updatedUser);
      } catch (error) {
        console.log('Error al actualizar usuario', error);
        response.status(500).json({ error: 'Error al actualizar usuario' });
      }
    },
  ],

  deleteUser: [
    ...deleteUserValidations,
    async (req, response) => {
      try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id);
        response.status(200).json(deletedUser);
      } catch (error) {
        console.log('Error al eliminar usuario', error);
        response.status(500).json({ error: 'Error al eliminar usuario' });
      }
    },
  ],
  getUserById: [
    ...getUserByIdValidations,
    async (req, response) => {
      try {
        const { id } = req.params
        const user = await getUserById(id);
        response.status(200).json(user);
      } catch (error) {
        console.log('Error al obtener usuario por ID', error);
        response.status(500).json({ error: 'Error al obtener usuario por ID' });
      }
    },
  ],
  loginUser: [
    ...loginValidations,
    async (req, res) => {
      try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);


        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax', 
          maxAge: 3600000,
          path: '/',
        });


        res.status(200).json({ message: 'Inicio de sesion exitoso', token });
      } catch (error) {
        console.error('Error en el login:', error);
        res.status(401).json({ error: error.message });
      }
    },
  ],
  logoutUser: async (req, res) => {
    try {
      res.cookie('token', '', { 
        expires: new Date(0), 
        httpOnly: true, 
        path: '/' 
      });
      res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
      console.error('Error de logout:', error);
      res.status(500).json({ message: 'Error interno del servidor', success: 'NOK', error: error.message });
    }
  },
}

module.exports = userController

