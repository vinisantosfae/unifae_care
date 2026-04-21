import * as Crypto from 'expo-crypto';
import { compareSync, hashSync, setRandomFallback } from 'bcryptjs';
import { initDatabase, getDatabase } from '../database/sqlite';
import { AuthUser, CreateUserInput, User } from '../models/User';

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

setRandomFallback((length) => Array.from(Crypto.getRandomBytes(length)));

function toAuthUser(user: Pick<User, 'id' | 'nome' | 'email' | 'tipoUsuario' | 'ra'>): AuthUser {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    tipoUsuario: user.tipoUsuario,
    ra: user.ra,
  };
}

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
      throw new Error('Informe um email válido para continuar.');
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

      console.log('Usuário cadastrado com sucesso:', createdUser);
      return createdUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : '';

      if (message.toLowerCase().includes('usuarios.ra') || message.toLowerCase().includes('idx_usuarios_ra_unique')) {
        throw new Error('Este RA já esta cadastrado.');
      }

      if (message.toLowerCase().includes('unique') || message.toLowerCase().includes('usuarios.email')) {
        throw new Error('Este email já esta cadastrado.');
      }

      throw new Error('Não foi possivel concluir o cadastro no momento.');
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

  async login(email: string, senha: string): Promise<AuthUser> {
    await initDatabase();

    const normalizedEmail = String(email ?? '').trim().toLowerCase();
    const normalizedPassword = String(senha ?? '').trim();

    if (!normalizedEmail || !normalizedPassword) {
      throw new Error('Preencha email e senha para continuar.');
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      throw new Error('Informe um email válido para continuar.');
    }

    const user = await this.findUserByEmail(normalizedEmail);

    if (!user) {
      throw new Error('Email ou senha incorretos.');
    }

    const isPasswordValid = compareSync(normalizedPassword, user.senhaHash);

    if (!isPasswordValid) {
      throw new Error('Email ou senha incorretos.');
    }

    return toAuthUser(user);
  }
}

export const userRepository = new UserRepository();
