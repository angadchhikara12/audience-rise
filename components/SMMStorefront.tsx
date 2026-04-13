'use client'

import { useState, useEffect, useMemo } from 'react'
import { getServices, SMMService, getPaymentLink } from '@/app/actions/smm'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Zap, TrendingUp, Users, MessageSquare, Eye, Share2, Star, CreditCard, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export default function SMMStorefront() {
  const [services, setServices] = useState<SMMService[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedService, setSelectedService] = useState<SMMService | null>(null)
  const [quantity, setQuantity] = useState<string>('')
  const [paymentLink, setPaymentLink] = useState<string>('')

  useEffect(() => {
    const init = async () => {
      try {
        const [data, link] = await Promise.all([getServices(), getPaymentLink()])
        setServices(data)
        setPaymentLink(link)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(services.map(s => s.category)))
    return ['All', ...unique]
  }, [services])

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || s.category === category
      return matchesSearch && matchesCategory
    })
  }, [services, search, category])

  const groupedServices = useMemo(() => {
    const groups: Record<string, SMMService[]> = {}
    filteredServices.forEach(s => {
      let platform = 'Other'
      const c = s.category.toLowerCase()
      if (c.includes('instagram')) platform = 'Instagram'
      else if (c.includes('youtube')) platform = 'YouTube'
      else if (c.includes('tiktok')) platform = 'TikTok'
      else if (c.includes('facebook')) platform = 'Facebook'
      else if (c.includes('twitter') || c.includes(' x ')) platform = 'X'
      else if (c.includes('spotify')) platform = 'Spotify'
      else platform = s.category.split(' ')[0] || 'Other'
      
      if (!groups[platform]) groups[platform] = []
      groups[platform].push(s)
    })
    return groups
  }, [filteredServices])

  const getPlatformIcon = (category: string) => {
    const c = category.toLowerCase()
    const iconClass = "w-6 h-6 object-contain"
    if (c.includes('instagram')) return <img src="/images/instagram.png" alt="Instagram" className={iconClass} />
    if (c.includes('youtube')) return <img src="/images/youtube.png" alt="YouTube" className={iconClass} />
    if (c.includes('tiktok')) return <img src="/images/tiktok.png" alt="TikTok" className={iconClass} />
    if (c.includes('facebook')) return <img src="/images/facebook.png" alt="Facebook" className={iconClass} />
    if (c.includes('twitter') || c.includes(' x ')) return <img src="/images/x.png" alt="X" className={iconClass} />
    if (c.includes('spotify')) return <img src="/images/spotify.png" alt="Spotify" className={iconClass} />
    return <Star className="w-6 h-6 text-purple-400" />
  }

  const handleDeploy = (service: SMMService) => {
    setSelectedService(service)
    setQuantity(service.min)
  }

  const calculateTotal = () => {
    if (!selectedService || !quantity) return '0.000'
    const rate = parseFloat(selectedService.rate)
    const qty = parseInt(quantity) || 0
    return ((rate / 1000) * qty).toFixed(3)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="relative">
          <div className="w-24 h-24 border-8 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-24 h-24 border-8 border-transparent border-b-purple-500 rounded-full animate-spin [animation-delay:-0.5s]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Filters & Sticky Category Bar */}
      <div className="sticky top-4 z-50 space-y-4 p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-2">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
            <Input 
              placeholder="Search neural grid..." 
              className="pl-14 bg-black/40 border-white/10 focus-visible:ring-cyan-500/50 text-white placeholder:text-white/30 h-16 md:h-11 rounded-2xl text-2xl md:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <ScrollArea className="w-full md:w-auto">
            <div className="flex gap-3 md:gap-2 p-2 md:p-1">
              {categories.slice(0, 8).map(c => (
                <Button
                  key={c}
                  variant={category === c ? 'default' : 'ghost'}
                  size="lg"
                  onClick={() => setCategory(c)}
                  className={`rounded-2xl md:rounded-xl px-6 md:px-4 h-14 md:h-9 text-lg md:text-[10px] uppercase tracking-widest font-black md:font-bold transition-all ${
                    category === c 
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] md:shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {c}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Grouped Grid */}
      <div className="space-y-16">
        {Object.entries(groupedServices).map(([platform, platformServices]) => (
          <div key={platform} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                {getPlatformIcon(platform)}
              </div>
              <h3 className="text-xl font-black tracking-tighter text-white uppercase italic">
                {platform} <span className="text-cyan-500/40 font-mono text-sm ml-2 tracking-normal not-italic">{platformServices.length} Nodes</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformServices.slice(0, 24).map((service) => (
                <Card key={service.service} className="group relative overflow-hidden bg-white/5 backdrop-blur-md border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-colors"></div>
                  
                  <CardHeader className="flex-none pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-mono text-sm md:text-[9px] tracking-widest uppercase px-2 md:px-1.5 h-6 md:h-4">
                        NODE-{service.service}
                      </Badge>
                      <div className="opacity-40 group-hover:opacity-100 transition-opacity scale-150 md:scale-100">
                        {getPlatformIcon(service.category)}
                      </div>
                    </div>
                    <CardTitle className="text-3xl md:text-base font-black md:font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 min-h-[4rem] md:min-h-[2.5rem] leading-tight md:leading-snug">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow pt-4 md:pt-2">
                    <div className="grid grid-cols-2 gap-6 md:gap-4">
                      <div className="space-y-1 md:space-y-0.5">
                        <p className="text-sm md:text-[9px] text-white/30 uppercase tracking-tighter font-bold">Base Rate</p>
                        <p className="text-4xl md:text-xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent tracking-tighter">
                          ${service.rate}
                        </p>
                      </div>
                      <div className="text-right space-y-1 md:space-y-0.5">
                        <p className="text-sm md:text-[9px] text-white/30 uppercase tracking-tighter font-bold">Capacity</p>
                        <p className="text-xl md:text-xs font-mono text-white/60">
                          {service.min} <span className="text-xs md:text-[8px] opacity-30 px-1">/</span> {service.max}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex-none pt-6 md:pt-4 border-t border-white/5 bg-white/[0.02]">
                    <Button 
                      onClick={() => handleDeploy(service)}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-sans font-black uppercase tracking-tighter text-lg md:text-[10px] h-14 md:h-10 group-hover:scale-[1.02] transition-transform"
                    >
                      Initialize Deployment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl md:max-w-md backdrop-blur-2xl p-10 md:p-6">
          <DialogHeader className="gap-4 md:gap-2">
            <DialogTitle className="text-5xl md:text-2xl font-black tracking-tighter flex items-center gap-4 md:gap-2">
              <CreditCard className="w-12 h-12 md:w-6 h-6 text-cyan-400" />
              PAYMENT PROTOCOL
            </DialogTitle>
            <DialogDescription className="text-xl md:text-sm text-white/40 leading-relaxed">
              Configure your engagement parameters and initiate secure transfer.
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-10 md:space-y-6 py-8 md:py-4">
              <div className="p-8 md:p-4 bg-white/5 rounded-3xl md:rounded-xl border border-white/10">
                <h4 className="text-2xl md:text-sm font-black md:font-bold text-cyan-400 mb-2 md:mb-1 uppercase tracking-widest leading-tight">{selectedService.name}</h4>
                <p className="text-lg md:text-xs text-white/30">{selectedService.category}</p>
              </div>

              <div className="space-y-4 md:space-y-2">
                <label className="text-lg md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-black md:font-bold">Quantity (Min: {selectedService.min})</label>
                <Input 
                  type="number" 
                  min={selectedService.min} 
                  max={selectedService.max}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-black/40 border-white/10 text-white h-20 md:h-10 text-3xl md:text-base px-6 md:px-3 rounded-2xl md:rounded-md"
                />
              </div>

              <div className="p-8 md:p-4 bg-cyan-500/5 rounded-3xl md:rounded-xl border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <p className="text-lg md:text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-black md:font-bold">Total Transfer</p>
                  <p className="text-6xl md:text-3xl font-black text-white tracking-tighter">${calculateTotal()}</p>
                </div>
                <Zap className="w-16 h-16 md:w-8 h-8 text-cyan-500/20" />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button 
              className="w-full bg-[#00D632] hover:bg-[#00B32A] text-white font-sans font-black uppercase tracking-widest py-10 md:py-6 rounded-[2.5rem] md:rounded-2xl group shadow-[0_0_60px_-10px_rgba(0,214,50,0.6)] md:shadow-[0_0_30px_-5px_rgba(0,214,50,0.3)] transition-all flex items-center justify-center gap-6 md:gap-3 h-auto"
              onClick={() => window.open('https://cash.app/$indicoder', '_blank')}
            >
              <span className="text-2xl sm:text-4xl md:text-lg tracking-tighter">Pay with Cash App</span>
              <ExternalLink className="w-8 h-8 sm:w-10 sm:h-10 md:w-5 md:h-5 group-hover:translate-x-2 md:group-hover:translate-x-1 group-hover:-translate-y-2 md:group-hover:-translate-y-1 transition-transform" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredServices.length === 0 && (
        <div className="text-center py-40 bg-white/5 border border-dashed border-white/10 rounded-[3rem]">
          <Zap className="w-24 h-24 text-white/10 mx-auto mb-8" />
          <h3 className="text-4xl font-black text-white/60 uppercase tracking-tighter">No digital assets found</h3>
          <p className="text-xl text-white/30 mt-4">Adjust your neural filters and try again.</p>
        </div>
      )}
    </div>
  )
}
