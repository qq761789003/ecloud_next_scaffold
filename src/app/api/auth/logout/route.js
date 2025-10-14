/**
 * 用户登出 API
 * POST /api/auth/logout
 */

import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // 由于使用 JWT 无状态认证，服务端不需要做任何操作
    // 客户端会自动清除本地存储的 Token

    return NextResponse.json({
      message: '登出成功',
    });
  } catch (error) {
    console.error('登出错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
