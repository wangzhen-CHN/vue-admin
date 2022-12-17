import storage from 'store'

const TokenKey = 'USER_TOKEN'
const UserInfoKey = 'USER_INFO'

export function getToken() {
  return storage.get(TokenKey)
}

export function setToken(token) {
  return storage.set(TokenKey, token)
}

export function removeToken() {
  return storage.remove(TokenKey)
}

export function getUserInfo() {
  const userInfoStr = storage.get(UserInfoKey)
  return userInfoStr ? JSON.parse(userInfoStr) : {}
}

export function setUserInfo(info) {
  return storage.set(UserInfoKey, JSON.stringify(info))
}

export function removeUserInfo() {
  return storage.remove(UserInfoKey)
}

