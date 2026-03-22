"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

const EMAILJS_SERVICE_ID = "service_z8csv98";
const EMAILJS_TEMPLATE_ID = "template_lb0w37t";
const EMAILJS_PUBLIC_KEY = "NmZE_vtJoTyrDx3Tp";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          phone: data.phone,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Name <span className="text-red-500">*</span>
          </label>
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
          <label className="block text-sm font-medium text-text-dark mb-1">
            Email <span className="text-red-500">*</span>
          </label>
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
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            {...register("subject", { required: "Subject is required" })}
            placeholder="Subject"
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Phone
          </label>
          <input
            {...register("phone")}
            placeholder="Phone"
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-dark mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Message"
          rows={5}
          className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>
      {errors.message && (
        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
      )}
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
