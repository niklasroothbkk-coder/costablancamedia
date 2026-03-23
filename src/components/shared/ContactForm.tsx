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

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const cf = dict.contactForm;

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
            {cf.name} <span className="text-red-500">{cf.required}</span>
          </label>
          <input
            {...register("name", { required: cf.nameRequired })}
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            {cf.email} <span className="text-red-500">{cf.required}</span>
          </label>
          <input
            {...register("email", {
              required: cf.emailRequired,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: cf.invalidEmail,
              },
            })}
            type="email"
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
            {cf.subject} <span className="text-red-500">{cf.required}</span>
          </label>
          <input
            {...register("subject", { required: cf.subjectRequired })}
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            {cf.phone}
          </label>
          <input
            {...register("phone")}
            className="w-full px-4 py-3 border border-border rounded bg-white text-text-dark placeholder-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-dark mb-1">
          {cf.message} <span className="text-red-500">{cf.required}</span>
        </label>
        <textarea
          {...register("message", { required: cf.messageRequired })}
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
        {status === "sending" ? cf.sending : cf.sendMessage}
      </button>
      {status === "success" && (
        <p className="text-green-600 text-sm font-medium">
          {cf.successMessage}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm font-medium">
          {cf.errorMessage}
        </p>
      )}
    </form>
  );
}
