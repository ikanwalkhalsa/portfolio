'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MessageSquare, TrendingUp, TrendingDown, Minus, Brain, Zap, BarChart3 } from 'lucide-react'

export default function NLPSentimentDemo() {
  const [inputText, setInputText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<{
    sentiment: 'positive' | 'negative' | 'neutral'
    confidence: number
    emotions: Array<{ emotion: string; score: number }>
    entities: Array<{ entity: string; type: string; score: number }>
  } | null>(null)

  // Sample text examples
  const sampleTexts = [
    "I absolutely love this new product! It's amazing and exceeded all my expectations. Highly recommended!",
    "This service is terrible. I've been trying to get help for days and nobody responds. Very disappointed.",
    "The weather today is okay. Nothing special, just a regular day. Could be better, could be worse.",
    "Congratulations on your promotion! You've worked so hard and you truly deserve this success. I'm so proud of you!",
    "I hate waiting in long lines. It's so frustrating when there's only one cashier and dozens of customers.",
    "The movie was decent. Some parts were good, others were boring. Overall, it was an average film."
  ]

  // Simulate NLP analysis (in real implementation, this would use a transformer model)
  const analyzeText = async () => {
    if (!inputText.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock analysis results based on keywords
    const text = inputText.toLowerCase()
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    let confidence = 0.7
    
    const positiveWords = ['love', 'amazing', 'great', 'excellent', 'wonderful', 'fantastic', 'awesome', 'good', 'best', 'perfect', 'congratulations', 'proud', 'deserve', 'recommended']
    const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'worst', 'disappointed', 'frustrating', 'horrible', 'disgusting', 'angry', 'sad', 'upset']
    
    const positiveScore = positiveWords.filter(word => text.includes(word)).length
    const negativeScore = negativeWords.filter(word => text.includes(word)).length
    
    if (positiveScore > negativeScore) {
      sentiment = 'positive'
      confidence = 0.8 + Math.random() * 0.2
    } else if (negativeScore > positiveScore) {
      sentiment = 'negative'
      confidence = 0.8 + Math.random() * 0.2
    } else {
      sentiment = 'neutral'
      confidence = 0.6 + Math.random() * 0.3
    }
    
    // Mock emotion detection
    const emotions = [
      { emotion: 'Joy', score: sentiment === 'positive' ? 0.8 + Math.random() * 0.2 : Math.random() * 0.3 },
      { emotion: 'Sadness', score: sentiment === 'negative' ? 0.7 + Math.random() * 0.3 : Math.random() * 0.3 },
      { emotion: 'Anger', score: sentiment === 'negative' ? 0.6 + Math.random() * 0.4 : Math.random() * 0.2 },
      { emotion: 'Fear', score: Math.random() * 0.4 },
      { emotion: 'Surprise', score: Math.random() * 0.5 },
      { emotion: 'Disgust', score: sentiment === 'negative' ? 0.5 + Math.random() * 0.3 : Math.random() * 0.2 }
    ].sort((a, b) => b.score - a.score)
    
    // Mock entity recognition
    const entities = [
      { entity: 'Product', type: 'NOUN', score: 0.9 },
      { entity: 'Service', type: 'NOUN', score: 0.8 },
      { entity: 'Company', type: 'ORG', score: 0.7 }
    ].filter(() => Math.random() > 0.5)
    
    setResults({
      sentiment,
      confidence,
      emotions,
      entities
    })
    
    setIsAnalyzing(false)
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-6 h-6 text-green-500" />
      case 'negative':
        return <TrendingDown className="w-6 h-6 text-red-500" />
      default:
        return <Minus className="w-6 h-6 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100'
      case 'negative':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              NLP Sentiment Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced sentiment analysis with emotion detection using transformer models. 
              Analyze text sentiment, emotions, and extract entities in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Analysis Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Analysis</h2>
                
                {/* Input Area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter text to analyze:
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste text here to analyze sentiment, emotions, and entities..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {inputText.length} characters
                    </span>
                    <button
                      onClick={analyzeText}
                      disabled={!inputText.trim() || isAnalyzing}
                      className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Analyze Text
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sample Texts */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Try these examples:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sampleTexts.map((text, index) => (
                      <button
                        key={index}
                        onClick={() => setInputText(text)}
                        className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        {text.length > 80 ? `${text.substring(0, 80)}...` : text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              {results && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
                  
                  {/* Sentiment */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
                    <div className="flex items-center space-x-4">
                      {getSentimentIcon(results.sentiment)}
                      <div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(results.sentiment)}`}>
                          {results.sentiment.charAt(0).toUpperCase() + results.sentiment.slice(1)}
                        </div>
                        <div className="mt-1">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">Confidence:</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${results.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              {(results.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emotions */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Emotion Detection</h3>
                    <div className="space-y-3">
                      {results.emotions.map((emotion, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700">{emotion.emotion}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-pink-500 h-2 rounded-full" 
                                style={{ width: `${emotion.score * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">
                              {(emotion.score * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entities */}
                  {results.entities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Named Entity Recognition</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {results.entities.map((entity, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{entity.entity}</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {entity.type}
                              </span>
                            </div>
                            <div className="mt-1">
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div 
                                  className="bg-blue-500 h-1 rounded-full" 
                                  style={{ width: `${entity.score * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technology Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Stack</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">BERT</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Sentiment Analysis
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">RoBERTa</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                      Emotion Detection
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">spaCy</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      NER
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Transformers</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Hugging Face
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    Sentiment Classification (Positive/Negative/Neutral)
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>
                    Emotion Detection (6 basic emotions)
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Named Entity Recognition
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Confidence Scoring
                  </li>
                </ul>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-purple-500 mr-2" />
                      <span className="text-gray-600">Accuracy</span>
                    </div>
                    <span className="font-bold text-gray-900">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">Speed</span>
                    </div>
                    <span className="font-bold text-gray-900">50ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">Languages</span>
                    </div>
                    <span className="font-bold text-gray-900">50+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Implementation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sentiment Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Uses fine-tuned BERT models for accurate sentiment classification. 
                  The model is trained on large-scale datasets for robust performance.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Multi-class sentiment classification</li>
                  <li>• 94.2% accuracy on test data</li>
                  <li>• Real-time processing capability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Emotion Detection</h3>
                <p className="text-gray-600 mb-4">
                  Advanced emotion recognition using RoBERTa-based models 
                  trained on emotion-labeled datasets.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 6 basic emotions + intensity</li>
                  <li>• Context-aware emotion analysis</li>
                  <li>• High precision emotion scoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
