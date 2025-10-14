import Navbar from '@/components/website/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Users, BarChart3, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: "智能防跌倒解决方案 - ECloud",
  description: "基于 AI 视觉分析的智能防跌倒监测系统，为养老院、医院提供全天候安全保障",
};

export default function WebsiteHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              智能防跌倒解决方案
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              基于 AI 视觉分析技术，实时监测跌倒风险，智能预警，
              为养老机构和医疗机构提供全天候的安全保障
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/components/website/partnership">
                <Button size="lg" className="text-lg px-8">
                  立即合作
                </Button>
              </Link>
              <Link href="/components/website/cases">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  查看案例
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-lg text-gray-600">AI 驱动的全方位安全防护</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="实时监测"
              description="24/7 全天候视频监控，实时分析老人行为模式，及时发现异常情况"
            />
            <FeatureCard
              icon={<AlertTriangle className="w-8 h-8 text-blue-600" />}
              title="智能预警"
              description="AI 算法预测跌倒风险，提前预警，让护理人员有足够时间响应"
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-blue-600" />}
              title="快速响应"
              description="跌倒发生后立即通知，支持多渠道告警，确保第一时间救援"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
              title="数据分析"
              description="详细的数据报表和统计分析，帮助管理者优化护理方案"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="多用户管理"
              description="支持多机构、多角色权限管理，满足不同规模的使用需求"
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-blue-600" />}
              title="隐私保护"
              description="符合数据安全规范，采用边缘计算，保护用户隐私"
            />
          </div>
        </div>
      </section>

      {/* 应用场景 */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">适用场景</h2>
            <p className="text-lg text-gray-600">覆盖多种养老和医疗场景</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScenarioCard
              title="养老院"
              description="为养老机构提供全面的跌倒监测和预警服务，降低护理风险"
              stats={[
                { label: '监测覆盖率', value: '99.9%' },
                { label: '预警准确率', value: '95%' },
              ]}
            />
            <ScenarioCard
              title="医院病房"
              description="辅助医护人员监控住院患者，特别是术后恢复期的老年患者"
              stats={[
                { label: '响应时间', value: '<30秒' },
                { label: '误报率', value: '<5%' },
              ]}
            />
            <ScenarioCard
              title="居家养老"
              description="为居家养老的老人提供远程监护服务，让家人更放心"
              stats={[
                { label: '在线率', value: '99.9%' },
                { label: '用户满意度', value: '98%' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备好提升安全防护了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            联系我们，获取专属解决方案和优惠价格
          </p>
          <Link href="/components/website/partnership">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              立即咨询
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">产品</h3>
              <ul className="space-y-2">
                <li><Link href="/components/website/pricing" className="hover:text-white">价格方案</Link></li>
                <li><Link href="/components/website/cases" className="hover:text-white">合作案例</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">合作</h3>
              <ul className="space-y-2">
                <li><Link href="/components/website/partnership" className="hover:text-white">合作方式</Link></li>
                <li><Link href="/components/website/partnership" className="hover:text-white">联系我们</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">支持</h3>
              <ul className="space-y-2">
                <li><Link href="/components/admin/login" className="hover:text-white">用户登录</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">关于</h3>
              <p className="text-sm">
                智能防跌倒解决方案提供商
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 ECloud. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 功能卡片组件
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// 场景卡片组件
function ScenarioCard({ title, description, stats }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{stat.label}</span>
            <span className="text-blue-600 font-semibold text-lg">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
