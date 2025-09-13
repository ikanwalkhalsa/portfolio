'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Send, Bot, User, FileText, Download, MessageSquare, Brain, Zap, Clock, Sparkles, ArrowRight, Star } from 'lucide-react'

export default function ResumeChat() {
  const [inputMessage, setInputMessage] = useState('')

  // Sample questions for preview
  const sampleQuestions = [
    "What are Kanwalpreet's main skills?",
    "Tell me about his work experience",
    "What projects has he worked on?",
    "What is his educational background?",
    "What programming languages does he know?",
    "What AI/ML technologies has he used?"
  ]

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // Disabled - coming soon
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Chat</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the future of resume interaction. Chat with an AI assistant that knows everything about my background, skills, and experience.
            </p>
            
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-semibold mb-8">
              <Clock className="w-5 h-5 mr-2" />
              Coming Soon
              <Sparkles className="w-5 h-5 ml-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Chat Preview */}
            <div className="lg:col-span-2 flex">
              <div className="bg-white rounded-2xl shadow-xl flex-1 flex flex-col border border-gray-100">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Resume AI Assistant</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Coming Soon
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages Preview */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* AI Message */}
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <p className="text-sm text-gray-900">
                          Hello! I'm your AI resume assistant. I can answer questions about Kanwalpreet's background, skills, experience, and projects. What would you like to know?
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                      </div>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        What are Kanwalpreet's main technical skills?
                      </p>
                      <p className="text-xs text-blue-100 mt-1">Just now</p>
                    </div>
                  </div>

                  {/* AI Response Preview */}
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <p className="text-sm text-gray-900">
                          Based on Kanwalpreet's resume, here are his key technical skills:
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-700">• Python (Expert) - ML/AI development</p>
                          <p className="text-xs text-gray-700">• JavaScript/TypeScript (Advanced)</p>
                          <p className="text-xs text-gray-700">• AI/ML Technologies (Expert)</p>
                          <p className="text-xs text-gray-700">• Computer Vision (Advanced)</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Just now</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area - Disabled */}
                <div className="p-6 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Kanwalpreet's background..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-400 cursor-not-allowed"
                      disabled={true}
                    />
                    <button
                      disabled={true}
                      className="px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed flex items-center"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    💡 This feature is coming soon! Stay tuned for the AI-powered resume chat experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col">
              <div className="bg-white rounded-2xl shadow-xl flex-1 flex flex-col border border-gray-100">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Coming Soon Features */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  Upcoming Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Brain className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">AI-Powered Responses</p>
                      <p className="text-xs text-gray-600">Intelligent answers based on resume data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Natural Language</p>
                      <p className="text-xs text-gray-600">Ask questions in plain English</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Real-time Chat</p>
                      <p className="text-xs text-gray-600">Instant responses and conversation flow</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Questions */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Be Able to Ask</h3>
                <div className="space-y-2">
                  {sampleQuestions.slice(0, 4).map((question, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100"
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Download */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Information</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Complete resume data available</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Brain className="w-4 h-4 mr-2" />
                    <span>AI will have full access</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Zap className="w-4 h-4 mr-2" />
                    <span>Real-time responses</span>
                  </div>
                </div>
                <button
                  disabled={true}
                  className="inline-flex items-center w-full justify-center px-4 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
              </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Will Work */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Will Work</h2>
              <p className="text-lg text-gray-600">Advanced AI technology to provide intelligent resume insights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Language Processing</h3>
                <p className="text-gray-600">
                  Your questions will be processed using advanced NLP to understand intent and extract relevant information from the resume data.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Responses</h3>
                <p className="text-gray-600">
                  Responses will be generated using RAG (Retrieval Augmented Generation) for accurate and contextual answers about experience and skills.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Resume Knowledge Base</h3>
                <p className="text-gray-600">
                  Complete resume data will be indexed and searchable, providing comprehensive information about background, skills, and achievements.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium">
              <ArrowRight className="w-5 h-5 mr-2" />
              Stay Updated
            </div>
            <p className="text-gray-600 mt-4">
              Follow my journey as I build this innovative AI-powered resume chat experience
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}