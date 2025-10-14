'use client';

import { useState } from 'react';
import Navbar from '@/components/website/Navbar';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Building2, Users, Handshake } from 'lucide-react';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    type: 'trial',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('表单提交:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        organization: '',
        phone: '',
        email: '',
        type: 'trial',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            与我们合作
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            期待与您携手，共同守护老年人的安全与健康
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左侧：合作方式 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">合作方式</h2>

            <div className="space-y-6 mb-12">
              <PartnerTypeCard
                icon={<Building2 className="w-6 h-6 text-blue-600" />}
                title="机构合作"
                description="为养老院、医院等机构提供整体解决方案，包括系统部署、培训和长期技术支持。"
              />
              <PartnerTypeCard
                icon={<Users className="w-6 h-6 text-blue-600" />}
                title="渠道合作"
                description="寻找区域代理商和渠道伙伴，共同拓展市场，享受优惠的合作政策。"
              />
              <PartnerTypeCard
                icon={<Handshake className="w-6 h-6 text-blue-600" />}
                title="技术合作"
                description="欢迎技术厂商和系统集成商合作，提供 API 接口和技术支持。"
              />
            </div>

            {/* 联系方式 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">联系我们</h3>
              <div className="space-y-4">
                <ContactItem
                  icon={<Phone className="w-5 h-5 text-blue-600" />}
                  label="电话"
                  value="400-888-8888"
                />
                <ContactItem
                  icon={<Mail className="w-5 h-5 text-blue-600" />}
                  label="邮箱"
                  value="contact@ecloud.com"
                />
                <ContactItem
                  icon={<MapPin className="w-5 h-5 text-blue-600" />}
                  label="地址"
                  value="北京市朝阳区科技园区创新大厦 10 层"
                />
              </div>
            </div>
          </div>

          {/* 右侧：联系表单 */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                填写合作意向
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-600 text-lg font-semibold mb-2">
                    提交成功！
                  </div>
                  <p className="text-gray-600">
                    我们已收到您的信息，将在 24 小时内与您联系。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入您的姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      机构名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入机构名称"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      联系电话 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入联系电话"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      电子邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入电子邮箱"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      合作类型 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="trial">免费试用</option>
                      <option value="institution">机构合作</option>
                      <option value="channel">渠道合作</option>
                      <option value="technical">技术合作</option>
                      <option value="other">其他咨询</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      留言
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请简要描述您的需求或问题"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    提交申请
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerTypeCard({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-gray-900 font-medium">{value}</div>
      </div>
    </div>
  );
}
