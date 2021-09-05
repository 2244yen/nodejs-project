'use strict';

export interface UserEditInterface {
  params: {
    id: String
  },
  payload: {
    fullName: String,
    userName: String,
    passWord: String,
    role: String,
    createdAt?: Date
  }
}

export interface UserCreateInterface {
  payload: {
    fullName: String,
    userName: String,
    passWord: String,
    role: String,
    createdAt?: Date
  }
}

export interface UserParamInterface {
  params: {
    id: String
  }
}

export interface LoginInterface {
  payload: {
    userName: String,
    passWord: String
  }
}