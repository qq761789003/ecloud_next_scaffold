'use client';

/**
 * 登录页面
 * 路径: /components/login
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import GuestGuard from '@/components/auth/GuestGuard';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);

    if (result.success) {
      router.push('/components/admin/home');
    } else {
      setError(result.message || '登录失败，请重试');
    }

    setLoading(false);
  };

  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md relative">
          {/* 回到官网按钮 */}
          <Link
            href="/"
            className="absolute top-4 left-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            回到官网
          </Link>

          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              欢迎回来
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              登录到您的账户
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  用户名或邮箱
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入用户名或邮箱"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">还没有账户？</span>
              <Link href="/components/admin/register" className="ml-1 text-blue-600 hover:text-blue-700 font-medium">
                立即注册
              </Link>
            </div>
          </form>
        </div>
      </div>
    </GuestGuard>
  );
}
