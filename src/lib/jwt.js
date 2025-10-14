/**
 * JWT Token 工具
 * 用于生成和验证 JWT Token
 */

import jwt from 'jsonwebtoken';

/**
 * 生成访问令牌 (Access Token)
 * @param {Object} payload - Token 载荷数据
 * @returns {string} JWT Token
 */
export function generateAccessToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  );
}

/**
 * 生成刷新令牌 (Refresh Token)
 * @param {Object} payload - Token 载荷数据
 * @returns {string} JWT Token
 */
export function generateRefreshToken(payload) {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
  );
}

/**
 * 验证访问令牌
 * @param {string} token - JWT Token
 * @returns {Object|null} 解码后的载荷，验证失败返回 null
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * 验证刷新令牌
 * @param {string} token - JWT Token
 * @returns {Object|null} 解码后的载荷，验证失败返回 null
 */
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}
