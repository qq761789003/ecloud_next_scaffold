import Navbar from '@/components/website/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Building2, Users, MapPin, TrendingUp } from 'lucide-react';

export const metadata = {
  title: "合作案例 - 智能防跌倒解决方案",
  description: "查看我们与养老机构、医院的成功合作案例",
};

const cases = [
  {
    name: '北京市朝阳区养老服务中心',
    type: '养老院',
    location: '北京市朝阳区',
    beds: '200',
    deploymentPoints: '80',
    deploymentTime: '2023年6月',
    achievements: [
      '跌倒事件减少 87%',
      '响应时间缩短至 30 秒以内',
      '护理人员工作效率提升 40%',
      '居民家属满意度达 98%',
    ],
    testimonial: {
      content: '自从部署了智能防跌倒系统，我们的护理工作效率大大提升。系统能够提前预警高危行为，让我们有充足时间介入。过去半年，跌倒事件明显减少，家属的满意度也显著提高。',
      author: '张主任',
      position: '护理部主任',
    },
  },
  {
    name: '上海仁济医院康复科',
    type: '医院',
    location: '上海市浦东新区',
    beds: '150',
    deploymentPoints: '60',
    deploymentTime: '2023年9月',
    achievements: [
      '术后患者跌倒率降低 92%',
      '夜间巡查工作量减少 60%',
      '医护人员响应效率提升 50%',
      '患者康复周期缩短 15%',
    ],
    testimonial: {
      content: '康复科的术后患者跌倒风险较高，传统人工巡查难以做到全天候监控。智能防跌倒系统实现了 7x24 小时监测，大大降低了医疗风险，也让医护人员可以更专注于治疗工作。',
      author: '李医生',
      position: '康复科主任医师',
    },
  },
  {
    name: '深圳市福田区长者照护中心',
    type: '养老院',
    location: '广东省深圳市',
    beds: '300',
    deploymentPoints: '120',
    deploymentTime: '2024年1月',
    achievements: [
      '零跌倒死亡事故记录',
      '告警准确率达 95%',
      '家属投诉率下降 75%',
      '员工流失率降低 40%',
    ],
    testimonial: {
      content: '作为大型养老机构，我们最关注的就是老人的安全。智能防跌倒系统不仅提高了安全保障水平，还通过数据分析帮助我们优化护理流程。这是一次非常成功的智慧养老实践。',
      author: '王院长',
      position: '机构院长',
    },
  },
  {
    name: '杭州市西湖区颐养中心',
    type: '养老院',
    location: '浙江省杭州市',
    beds: '120',
    deploymentPoints: '50',
    deploymentTime: '2024年3月',
    achievements: [
      '跌倒预警准确率 94%',
      '紧急事件响应时间 < 25秒',
      '护理质量评分提升 35%',
      '运营成本降低 20%',
    ],
    testimonial: {
      content: '系统的 AI 预警功能非常智能，能够识别老人的异常行为模式。配合我们的护理团队，形成了人机协作的高效模式。投入产出比远超预期。',
      author: '陈主任',
      position: '运营主任',
    },
  },
];

const stats = [
  { label: '合作机构', value: '100+', icon: Building2 },
  { label: '服务老人', value: '15,000+', icon: Users },
  { label: '部署城市', value: '50+', icon: MapPin },
  { label: '跌倒率降低', value: '89%', icon: TrendingUp },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            合作案例
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            与全国 100+ 家机构携手，守护超过 15,000 位老人的安全
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {cases.map((caseItem, index) => (
              <CaseCard key={index} caseItem={caseItem} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            成为下一个成功案例
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            让我们一起打造更安全的养老环境
          </p>
          <Link href="/components/website/partnership">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              开始合作
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function CaseCard({ caseItem }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {caseItem.name}
            </h2>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                {caseItem.type}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {caseItem.location}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <InfoItem label="床位数" value={`${caseItem.beds} 张`} />
          <InfoItem label="部署点位" value={`${caseItem.deploymentPoints} 个`} />
          <InfoItem label="部署时间" value={caseItem.deploymentTime} />
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">实施效果</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {caseItem.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-700"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
          <p className="text-gray-700 mb-4 italic">
            "{caseItem.testimonial.content}"
          </p>
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {caseItem.testimonial.author}
            </div>
            <div className="text-sm text-gray-600">
              {caseItem.testimonial.position}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}
