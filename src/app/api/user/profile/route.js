/**
 * 用户信息 API
 * GET /api/user/profile - 获取用户信息
 * PUT /api/user/profile - 更新用户信息
 */

import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

/**
 * 从请求头中提取并验证 Token
 */
function extractAndVerifyToken(request) {
  const authorization = request.headers.get('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  const token = authorization.substring(7);
  return verifyAccessToken(token);
}

/**
 * GET - 获取当前用户信息
 */
export async function GET(request) {
  try {
    // 验证 Token
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: '未授权，请先登录' },
        { status: 401 }
      );
    }

    // 查询用户信息
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: '用户不存在' },
        { status: 404 }
      );
    }

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

/**
 * PUT - 更新用户信息
 */
export async function PUT(request) {
  try {
    // 验证 Token
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: '未授权，请先登录' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nickname, avatar } = body;

    // 构建更新数据
    const updateData = {};
    if (nickname !== undefined) updateData.nickname = nickname;
    if (avatar !== undefined) updateData.avatar = avatar;

    // 更新用户信息
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
    });

    // 返回更新后的用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: '更新成功',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
