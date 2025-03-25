import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async getUserById(id: string) {
    console.log('Tipo de ID recibido:', typeof id, id);

    try {
      const userId = Number(id); // Asegura que sea un número
      if (isNaN(userId)) {
        return {
          message: 'ID no es válido',
          status: 'error',
          responseData: null
        };
      }

      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['accounts'] });

      if (!user) {
        return {
          message: 'Usuario no encontrado',
          status: 'error',
          responseData: null
        };
      }

      return {
        message: 'Usuario encontrado',
        status: 'success',
        responseData: user
      };
    } catch (error) {
      return {
        message: 'Error al obtener el usuario',
        status: 'error',
        responseData: null
      };
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.find();

      if (users.length === 0) {
        return {
          message: 'No se encontraron usuarios',
          status: 'error',
          responseData: null
        };
      }

      return {
        message: 'Usuarios encontrados',
        status: 'success',
        responseData: users
      };
    } catch (error) {
      return {
        message: 'Error al obtener los usuarios',
        status: 'error',
        responseData: null
      };
    }
  }
}
