import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { createApiEndpoint } from "@/config/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HeartPulse, Stethoscope, Shield, Users, Phone, MapPin, Clock, ChevronRight } from "lucide-react"
import { toast } from "react-hot-toast"
import { Navigation } from "@/components/landing-page/navigation"
import guidance from '../../../public/showing.jpg'
const LandingPage = () => {
  const navigate = useNavigate()
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", role: "", password: "" })
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const handleSignup = async (e) => {
    e?.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await axios.post(createApiEndpoint("auth/signup"), formData)
      if (res.data.success) {
        toast.success(res.data.message || "Account created")
        setShowSignup(false)
        setFormData({ name: "", email: "", role: "", password: "" })
      } else {
        toast.error(res.data.message || "Signup failed")
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Signup failed"
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = async (e) => {
    e?.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await axios.post(createApiEndpoint("auth/login"), loginData)
      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("name", res.data.user?.name || "")
          localStorage.setItem("role", res.data.user?.role || "")
          localStorage.setItem("userId", res.data.user?.id || "")
        }
        toast.success(res.data.message || "Logged in")
        setShowLogin(false)
        navigate("/dashboard")
      } else {
        toast.error(res.data.message || "Login failed")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => setShowLogin(true)} onSignupClick={() => setShowSignup(true)} />

      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground px-4 py-24 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Your Health. Our Care.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Trusted healthcare on-site at ASYV. Serving students, staff, and visitors with compassionate, professional
              medical care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base"
                onClick={() => setShowSignup(true)}
              >
                Get Care Today
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-base"
                onClick={() => {
                  const services = document.getElementById("services")
                  services?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="services" className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive healthcare services designed to support the ASYV community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Primary Healthcare</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete health assessments and treatment for general medical conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HeartPulse className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">First Aid & Urgent Care</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Immediate response for injuries, wounds, and medical emergencies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Preventive Check-ups</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Regular health screenings and wellness checks to maintain optimal health.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Health Education</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Community health programs promoting wellness and disease prevention.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Referral Coordination</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamless connections to regional hospitals for advanced care needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">On-Site Convenience</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accessible healthcare right on campus for students and staff.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="px-4 py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Why Choose ASYV Health & Wellness Clinic?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Qualified Medical Staff</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our nurses are highly trained professionals dedicated to providing excellent care.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Compassionate Approach</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We treat every patient with empathy, respect, and culturally-sensitive care.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Fast Response Times</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Immediate attention for urgent needs and quick appointments for routine care.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Community-Centered</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Part of the ASYV family, supporting the mission of healing and growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-primary/5 flex items-center justify-center">
                <img
                  src={guidance}
                  alt="Healthcare professional at ASYV"
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Trusted by Our Community</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from students and staff about their experience at the clinic
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed italic">
                  "The nurses at the clinic are so caring and professional. They made me feel safe and took great care
                  of me when I was sick."
                </p>
                <div>
                  <p className="font-semibold">Marie K.</p>
                  <p className="text-sm text-muted-foreground">ASYV Student</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed italic">
                  "Having quality healthcare on campus gives me peace of mind. The clinic staff responds quickly and
                  with genuine compassion."
                </p>
                <div>
                  <p className="font-semibold">Jean Paul M.</p>
                  <p className="text-sm text-muted-foreground">ASYV Staff Member</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed italic">
                  "The health education programs have helped me understand how to take better care of myself. Thank you
                  to the clinic team!"
                </p>
                <div>
                  <p className="font-semibold">Grace N.</p>
                  <p className="text-sm text-muted-foreground">ASYV Student</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="px-4 py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Health Support for the ASYV Community</h2>
          <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
            Whether you need immediate care, a routine check-up, or health advice, our team is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setShowLogin(true)}
            >
              Contact the Clinic
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setShowSignup(true)}
            >
              Visit Us Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">ASYV Health & Wellness Clinic</h3>
              <p className="text-muted-foreground leading-relaxed">
                Providing compassionate healthcare to the ASYV community in Rwamagana, Rwanda.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Operating Hours
              </h4>
              <div className="text-muted-foreground space-y-1">
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Emergency care available 24/7</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location & Contact
              </h4>
              <div className="text-muted-foreground space-y-1">
                <p>Agahozo-Shalom Youth Village</p>
                <p>Rwamagana, Rwanda</p>
                <p className="pt-2">
                  <RouterLink to="/" className="text-primary hover:underline">
                    Get Directions
                  </RouterLink>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 ASYV Health & Wellness Clinic. All rights reserved.</p>
            <div className="flex gap-6">
              <RouterLink to="/" className="hover:text-foreground transition-colors">
                Privacy Policy
              </RouterLink>
              <RouterLink to="/" className="hover:text-foreground transition-colors">
                Support Resources
              </RouterLink>
            </div>
          </div>
        </div>
      </footer>

      {/* Signup Dialog */}
      <Dialog open={showSignup} onOpenChange={setShowSignup}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSignup}>
            <DialogHeader>
              <DialogTitle>Create an account</DialogTitle>
              <DialogDescription>Start using the clinic platform.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="signup-role">Role</Label>
                <select
                  id="signup-role"
                  name="role"
                  className="bg-background border border-input rounded px-3 py-2"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowSignup(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleLogin}>
            <DialogHeader>
              <DialogTitle>Welcome Back</DialogTitle>
              <DialogDescription>Log in to continue.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowLogin(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LandingPage
