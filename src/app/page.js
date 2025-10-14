import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">欢迎使用 eCloud Next Scaffold</h1>
          <p className="text-muted-foreground">
            这是一个使用 Next.js 15.5.5、React 19.1.0、Tailwind CSS v4 和 shadcn/ui 构建的现代化脚手架项目。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">shadcn/ui 按钮组件演示</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">按钮变体</h3>
              <div className="flex flex-wrap gap-4">
                <Button>默认按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">轮廓按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="link">链接按钮</Button>
                <Button variant="destructive">危险按钮</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">按钮尺寸</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">小按钮</Button>
                <Button size="default">默认按钮</Button>
                <Button size="lg">大按钮</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">禁用状态</h3>
              <div className="flex flex-wrap gap-4">
                <Button disabled>禁用按钮</Button>
                <Button variant="secondary" disabled>禁用次要按钮</Button>
                <Button variant="outline" disabled>禁用轮廓按钮</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">项目特性</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Next.js 15.5.5 App Router 架构</li>
            <li>React 19.1.0 服务器组件支持</li>
            <li>Tailwind CSS v4（无需配置文件）</li>
            <li>shadcn/ui 组件库集成</li>
            <li>Turbopack 快速构建</li>
            <li>ESLint 9 代码质量检查</li>
            <li>Geist 字体优化</li>
            <li>自动暗色模式支持</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
