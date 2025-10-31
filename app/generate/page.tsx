'use client';

import { useState } from 'react';
import Link from 'next/link';

const platforms = ['iOS', 'macOS', 'iPadOS', 'watchOS', 'tvOS', 'visionOS', 'Web', 'AirPods'];

export default function Generate() {
  const [platform, setPlatform] = useState('iOS');
  const [generating, setGenerating] = useState(false);
  const [idea, setIdea] = useState<any>(null);

  const generate = async () => {
    setGenerating(true);
    setIdea(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        result += decoder.decode(value);
      }

      // Parse JSON from stream
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setIdea(JSON.parse(jsonMatch[0]));
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <nav className="border-b border-gray-800 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-300 hover:text-white transition">← Back</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Generate App Idea
        </h1>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-800 mb-8">
          <label className="block text-lg font-semibold mb-4">Select Platform</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`py-3 px-4 rounded-xl font-semibold transition ${
                  platform === p
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={generate}
            disabled={generating}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {generating ? 'Generating...' : '✨ Generate Idea'}
          </button>
        </div>

        {idea && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold mb-2">{idea.name}</h2>
            <p className="text-xl text-gray-400 mb-6">{idea.tagline}</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-300">{idea.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Features</h3>
                <ul className="space-y-2">
                  {idea.features?.map((f: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack?.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">GTM Strategy</h3>
                <p className="text-gray-300">{idea.gtmStrategy}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-400 mb-1">Category</h4>
                  <p className="text-white">{idea.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-400 mb-1">Monetization</h4>
                  <p className="text-white">{idea.monetization}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-400 mb-1">Target</h4>
                  <p className="text-white">{idea.targetAudience}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
