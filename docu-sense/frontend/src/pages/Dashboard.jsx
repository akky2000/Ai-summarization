import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Upload, Zap, FileText, PieChart, Clock, File, Share2 } from "lucide-react";
import { Link } from "react-router-dom";



export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 mt-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Welcome back <span className="text-blue-600"></span> 👋
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Clock size={16} />
              Last login: Today at 09:42 AM
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search the documents"
              className="pl-10 w-full rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* <Button  className="h-24 bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
            <Upload className="text-blue-600" size={24} />
            <span className="text-sm font-medium text-gray-700">Upload New Document</span>
            
          </Button> */}


            <Link to="/upload-document">
                <Button className="h-24 bg-white hover:from-blue-100  border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 transition-all w-full cursor">
                  <Upload className="text-blue-600" size={24} />
                  <span className="text-sm font-medium text-gray-700">Upload New Document</span>
                </Button>
            </Link>


          <Link to="/all-document">
          <Button className="h-24 bg-white hover:from-blue-100  border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 transition-all w-full">
            <Zap className="text-yellow-400" size={24} />
            <span className="text-sm font-medium text-gray-700">All Document</span>
          </Button>
          </Link>

          <Button className="h-24 bg-white hover:from-blue-100  border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 transition-all w-full">
            <Share2 className="text-green-600" size={24} />
            <span className="text-sm font-medium text-gray-700">Smart Analysis</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Documents", value: "1.2K", icon: FileText, progress: 65, color: "blue" },
            { label: "Auto-Processed", value: "892", icon: Zap, progress: 82, color: "purple" },
            { label: "Resumes", value: "145", icon: File, progress: 28, color: "green" },
            { label: "Invoices", value: "327", icon: PieChart, progress: 45, color: "orange" },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white hover:shadow-lg transition-shadow rounded-xl border border-gray-100">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`text-${stat.color}-600`} size={20} />
                  <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <div className="relative w-1/2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 bg-${stat.color}-600 rounded-full transition-all duration-500`}
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Uploads */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload size={20} className="text-blue-600" />
              Recent Uploads
            </h2>
            <div className="space-y-4">
              {[
                { name: "Senior_UX_Designer.pdf", date: "2h ago", type: "Resume", size: "2.4 MB" },
                { name: "Q1_Financial_Report.pdf", date: "4h ago", type: "Report", size: "5.1 MB" },
                { name: "Client_Contract.docx", date: "1d ago", type: "Contract", size: "1.2 MB" },
              ].map((upload, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="text-blue-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{upload.name}</h3>
                    <p className="text-sm text-gray-500">{upload.type} • {upload.size}</p>
                  </div>
                  <span className="text-sm text-gray-500">{upload.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap size={20} className="text-purple-600" />
              System Activity
            </h2>
            <div className="space-y-4">
              {[
                { action: "Auto-classified 12 documents", time: "15m ago", type: "processing" },
                { action: "Completed resume analysis", time: "45m ago", type: "success" },
                { action: "New invoice template detected", time: "2h ago", type: "alert" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'alert' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}