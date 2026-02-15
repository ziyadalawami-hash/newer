import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface ContactProps {
  translations: any;
  isRTL: boolean;
}

const Contact = ({ translations, isRTL }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);

      const response = await fetch('https://formsubmit.co/ziyad.ahmedalawami@gmail.com', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const clearField = (fieldName: 'name' | 'email' | 'message') => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const t = translations;

  return (
    <section id="contact" className="py-12 bg-[#001a03]" style={{ direction: isRTL ? 'rtl' : 'ltr' }} aria-labelledby="contact-heading">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-[#000a01]/50 border-2 border-[#1c6000]/30 rounded-xl p-6">
          <h2 id="contact-heading" className="text-2xl font-bold text-white mb-2">
            {t.getInTouch}
          </h2>
          <p className="text-white/60 text-sm mb-6">
            {t.getInTouchDesc}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="name" className="sr-only">{t.yourName}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={`w-full px-3 py-2 ${isRTL ? 'pl-9' : 'pr-9'} bg-[#001a03]/60 border border-[#1c6000]/40 rounded text-white text-sm placeholder-white/40 outline-none focus:outline-none focus:ring-0 focus:border-[#27a102]/70 transition-all duration-300`}
                  placeholder={t.yourName}
                  disabled={status === 'sending'}
                />
                {formData.name && (
                  <button
                    type="button"
                    onClick={() => clearField('name')}
                    className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors p-0 bg-transparent border-0`}
                    aria-label="Clear name field"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="relative">
                <label htmlFor="email" className="sr-only">{t.yourEmail}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={`w-full px-3 py-2 ${isRTL ? 'pl-9' : 'pr-9'} bg-[#001a03]/60 border border-[#1c6000]/40 rounded text-white text-sm placeholder-white/40 outline-none focus:outline-none focus:ring-0 focus:border-[#27a102]/70 transition-all duration-300`}
                  placeholder={t.yourEmail}
                  disabled={status === 'sending'}
                />
                {formData.email && (
                  <button
                    type="button"
                    onClick={() => clearField('email')}
                    className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors p-0 bg-transparent border-0`}
                    aria-label="Clear email field"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="message" className="sr-only">{t.yourMessage}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                rows={4}
                className={`w-full px-3 py-2 ${isRTL ? 'pl-9' : 'pr-9'} bg-[#001a03]/60 border border-[#1c6000]/40 rounded text-white text-sm placeholder-white/40 outline-none focus:outline-none focus:ring-0 focus:border-[#27a102]/70 transition-all duration-300 resize-none`}
                placeholder={t.yourMessage}
                disabled={status === 'sending'}
              />
              {formData.message && (
                <button
                  type="button"
                  onClick={() => clearField('message')}
                  className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-2.5 text-red-400 hover:text-red-300 transition-colors p-0 bg-transparent border-0`}
                  aria-label="Clear message field"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {status === 'success' && (
              <div className="p-3 bg-[#27a102]/20 border border-[#27a102]/50 rounded text-[#1fea00] text-sm text-center" role="status" aria-live="polite">
                {t.messageSent}
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm text-center" role="alert" aria-live="assertive">
                {t.messageError}
              </div>
            )}

            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#27a102] text-white text-sm rounded hover:bg-[#1fea00] hover:text-black transition-all duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#27a102] disabled:hover:text-white"
              >
                <Send size={16} />
                <span>{status === 'sending' ? t.sending : t.sendMessage}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
