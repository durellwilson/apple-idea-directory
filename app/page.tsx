'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const platforms = [
  { name: 'iOS', icon: '📱', color: 'from-blue-500 to-cyan-500' },
  { name: 'macOS', icon: '💻', color: 'from-purple-500 to-pink-500' },
  { name: 'iPadOS', icon: '📲', color: 'from-orange-500 to-red-500' },
  { name: 'watchOS', icon: '⌚', color: 'from-green-500 to-emerald-500' },
  { name: 'tvOS', icon: '📺', color: 'from-indigo-500 to-blue-500' },
  { name: 'visionOS', icon: '🥽', color: 'from-pink-500 to-rose-500' },
  { name: 'Web', icon: '🌐', color: 'from-yellow-500 to-orange-500' },
  { name: 'AirPods', icon: '🎧', color: 'from-teal-500 to-cyan-500' },
];

const featuredIdeas = [
  {
    name: 'MindfulMoments',
    tagline: 'Micro-meditation for busy professionals',
    platform: 'watchOS',
    category: 'Health',
    icon: '🧘'
  },
  {
    name: 'CodeSnippet Pro',
    tagline: 'Beautiful code snippet manager',
    platform: 'macOS',
    category: 'Developer Tools',
    icon: '💻'
  },
  {
    name: 'SpatialNotes',
    tagline: '3D note-taking in mixed reality',
    platform: 'visionOS',
    category: 'Productivity',
    icon: '📝'
  },
  {
    name: 'FocusFlow',
    tagline: 'Adaptive audio for deep work',
    platform: 'AirPods',
    category: 'Productivity',
    icon: '🎵'
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <nav className="border-b border-gray-800 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🍎 Apple Idea Directory
          </h1>
          <div className="space-x-4">
            <Link href="/explore" className="text-gray-300 hover:text-white transition">Explore</Link>
            <Link href="/generate" className="text-gray-300 hover:text-white transition">Generate</Link>
            <Link href="/submit" className="text-gray-300 hover:text-white transition">Submit</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Infinite App Ideas
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            AI-powered directory of innovative Apple ecosystem app ideas. Explore, generate, and submit ideas 24/7.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/generate" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition">
              Generate New Idea
            </Link>
            <Link href="/explore" className="border-2 border-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:border-gray-600 transition">
              Explore Directory
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">🚀 Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <Link
                key={platform.name}
                href={`/platform/${platform.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition">
                  <div className="text-5xl mb-3">{platform.icon}</div>
                  <h4 className="text-xl font-bold">{platform.name}</h4>
                  <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r ${platform.color} rounded-full mt-2`}></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">✨ Featured Ideas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredIdeas.map((idea) => (
              <div
                key={idea.name}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{idea.icon}</div>
                  <span className="text-xs px-3 py-1 bg-gray-700 rounded-full">{idea.platform}</span>
                </div>
                <h4 className="text-2xl font-bold mb-2">{idea.name}</h4>
                <p className="text-gray-400 mb-4">{idea.tagline}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">{idea.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h3 className="text-4xl font-bold mb-4">🤖 AI-Powered Generation</h3>
          <p className="text-xl mb-8 opacity-90">
            Our AI generates new app ideas 24/7. Never run out of inspiration.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-bold mb-2">Infinite Ideas</h4>
              <p className="text-sm opacity-90">AI generates unique ideas for every Apple platform</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">GTM Strategy</h4>
              <p className="text-sm opacity-90">Complete go-to-market plans included</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🛠️</div>
              <h4 className="font-bold mb-2">Tech Stack</h4>
              <p className="text-sm opacity-90">Recommended frameworks and tools</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">
          <p>Powered by AI • Updated 24/7 • Community-Driven</p>
          <p className="text-sm mt-2">Infinite ideas for the Apple ecosystem</p>
        </div>
      </footer>
    </main>
  );
}
