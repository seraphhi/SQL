import React, { useState } from 'react';
import { Package, Truck, Globe, TrendingUp, AlertCircle, LayoutDashboard, Settings, LogOut } from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-400">seraphh-dev</h1>
      <p className="text-sm text-slate-400 mt-1">Global Logistics</p>
    </div>
    <nav className="flex-1 px-4 space-y-2">
      <a href="#" className="flex items-center space-x-3 bg-blue-600 text-white px-4 py-3 rounded-lg">
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-slate-300 hover:bg-slate-800 px-4 py-3 rounded-lg transition-colors">
        <Truck size={20} />
        <span>Flota Activa</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-slate-300 hover:bg-slate-800 px-4 py-3 rounded-lg transition-colors">
        <Globe size={20} />
        <span>Rutas Internacionales</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-slate-300 hover:bg-slate-800 px-4 py-3 rounded-lg transition-colors">
        <Package size={20} />
        <span>Envíos</span>
      </a>
    </nav>
    <div className="p-4 border-t border-slate-700 space-y-2">
      <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-2 transition-colors">
        <Settings size={20} />
        <span>Configuración</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-red-400 hover:text-red-300 px-4 py-2 transition-colors">
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </a>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, title, value, trend, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      <span className={`text-sm mt-2 flex items-center ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend} vs mes anterior
      </span>
    </div>
    <div className={`p-4 rounded-full ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const App = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Panel de Control de Transporte</h2>
            <p className="text-slate-500">Resumen de operaciones internacionales en tiempo real</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              + Nuevo Envío
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Truck} title="Vehículos en Tránsito" value="1,248" trend="+12%" colorClass="bg-blue-100 text-blue-600" />
          <StatCard icon={Package} title="Envíos Procesados" value="45,912" trend="+5.4%" colorClass="bg-indigo-100 text-indigo-600" />
          <StatCard icon={Globe} title="Puertos Activos" value="34" trend="+2" colorClass="bg-emerald-100 text-emerald-600" />
          <StatCard icon={AlertCircle} title="Incidentes Críticos" value="3" trend="-1" colorClass="bg-red-100 text-red-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Envíos Internacionales Recientes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-sm">
                    <th className="pb-3 font-medium">ID Envío</th>
                    <th className="pb-3 font-medium">Origen</th>
                    <th className="pb-3 font-medium">Destino</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium">ETA</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: 'SHP-9021', from: 'Bogotá, COL', to: 'Miami, USA', status: 'En Tránsito', eta: '12 Nov 2026', color: 'bg-blue-100 text-blue-700' },
                    { id: 'SHP-9022', from: 'Shanghai, CHN', to: 'Buenaventura, COL', status: 'Aduana', eta: '14 Nov 2026', color: 'bg-amber-100 text-amber-700' },
                    { id: 'SHP-9023', from: 'Rotterdam, NLD', to: 'Cartagena, COL', status: 'Entregado', eta: '09 Nov 2026', color: 'bg-green-100 text-green-700' },
                    { id: 'SHP-9024', from: 'Panamá, PAN', to: 'Bogotá, COL', status: 'Retrasado', eta: '11 Nov 2026', color: 'bg-red-100 text-red-700' }
                  ].map((shipment, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-4 font-medium text-slate-800">{shipment.id}</td>
                      <td className="py-4 text-slate-600">{shipment.from}</td>
                      <td className="py-4 text-slate-600">{shipment.to}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${shipment.color}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-600">{shipment.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Rendimiento Operativo</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Entregas a Tiempo (SLA)</span>
                  <span className="font-bold text-slate-800">94%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Capacidad de Flota Aérea</span>
                  <span className="font-bold text-slate-800">78%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Capacidad de Flota Marítima</span>
                  <span className="font-bold text-slate-800">88%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
