"use client";
import React, { FormEvent, MouseEventHandler, useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-client";
import { PrimaryTextIconInput } from "@/components/ui/inputs/primary-input";
import { PrimaryButton } from "@/components/ui/buttons/primary-btn";
import { useNotify } from "@/components/ui/use-notify";
import { useRouter } from "next/navigation";

export default function AuthPages() {
  const notify = useNotify();
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      notify({
        type: "success",
        title: "Login successful!",
      });
      router.push("/user");
    } catch (err: any) {
      console.error("Auth error:", err.message);
      notify({
        type: "error",
        title: err.message || "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <PrimaryButton isLoading={isLoading} handleSubmit={handleSubmit}>
        Sign In
        <ArrowRight className="w-5 h-5" />
      </PrimaryButton>
    </div>
  );
}
