interface BaseUser {
  id: number
  user_id: string
  name: string
  email: string
}

export interface StudentUser extends BaseUser {
  role: 'student'
}

export interface TeacherUser extends BaseUser {
  role: 'teacher'
}

export interface AdminUser extends BaseUser {
  role: 'admin'
}

export interface RegistrarUser extends BaseUser {
  role: 'registrar'
}

export interface FinanceUser extends BaseUser {
  role: 'finance'
}

export type AppUser = StudentUser | TeacherUser | AdminUser | RegistrarUser | FinanceUser
export type UserRole = AppUser['role']
