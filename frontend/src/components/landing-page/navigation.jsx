
import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import logo from "../../../public/agahozo.png"
export function Navigation({ onLoginClick, onSignupClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
              {/* <span className="text-primary-foreground font-bold text-xl">A</span> */}
              <img src={logo} alt="logo" className="w-10 h-10" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">ASYV Health</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-sm font-medium" onClick={onLoginClick}>
              Login
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium" onClick={onSignupClick}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
