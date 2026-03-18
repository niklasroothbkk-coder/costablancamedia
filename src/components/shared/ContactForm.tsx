"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
  captcha: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const captchaNumbers = useMemo(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (parseInt(data.captcha) !== captchaNumbers.answer) {
      alert("Incorrect math answer. Please try again.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          phone: data.phone,
          message: data.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register("subject")}
          placeholder="Subject"
          className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
        />
        <input
          {...register("phone")}
          placeholder="Phone"
          className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <textarea
        {...register("message", { required: "Message is required" })}
        placeholder="Message"
        rows={5}
        className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors resize-none"
      />
      {errors.message && (
        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
      )}
      <div className="flex items-center gap-4">
        <label className="text-text text-sm font-medium">
          {captchaNumbers.a} + {captchaNumbers.b} =
        </label>
        <input
          {...register("captcha", { required: "Please solve the math problem" })}
          type="number"
          className="w-20 px-4 py-3 border border-border rounded bg-white text-text-dark focus:outline-none focus:border-primary transition-colors"
        />
        {errors.captcha && (
          <p className="text-red-500 text-xs">{errors.captcha.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-green-600 text-sm font-medium">
          Message sent successfully! We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm font-medium">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
