"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, LogIn, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("adminToken")) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Cannot connect to server.");
      }
      
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-primary-dark text-white text-center py-8">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h4 className="text-2xl font-bold font-serif">Admin Panel</h4>
          <p className="text-sm text-white/60 mb-0">Department Notice Board & Events</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Admin Password
              </label>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-accent focus-within:ring-1 transition-all overflow-hidden p-1">
                <span className="p-3 text-muted-foreground">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 p-2 text-foreground"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary flex justify-center items-center text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard <LogIn size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
          <Link href="/" className="text-muted-foreground text-sm hover:text-primary-dark inline-flex items-center transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Main Website
          </Link>
        </div>

      </div>
    </div>
  );
}
