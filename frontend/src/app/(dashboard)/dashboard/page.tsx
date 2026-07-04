'use client';

import { useEffect, useState } from 'react';
import { RevenueTrend, LeadFunnel } from '@/components/dashboard/KPICharts';
import { apiClient } from '@/lib/api/client';
import { useAppStore } from '@/store';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  
  // Hardcoded for MVP UI demo
  const business_id = "00000000-0000-0000-0000-000000000000";

  useEffect(() => {
    async function loadData() {
      try {
        const response = await apiClient.get(`/dashboard?business_id=${business_id}`);
        setData(response);
      } catch (err: any) {
        setError(err.message);
      }
    }
    loadData();
  }, []);

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-8">Loading KPI metrics...</div>;

  const { metrics, charts } = data;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Business Health</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{metrics.business_health.value}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Growth Score</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{metrics.growth_score.value}/100</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Revenue Opportunity</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">${metrics.revenue_opportunity.value}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Risk Alerts</h3>
          <p className="mt-2 text-3xl font-semibold text-red-600">{metrics.risk_alerts.value} Warnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueTrend data={charts.revenue_trend} />
        <LeadFunnel data={charts.revenue_trend} />
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 text-xl font-bold">AI Executive Summary</h2>
        <p className="text-gray-600">{metrics.executive_summary}</p>
      </div>
    </div>
  );
}
