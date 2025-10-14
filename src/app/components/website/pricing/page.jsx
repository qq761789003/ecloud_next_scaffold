import Navbar from '@/components/website/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: "价格方案 - 智能防跌倒解决方案",
  description: "灵活的价格方案，满足不同规模机构的需求",
};

const plans = [
  {
    name: '基础版',
    price: '2,999',
    period: '元/月',
    description: '适合小型养老机构或试点项目',
    features: [
      '支持 10 个监测点位',
      '基础跌倒检测功能',
      '实时告警通知',
      '7x24 小时监控',
      '基础数据报表',
      '邮件技术支持',
    ],
    recommended: false,
  },
  {
    name: '专业版',
    price: '8,999',
    period: '元/月',
    description: '适合中型养老院和医疗机构',
    features: [
      '支持 50 个监测点位',
      '高级跌倒预测算法',
      '多渠道告警（短信/电话/APP）',
      '7x24 小时监控',
      '高级数据分析和报表',
      '优先电话技术支持',
      '每季度系统优化服务',
      '历史视频回放（30天）',
    ],
    recommended: true,
  },
  {
    name: '企业版',
    price: '面议',
    period: '定制方案',
    description: '适合大型连锁机构和医院集团',
    features: [
      '无限监测点位',
      'AI 定制算法优化',
      '全渠道告警系统',
      '7x24 小时监控',
      '完整数据分析平台',
      '专属客户经理',
      '现场技术支持',
      '历史视频回放（365天）',
      '私有化部署选项',
      'API 接口对接',
    ],
    recommended: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            灵活的价格方案
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            无论您是小型机构还是大型企业，我们都有适合您的解决方案
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            常见问题
          </h2>
          <div className="space-y-8">
            <FAQItem
              question="是否需要签订长期合同？"
              answer="我们提供灵活的合作方式。基础版和专业版支持按月付费，企业版可根据需求定制合同期限。"
            />
            <FAQItem
              question="系统安装需要多长时间？"
              answer="通常情况下，小型项目（10-20个点位）可在 3-5 个工作日内完成安装调试。中大型项目根据实际规模确定。"
            />
            <FAQItem
              question="是否支持免费试用？"
              answer="是的！我们为新客户提供 14 天免费试用期，可体验专业版的全部功能。"
            />
            <FAQItem
              question="后期扩容如何收费？"
              answer="您可以随时升级套餐或增加监测点位。额外点位按照当前套餐的单价计算，无需额外费用。"
            />
            <FAQItem
              question="是否包含硬件设备？"
              answer="价格包含软件平台使用费用。摄像头等硬件设备可以使用您现有设备，或由我们提供（另行报价）。"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            还有疑问？联系我们
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            我们的专业顾问将为您提供详细的方案和报价
          </p>
          <Link href="/partnership">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              立即咨询
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ plan }) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
        plan.recommended ? 'ring-2 ring-blue-600' : ''
      }`}
    >
      {plan.recommended && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
          推荐
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-600 ml-2">{plan.period}</span>
        </div>

        <Link href="/partnership">
          <Button
            className={`w-full mb-8 ${
              plan.recommended
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {plan.price === '面议' ? '联系我们' : '开始使用'}
          </Button>
        </Link>

        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="border-b border-gray-200 pb-8 last:border-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}
