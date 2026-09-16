'use client';

import { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import Reveal from '@/components/ui/Reveal';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'dinksiraelisa@gmail.com',
    href: 'mailto:dinksiraelisa@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '0949 765 679',
    href: 'tel:0949765679',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Addis Ababa, Ethiopia',
    href: undefined,
  },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: formData.name,
            reply_to: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          { publicKey: PUBLIC_KEY }
        );
      } else {
        window.location.href = `mailto:dinksiraelisa@gmail.com?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(
          `${formData.message}\n\n— ${formData.name} (${formData.email})`
        )}`;
      }
      setFormData(initialForm);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full border-b border-line bg-transparent py-3 text-ink placeholder:soft transition-colors focus:border-accent focus:outline-none';

  return (
    <section id="contact" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">05 — Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Let&apos;s work together
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="space-y-8">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 py-3">
                    <Icon size={18} className="text-soft" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-soft">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-medium text-ink">{item.value}</p>
                    </div>
                    {item.href && (
                      <ArrowUpRight size={16} className="ml-auto text-soft" />
                    )}
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-b border-line transition-colors hover:border-ink/60"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="border-b border-line">
                    {content}
                  </div>
                );
              })}

              <div className="flex items-center gap-4 rounded-xl border border-line p-4">
                <Image
                  src="/assets/qr.jpg"
                  alt="WhatsApp QR code"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium">Or chat on WhatsApp</p>
                  <p className="mt-1 text-sm text-soft">
                    Scan the QR code to message me directly.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-soft"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-soft"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-soft"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-soft"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                {status === 'sent' && (
                  <p className="mt-4 text-sm text-accent">
                    Thanks — your message has been sent. I&apos;ll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="mt-4 text-sm">
                    Something went wrong. Please email me directly at{' '}
                    <a
                      href="mailto:dinksiraelisa@gmail.com"
                      className="text-accent hover:underline"
                    >
                      dinksiraelisa@gmail.com
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}