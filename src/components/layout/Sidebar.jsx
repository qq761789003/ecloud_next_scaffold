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
    href: '/components/admin/home',
    icon: Home,
  },
  {
    name: '个人资料',
    href: '/components/admin/profile',
    icon: User,
  },
  {
    name: '文档',
    href: '/components/admin/docs',
    icon: FileText,
  },
  {
    name: '设置',
    href: '/components/admin/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card min-h-screen shadow-lg">
      {/* Logo 区域 */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-primary-foreground">E</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">ECloud</h1>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                      : 'text-foreground hover:bg-accent/50 hover:scale-102'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
