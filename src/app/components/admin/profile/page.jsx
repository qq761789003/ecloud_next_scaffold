'use client';

/**
 * 个人信息编辑页面
 * 路径: /components/admin/profile
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/components/auth/AuthGuard';
import AppLayout from '@/components/layout/AppLayout';

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [formData, setFormData] = useState({
    nickname: '',
    hlzs_user_id: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // 加载用户数据
  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || '',
        hlzs_user_id: user.hlzs_user_id || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 准备更新数据
      const updateData = {
        nickname: formData.nickname || null,
        hlzs_user_id: formData.hlzs_user_id ? parseInt(formData.hlzs_user_id, 10) : null,
      };

      // 验证 hlzs_user_id 是否为有效数字
      if (formData.hlzs_user_id && isNaN(updateData.hlzs_user_id)) {
        setError('护理之声用户ID必须是数字');
        setLoading(false);
        return;
      }

      // 调用更新方法（已包含 API 调用和状态更新）
      const result = await updateProfile(updateData);

      if (result.success) {
        setSuccess('个人信息更新成功！');
      } else {
        setError(result.message || '更新失败，请重试');
      }
    } catch (err) {
      console.error('更新个人信息错误:', err);
      setError('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <AppLayout>
        <div className="space-y-8">
          {/* 页面标题 */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">个人信息</h1>
            <p className="text-muted-foreground mt-2">编辑和管理您的个人资料</p>
          </div>

          {/* 主要内容卡片 */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            {/* 用户基本信息展示 */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">账户信息</h2>
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="w-24 text-muted-foreground">用户名：</span>
                  <span className="text-foreground font-medium">{user?.username}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-muted-foreground">邮箱：</span>
                  <span className="text-foreground font-medium">{user?.email}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-muted-foreground">角色：</span>
                  <span className="text-foreground font-medium">
                    {user?.role === 'ADMIN' ? '管理员' : user?.role === 'USER' ? '普通用户' : '访客'}
                  </span>
                </div>
              </div>
            </div>

            {/* 编辑表单 */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">编辑资料</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 错误提示 */}
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* 成功提示 */}
                {success && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                {/* 昵称 */}
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-foreground mb-2">
                    昵称
                  </label>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="请输入昵称"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">用于显示的友好名称</p>
                </div>

                {/* 护理之声用户ID */}
                <div>
                  <label htmlFor="hlzs_user_id" className="block text-sm font-medium text-foreground mb-2">
                    护理之声用户ID
                  </label>
                  <input
                    id="hlzs_user_id"
                    name="hlzs_user_id"
                    type="number"
                    value={formData.hlzs_user_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="请输入护理之声用户ID"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    如果您有护理之声账号，可以关联此ID
                  </p>
                </div>

                {/* 提交按钮 */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none"
                  >
                    {loading ? '保存中...' : '保存更改'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/components/admin/home')}
                    className="flex-1 sm:flex-none"
                  >
                    取消
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
