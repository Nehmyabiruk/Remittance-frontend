import { Link } from "react-router-dom";
import { Send, Shield, Zap, Globe, CheckCircle, ArrowRight, Users, DollarSign, Clock, Star, Menu, X, CreditCard, TrendingUp, Smartphone } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";

export default function GetStarted() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── STICKY NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-shadow">
                <Send className="w-4.5 h-4.5 text-white" />
              </div>
              <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? "text-gray-900" : "text-white drop-shadow"}`}>
                SwiftRemit
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Features", "How It Works", "Business", "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    scrolled ? "text-gray-600" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-5 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container mx-auto px-6 py-4 space-y-1">
              {["Features", "How It Works", "Business", "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-gray-100 mt-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full text-sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm">Get Started Free</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1726065235158-d9c3f817f331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0ZWNobm9sb2d5JTIwZGlnaXRhbCUyMHBheW1lbnRzfGVufDF8fHx8MTc3Mzc0MTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute top-32 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-6 pt-28 pb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm px-4 py-1.5 rounded-full shadow-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 2M+ users worldwide
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center leading-tight mb-6 drop-shadow-2xl">
            Send Money
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Without Borders
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 text-center max-w-2xl mx-auto mb-10 drop-shadow leading-relaxed">
            Instant, secure, and affordable international transfers — send to family and friends in 180+ countries in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold text-base px-8 py-6 shadow-2xl shadow-black/30 hover:scale-105 transition-transform"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md font-semibold text-base px-8 py-6 hover:scale-105 transition-transform"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Zap, label: "Instant Transfers" },
              { icon: Shield, label: "Bank-Level Security" },
              { icon: Globe, label: "180+ Countries" },
              { icon: CreditCard, label: "Low Fees" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2 rounded-full"
              >
                <Icon className="w-4 h-4 text-blue-300" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-3 divide-x divide-white/20 text-center">
              {[
                { value: "2M+", label: "Active Users" },
                { value: "$5B+", label: "Sent Annually" },
                { value: "180+", label: "Countries" },
              ].map(({ value, label }) => (
                <div key={label} className="px-4">
                  <div className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">{value}</div>
                  <div className="text-white/70 text-xs md:text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURE CARDS ── */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why SwiftRemit</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">Built for Speed & Trust</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Everything you need for effortless global money transfers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                color: "from-amber-400 to-orange-500",
                bg: "bg-amber-50",
                title: "Lightning Fast",
                desc: "Transfers complete in seconds with our real-time payment rails — no waiting, no delays.",
              },
              {
                icon: Shield,
                color: "from-blue-500 to-indigo-600",
                bg: "bg-blue-50",
                title: "Bank-Level Security",
                desc: "256-bit encryption, 2FA, and advanced fraud detection keep your money safe 24/7.",
              },
              {
                icon: Globe,
                color: "from-emerald-400 to-teal-600",
                bg: "bg-emerald-50",
                title: "Global Reach",
                desc: "Send to 180+ countries with live exchange rates and multiple payout methods.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1713256667652-412312c6fa08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMG1vYmlsZSUyMHBheW1lbnR8ZW58MXx8fHwxNzczNzQzMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy customers using mobile payment"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Average savings</p>
                  <p className="text-base font-bold text-gray-900">Up to 80% less fees</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">The SwiftRemit Advantage</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-8">Why Millions Choose Us</h2>
              <div className="space-y-7">
                {[
                  { icon: DollarSign, color: "bg-blue-100 text-blue-600", title: "Lowest Fees in the Market", desc: "Transparent pricing with no hidden charges — save more on every transfer." },
                  { icon: Clock, color: "bg-green-100 text-green-600", title: "Real-Time Transfers", desc: "Money arrives in seconds. Track every step with live notifications." },
                  { icon: Shield, color: "bg-purple-100 text-purple-600", title: "Maximum Security", desc: "Industry-standard encryption and full regulatory compliance worldwide." },
                  { icon: Users, color: "bg-orange-100 text-orange-600", title: "24/7 Expert Support", desc: "Our dedicated team is always here — chat, email, or phone." },
                ].map(({ icon: Icon, color, title, desc }) => (
                  <div key={title} className="flex gap-5 group">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">Send in 3 Easy Steps</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">From signup to delivery in under 2 minutes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

            {[
              { step: "01", icon: Smartphone, title: "Create Account", desc: "Sign up free in minutes — just your email and basic info. No credit check required." },
              { step: "02", icon: CreditCard, title: "Enter Details", desc: "Choose recipient, enter amount, pick your payment method. Quick and intuitive." },
              { step: "03", icon: Send, title: "Send & Track", desc: "Confirm your transfer and track it live. Instant notifications on delivery." },
            ].map(({ step, icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 text-center transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {step}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 mt-2 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL COVERAGE ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Global Network</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-5">Send Love Across Every Border</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Connect with your loved ones across the globe. SwiftRemit supports 180+ countries with multiple flexible payout options.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  "Bank deposits in local currency",
                  "Cash pickup at thousands of locations",
                  "Mobile wallet transfers",
                  "Home delivery in select countries",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all hover:scale-105">
                  Start Sending Money
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758686254030-a6dae2f49e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2aWRlbyUyMGNhbGwlMjBjb21tdW5pY2F0aW9ufGVufDF8fHx8MTc3Mzc0MzE1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Family staying connected"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGxvY2slMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzcwOTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Security technology"
                className="rounded-2xl shadow-2xl w-full opacity-90"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </div>
            <div>
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Security First</span>
              <h2 className="text-4xl font-extrabold text-white mt-2 mb-5">Your Money is Always Safe</h2>
              <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                We built SwiftRemit with security at the core — protecting your funds and data with industry-leading technology.
              </p>
              <div className="space-y-5">
                {[
                  { title: "256-bit SSL Encryption", desc: "Same encryption used by the world's largest banks." },
                  { title: "Regulatory Compliance", desc: "Licensed and fully regulated in every country we operate." },
                  { title: "Two-Factor Authentication", desc: "Multi-layer verification adds an extra shield to your account." },
                  { title: "AI Fraud Protection", desc: "Real-time monitoring detects and blocks suspicious activity instantly." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4 items-start group">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{title}</p>
                      <p className="text-blue-300 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS SOLUTIONS ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">For Business</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-5">Scale Your Global Payments</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Pay contractors, suppliers, and remote teams worldwide — fast, efficient, and cost-effective.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  "Bulk payment processing",
                  "Multi-currency accounts",
                  "Competitive business rates",
                  "Dedicated account manager",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold hover:scale-105 transition-transform">
                Learn About Business Plans
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758876202430-a0595cf17d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwc21hcnRwaG9uZSUyMGJhbmtpbmd8ZW58MXx8fHwxNzczNzQzMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Business banking"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Customer Stories</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">Loved by Millions</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Real feedback from real people who rely on SwiftRemit every day.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                text: "SwiftRemit has transformed how I support my family back home. Transfers are instant and the fees are the lowest I've ever seen!",
                name: "Maria Garcia",
                location: "New York, USA",
                initials: "MG",
                color: "from-blue-500 to-indigo-600",
              },
              {
                text: "The customer support is world-class. They helped me set everything up in minutes. I recommend SwiftRemit to everyone.",
                name: "John Davidson",
                location: "London, UK",
                initials: "JD",
                color: "from-emerald-500 to-teal-600",
              },
              {
                text: "As a business owner, SwiftRemit is invaluable for paying international contractors. Fast, reliable, and incredibly affordable.",
                name: "Sarah Kim",
                location: "Toronto, Canada",
                initials: "SK",
                color: "from-purple-500 to-pink-600",
              },
            ].map(({ text, name, location, initials, color }) => (
              <div
                key={name}
                className="bg-gray-50 hover:bg-white rounded-3xl p-8 border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-7 leading-relaxed text-sm">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            🚀 Start in under 2 minutes
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready to Send Money<br />Worldwide?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Join 2 million+ users who trust SwiftRemit for fast, affordable international transfers.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-base px-10 py-6 shadow-2xl shadow-black/20 hover:scale-105 transition-transform"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-blue-200 text-sm mt-5">No credit card required • Setup in minutes • Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Send className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">SwiftRemit</span>
              </div>
              <p className="text-sm leading-relaxed mb-5 max-w-xs">
                Making international money transfers simple, secure, and affordable — for everyone, everywhere.
              </p>
              <div className="flex gap-3">
                {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                  <a key={s} href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:text-white transition-colors">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Send Money", "Pricing", "Business", "Mobile App"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
              { title: "Support", links: ["Help Center", "Security", "Privacy Policy", "Terms of Service"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white font-semibold mb-4 text-sm">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition-colors hover:underline underline-offset-2">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 SwiftRemit. All rights reserved.</p>
            <p className="text-gray-600">Licensed & regulated in 50+ countries</p>
          </div>
        </div>
      </footer>
    </div>
  );
}