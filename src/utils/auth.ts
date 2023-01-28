import Cookies from 'js-cookie'
import { commonConfig } from '@gwin/networking'

const RoleKey = 'gwin-roles'
const RealNameKey = 'realName'

export function getToken(): string | undefined {
  return Cookies.get(commonConfig.tokenKey)
}

export function setToken(token: string): string | undefined {
  return Cookies.set(commonConfig.tokenKey, token)
}

export function removeToken(): void {
  return Cookies.remove(commonConfig.tokenKey)
}

export function getRoles(): string | undefined {
  return Cookies.get(RoleKey)
}

export function setRoles(role: string): string | undefined {
  return Cookies.set(RoleKey, role)
}

export function getUserId(): string | undefined {
  return Cookies.get(commonConfig.userIdKey)
}

export function setUserId(userId: string): string | undefined {
  return Cookies.set(commonConfig.userIdKey, userId)
}

export function getRealName(): string | undefined {
  return Cookies.get(RealNameKey)
}

export function setRealName(realName: string): string | undefined {
  return Cookies.set(RealNameKey, realName)
}
