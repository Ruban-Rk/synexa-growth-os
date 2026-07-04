'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function RevenueTrend({ data }: { data: any[] }) {
  return (
    <div className="h-64 w-full bg-white p-4 shadow rounded-lg">
      <h3 className="mb-4 font-semibold text-gray-700">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LeadFunnel({ data }: { data: any[] }) {
  return (
    <div className="h-64 w-full bg-white p-4 shadow rounded-lg">
      <h3 className="mb-4 font-semibold text-gray-700">Lead Generation</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="leads" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
