'use client';

import { useState } from 'react';
import Link from 'next/link';

const platforms = [
  { name: 'iOS', icon: '📱', desc: 'iPhone apps' },
  { name: 'macOS', icon: '💻', desc: 'Desktop apps' },
  { name: 'iPadOS', icon: '📲', desc: 'Tablet apps' },
  { name: 'watchOS', icon: '⌚', desc: 'Apple Watch' },
  { name: 'tvOS', icon: '📺', desc: 'Apple TV' },
  { name: 'visionOS', icon: '🥽', desc: 'Vision Pro' },
  { name: 'Web', icon: '🌐', desc: 'Progressive Web' },
  { name: 'AirPods', icon: '🎧', desc: 'Audio experiences' },
];

interface AppIdea {
  name: string;
  tagline: string;
  description: string;
  platforms: string[];
  category: string;
  features: string[];
  techStack: string[];
  gtmStrategy: string;
  monetization: string;
  targetAudience: string;
  uniqueValue: string;
}

export default function Generate() {
  const [platform, setPlatform] = useState('iOS');
  const [generating, setGenerating] = useState(false);
  const [idea, setIdea] = useState<AppIdea | null>(null);
  const [error, setError] = useState('');

  const generate = async () => {
    setGenerating(true);
    setError('');
    setIdea(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      setIdea(data);
    } catch (err) {
      setError('Failed to generate idea. Please try again.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <nav className="border-b border-gray-800 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-300 hover:text-white transition">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Generate App Idea
          </h1>
          <p className="text-gray-400 text-lg">AI-powered ideas with complete implementation details</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-800 mb-8">
          <label className="block text-lg font-semibold mb-4">Select Platform</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {platforms.map((p) => (
              <button
                key={p.name}
                onClick={() => setPlatform(p.name)}
                disabled={generating}
                className={`py-4 px-4 rounded-xl font-semibold transition ${
                  platform === p.name
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } disabled:opacity-50`}
              >
                <div className="text-2xl mb-1">{p.icon}</div>
                <div className="text-sm">{p.name}</div>
              </button>
            ))}
          </div>

          <button
            onClick={generate}
            disabled={generating}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>✨ Generate Idea</>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {idea && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{idea.name}</h2>
                  <p className="text-xl text-gray-400">{idea.tagline}</p>
                </div>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                  {idea.category}
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{idea.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span>✨</span> Features
                </h3>
                <ul className="space-y-3">
                  {idea.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span>🛠️</span> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <span>🚀</span> Go-to-Market Strategy
              </h3>
              <p className="text-gray-300 leading-relaxed">{idea.gtmStrategy}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800">
                <h4 className="font-semibold text-sm text-gray-400 mb-2">💰 Monetization</h4>
                <p className="text-white font-medium">{idea.monetization}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800">
                <h4 className="font-semibold text-sm text-gray-400 mb-2">🎯 Target Audience</h4>
                <p className="text-white font-medium">{idea.targetAudience}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800">
                <h4 className="font-semibold text-sm text-gray-400 mb-2">⭐ Unique Value</h4>
                <p className="text-white font-medium">{idea.uniqueValue}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={generate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Generate Another
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(idea, null, 2));
                }}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
              >
                Copy JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
