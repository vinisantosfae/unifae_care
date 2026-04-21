import * as Crypto from 'expo-crypto';
import { hashSync, setRandomFallback } from 'bcryptjs';
import { initDatabase, getDatabase } from '../database/sqlite';
import { AuthUser, CreateUserInput, User } from '../models/User';

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

setRandomFallback((length) => Array.from(Crypto.getRandomBytes(length)));

export class UserRepository {
  async createUser(input: CreateUserInput): Promise<AuthUser> {
    await initDatabase();

    const nome = String(input.nome ?? '').trim();
    const email = String(input.email ?? '').trim().toLowerCase();
    const senha = String(input.senha ?? '').trim();
    const tipoUsuario = input.tipoUsuario;
    const ra = tipoUsuario === 'patient' ? null : String(input.ra ?? '').trim() || null;

    if (!nome || !email || !senha) {
      throw new Error('Preencha nome, email e senha para continuar.');
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new Error('Informe um email valido para continuar.');
    }

    if (tipoUsuario !== 'patient' && !ra) {
      throw new Error('Informe o RA para continuar.');
    }

    const senhaHash = hashSync(senha, SALT_ROUNDS);
    const db = await getDatabase();

    try {
      const result = await db.runAsync(
        `
          INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, ra)
          VALUES (?, ?, ?, ?, ?)
        `,
        [nome, email, senhaHash, tipoUsuario, ra]
      );

      const createdUser = {
        id: Number(result.lastInsertRowId),
        nome,
        email,
        tipoUsuario,
        ra,
      };

      console.log('Usuario cadastrado com sucesso:', createdUser);
      return createdUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : '';

      if (message.toLowerCase().includes('usuarios.ra') || message.toLowerCase().includes('idx_usuarios_ra_unique')) {
        throw new Error('Este RA ja esta cadastrado.');
      }

      if (message.toLowerCase().includes('unique') || message.toLowerCase().includes('usuarios.email')) {
        throw new Error('Este email ja esta cadastrado.');
      }

      throw new Error('Nao foi possivel concluir o cadastro no momento.');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    await initDatabase();

    const db = await getDatabase();
    const normalizedEmail = email.trim().toLowerCase();
    const row = await db.getFirstAsync<{
      id: number;
      nome: string;
      email: string;
      senha_hash: string;
      tipo_usuario: User['tipoUsuario'];
      ra: string | null;
      created_at: string;
    }>(
      `
        SELECT id, nome, email, senha_hash, tipo_usuario, ra, created_at
        FROM usuarios
        WHERE email = ?
      `,
      [normalizedEmail]
    );

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      nome: row.nome,
      email: row.email,
      senhaHash: row.senha_hash,
      tipoUsuario: row.tipo_usuario,
      ra: row.ra,
      createdAt: row.created_at,
    };
  }
}

export const userRepository = new UserRepository();
