"use client";
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-client";
import { PrimaryTextIconInput } from "@/components/ui/inputs/primary-input";
import { PrimaryButton } from "@/components/ui/buttons/primary-btn";
import { useNotify } from "@/components/ui/use-notify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const notify = useNotify();
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      if (error) {
        throw error;
      }
      router.push("/");
      notify({
        type: "success",
        title: "Signup successful! Please check your email to verify.",
      });
    } catch (err: any) {
      console.log("Auth error:", err.message);
      notify({
        type: "error",
        title: err.message || "An error occurred during signup.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <PrimaryTextIconInput
        label="Full Name"
        Icon={User}
        name="name"
        type="text"
        value={formData.name}
        setValue={(v: string) => {
          setFormData({ ...formData, ["name"]: v });
        }}
        placeHolder="Enter your full name"
        isRequired={true}
      />

      <PrimaryTextIconInput
        label="Email Address"
        Icon={Mail}
        name="email"
        type="email"
        value={formData.email}
        setValue={(v: string) => {
          setFormData({ ...formData, ["email"]: v });
        }}
        placeHolder="Enter your email"
        isRequired={true}
      />
      <PrimaryTextIconInput
        label="Password"
        Icon={Lock}
        name="pasword"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        setValue={(v: string) => {
          setFormData({ ...formData, password: v });
        }}
        placeHolder="Enter your password"
        isRequired={true}
        isPassword={true}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PrimaryTextIconInput
        label="Confirm Password"
        Icon={Lock}
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        setValue={(v: string) => {
          setFormData({ ...formData, confirmPassword: v });
        }}
        placeHolder="Confirm your password"
        isRequired={true}
        isPassword={true}
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />

      <PrimaryButton handleSubmit={handleSubmit} isLoading={isLoading}>
        Sign Up
        <ArrowRight className="w-5 h-5" />
      </PrimaryButton>
    </div>
  );
}
