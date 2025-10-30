import React, { useState, useRef, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Phone, Calendar, Users, ExternalLink, X } from 'lucide-react';

interface TestResult {
  name: string;
  phone: string;
  currentGroup: string;
  examDate: string;
  result: 'Selected' | 'Not Selected';
  whatsappLink?: string;
}

const mockResults: Record<string, TestResult> = {
  '9876543210': {
    name: 'Rajesh Kumar',
    phone: '9876543210',
    currentGroup: 'Level-2 Group A',
    examDate: '2024-11-15',
    result: 'Selected',
    whatsappLink: 'https://chat.whatsapp.com/level3group'
  },
  '8765432109': {
    name: 'Priya Sharma',
    phone: '8765432109',
    currentGroup: 'Level-2 Group B',
    examDate: '2024-11-15',
    result: 'Not Selected'
  },
  '7654321098': {
    name: 'Amit Patel',
    phone: '7654321098',
    currentGroup: 'Level-2 Group C',
    examDate: '2024-11-15',
    result: 'Selected',
    whatsappLink: 'https://chat.whatsapp.com/level3group'
  }
};

const Results: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search-result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: phoneNumber })
      });
      
      const apiResult = await response.json();
      
      if (apiResult.success && apiResult.data) {
        const resultData = {
          name: apiResult.data.name,
          phone: apiResult.data.phone,
          currentGroup: apiResult.data.current_group,
          examDate: apiResult.data.exam_date,
          result: apiResult.data.result as 'Selected' | 'Not Selected',
          whatsappLink: apiResult.data.result === 'Selected' ? apiResult.whatsappLink : undefined
        };
        setResult(resultData);
      } else {
        // Show as Not Selected with placeholder data
        const notFoundResult = {
          name: 'Not Available',
          phone: phoneNumber,
          currentGroup: 'Not Available',
          examDate: 'Not Available',
          result: 'Not Selected' as 'Selected' | 'Not Selected'
        };
        setResult(notFoundResult);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setError('Failed to fetch results. Please try again.');
    }
    
    setIsLoading(false);
    
    // Scroll to results on mobile with header offset
    setTimeout(() => {
      if (window.innerWidth < 1024 && resultsRef.current) {
        const headerHeight = 80;
        const elementPosition = resultsRef.current.offsetTop - headerHeight;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-20 pb-12 lg:pb-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-8 lg:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Meditation Test Results for Level-3 Entry
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Search Results</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 10) {
                        setPhoneNumber(value);
                      }
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                  />
                  {/* {phoneNumber && (
                    <button
                      type="button"
                      onClick={() => setPhoneNumber('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )} */}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="flex-1 bg-orange-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneNumber('');
                    setResult(null);
                    setError('');
                  }}
                  disabled={!phoneNumber}
                  className="flex-1 bg-gray-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Results Display */}
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Test Results</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
            {result ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  {result.result.toLocaleLowerCase() === 'selected' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-bold ${
                    result.result.toLocaleLowerCase() === 'selected' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.result.toLocaleUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                    <p className="text-sm font-semibold text-gray-900">{result.name || '-'}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone Number</label>
                    <p className="text-sm font-semibold text-gray-900">{result.phone}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Level-2 Group</label>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <p className="text-sm font-semibold text-gray-900">{result.currentGroup || '-'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Exam Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <p className="text-sm font-semibold text-gray-900">{result.examDate && result.examDate !== 'Not Available' ? formatDate(result.examDate) : '-'}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    {result.result.toLocaleLowerCase() === 'selected' ? (
                      <a
                        href={result.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm mt-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Join Level-3 Group
                      </a>
                    ) : (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-1">
                        <p className="text-orange-800 text-sm font-medium mb-3">
                          Till you attend next month Meditation Test, continue with your Level-2 practice every day as taught by Pujya Gurudev.
                        </p>
                        <p className="text-orange-800 text-sm font-medium" style={{fontFamily: 'serif'}}>
                          వచ్చే నెలలో జరిగే మెడిటేషన్ టెస్ట్ అటెండ్ అయ్యే వరకు, గురుదేవులు నేర్పించిన విధంగా ప్రతి రోజూ లెవెల్-2 సాధన చెయ్యండి.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contact Information - Common for both Selected and Not Selected */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-sm font-medium text-center">
                      For any queries, WhatsApp to : <strong>6304429254</strong> (or) Call : <strong>7801046111</strong>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-2">Enter your mobile number and click Submit to view results.</p>
                <p className="text-gray-500 text-sm" style={{fontFamily: 'serif'}}>
                  మెడిటేషన్ టెస్ట్ రిసల్ట్స్ కొరకు, మీ మొబైలు నెంబర్ ఇచ్చి సబ్మిట్ బటన్ నొక్కండి.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">DISCLAIMER</h3>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              Siva Kundalini Sadhana Foundation (SKS) is a spiritual non-profit organization established solely for the purpose of imparting Kundalini Sadhana as taught by Parama Pujya Sri Jeeveswara Yogi (Gurudev). The knowledge, methods, practices, and techniques shared during sessions are the exclusive intellectual property of the organisation. Any reproduction, distribution, or unauthorised use of these teachings, in whole or in part, is strictly prohibited.
            </p>
            <p>
              While the practices are designed to support personal growth and inner balance, the organisation makes no express or implied guarantees or assurances or implied warranties regarding the healing, prevention, treatment, or resolution of any physical, mental, or emotional health conditions. The results and experiences of Kundalini Sadhana depend entirely on the individual's sincerity, discipline, and consistency of practice.
            </p>
            <p>
              By enrolling and participating in the sessions or related programmes conducted by the organisation, each individual acknowledges that they do so voluntarily and at their own discretion and risk. The organisation shall not be held liable for any outcomes resulting from the practice or application of the teachings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;