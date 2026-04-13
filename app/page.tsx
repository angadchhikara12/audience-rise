'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import SMMStorefront from '@/components/SMMStorefront'
import { Zap, Shield, Globe, Cpu } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-32 md:mb-20 bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-4 rounded-[2.5rem] md:rounded-2xl">
          <div className="flex items-center gap-4 md:gap-2">
            <div className="w-16 h-16 md:w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl md:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="text-black w-10 h-10 md:w-6 h-6 fill-current" />
            </div>
            <span className="text-4xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              AUDIENCERISE
            </span>
          </div>
          
          <div className="flex items-center gap-10 md:gap-6">
            <Authenticated>
              <div className="flex items-center gap-6 md:gap-4">
                <span className="text-sm md:text-[10px] font-black md:font-medium text-white/60 hidden md:block tracking-[0.4em] md:tracking-widest uppercase text-[12px] md:text-[10px]">Neural Link Active</span>
                <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-14 h-14 md:w-10 h-10 rounded-2xl md:rounded-xl border-2 md:border border-white/20' } }} />
              </div>
            </Authenticated>
            <Unauthenticated>
              <SignInButton mode="modal">
                <button className="px-10 py-4 md:px-6 md:py-2 bg-white text-black font-black md:font-bold rounded-2xl md:rounded-xl hover:bg-cyan-400 transition-colors tracking-widest md:tracking-tighter uppercase text-base md:text-xs">
                  Initiate Protocol
                </button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center mb-24 space-y-10 md:space-y-6 max-w-6xl md:max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-4 md:gap-2 px-6 py-2 md:px-3 md:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-lg md:text-[10px] font-black md:font-bold tracking-[0.2em] uppercase mb-4 animate-pulse">
            <Cpu className="w-6 h-6 md:w-3 h-3" /> System Version 4.0.2 Ready
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-tight">
            ENGINEERING <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              DIGITAL DOMINANCE
            </span>
          </h1>
          
          <p className="text-3xl md:text-xl text-white/50 max-w-4xl md:max-w-2xl mx-auto font-light leading-relaxed">
            Deploy advanced engagement algorithms to scale your social influence. 
            Automated, secure, and powered by the SMMWIZ neural network.
          </p>

          <div className="flex flex-wrap justify-center gap-12 md:gap-8 pt-12 md:pt-8">
            <div className="flex items-center gap-4 md:gap-2 text-white/40 group">
              <Shield className="w-8 h-8 md:w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="text-lg md:text-xs uppercase tracking-widest font-black md:font-medium">Encrypted Node</span>
            </div>
            <div className="flex items-center gap-4 md:gap-2 text-white/40 group">
              <Globe className="w-8 h-8 md:w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="text-lg md:text-xs uppercase tracking-widest font-black md:font-medium">Global Distribution</span>
            </div>
            <div className="flex items-center gap-4 md:gap-2 text-white/40 group">
              <Zap className="w-8 h-8 md:w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="text-lg md:text-xs uppercase tracking-widest font-black md:font-medium">Instant Fulfilment</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] -z-10"></div>
          <Authenticated>
            <div className="space-y-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40">Engagement Terminal</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>
              <SMMStorefront />
            </div>
          </Authenticated>
          <Unauthenticated>
            <div className="text-center py-40 md:py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3.5rem] md:rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Zap className="w-24 h-24 md:w-16 h-16 text-cyan-500 mx-auto mb-10 md:mb-6 animate-bounce" />
              <h2 className="text-6xl md:text-3xl font-black md:font-bold text-white mb-6 md:mb-4 tracking-tighter uppercase">Neural Link Required</h2>
              <p className="text-2xl md:text-base text-white/40 max-w-2xl md:max-w-md mx-auto mb-12 md:mb-8 leading-relaxed">
                Access to the engagement grid is restricted. Authenticate your profile to view wholesale rates and deploy services.
              </p>
              <SignInButton mode="modal">
                <button className="px-16 py-8 md:px-10 md:py-4 bg-cyan-500 text-black font-black rounded-[2rem] md:rounded-2xl hover:bg-cyan-400 transition-all hover:scale-105 shadow-2xl md:shadow-xl shadow-cyan-500/40 md:shadow-cyan-500/20 uppercase tracking-widest md:tracking-tighter text-xl md:text-base">
                  Connect Identity
                </button>
              </SignInButton>
            </div>
          </Unauthenticated>
        </section>

        {/* Footer */}
        <footer className="mt-60 md:mt-40 pt-20 md:pt-10 border-t border-white/5 text-center text-white/20">
          <p className="text-sm md:text-[10px] uppercase tracking-[0.5em] mb-8 md:mb-4 font-black md:font-normal">Powered by AudienceRise Neural Interface</p>
          <div className="flex justify-center gap-12 md:gap-6 text-xs md:text-[10px] uppercase tracking-widest font-bold md:font-normal">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Service Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">API Docs</a>
          </div>
        </footer>
      </div>
    </main>
  )
}
