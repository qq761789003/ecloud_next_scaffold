'use client';

/**
 * 官网导航栏组件
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const navItems = [
  { name: '首页', href: '/' },
  { name: '价格', href: '/components/website/pricing' },
  { name: '合作', href: '/components/website/partnership' },
  { name: '合作案例', href: '/components/website/cases' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">智能防跌倒</span>
          </Link>

          {/* 导航菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              // 首页特殊处理：/ 和 /components/website 都算首页
              const isActive = item.href === '/'
                ? (pathname === '/' || pathname === '/components/website')
                : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* 进入后台按钮 */}
          <Link href="/components/admin/login">
            <Button className="flex items-center space-x-2">
              <LogIn className="w-4 h-4" />
              <span>进入后台</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
