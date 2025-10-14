'use client';

/**
 * 侧边栏组件
 * 显示导航菜单
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Settings, FileText } from 'lucide-react';

const menuItems = [
  {
    name: '首页',
    href: '/components/home',
    icon: Home,
  },
  {
    name: '个人资料',
    href: '/components/profile',
    icon: User,
  },
  {
    name: '文档',
    href: '/components/docs',
    icon: FileText,
  },
  {
    name: '设置',
    href: '/components/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold">ECloud</h1>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 hover:bg-gray-800 transition-colors ${
                    isActive ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
