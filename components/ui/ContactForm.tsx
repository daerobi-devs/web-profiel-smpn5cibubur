'use client';

import { useState } from 'react';
import { PaperPlaneTilt, WhatsappLogo, CheckCircle } from '@phosphor-icons/react';

type ContactFormProps = {
  whatsappNumber?: string;
};

export default function ContactForm({ whatsappNumber = '6285281459726' }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Orang Tua Siswa');
  const [subject, setSubject] = useState('Informasi PPDB 2026/2027');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const waText = encodeURIComponent(
      `*Pesan Kontak Website SMPN 5 Cibeber*\n\n` +
        `*Nama:* ${name}\n` +
        `*No. Kontak:* ${phone || '-'}\n` +
        `*Status/Peran:* ${role}\n` +
        `*Subjek:* ${subject}\n\n` +
        `*Pesan:*\n${message}`
    );

    window.open(`https://wa.me/${cleanWa}?text=${waText}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
      <h3 className="font-serif-academic text-lg sm:text-xl font-bold text-slate-900 mb-1">
        Kirim Pesan ke Tata Usaha Sekolah
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
        Silakan isi formulir di bawah ini untuk terhubung langsung dengan staf tata usaha atau panitia PPDB melalui WhatsApp resmi sekolah.
      </p>

      {submitted ? (
        <div className="p-6 rounded-xl bg-[#eaf4ed] border border-[#1E5631]/20 text-center space-y-3">
          <CheckCircle size={40} weight="fill" className="text-[#1E5631] mx-auto" />
          <h4 className="text-base font-bold text-[#1E5631]">
            Pesan Siap Dikirim
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
            Halaman WhatsApp telah dibuka untuk meneruskan pesan Anda. Staf kami akan merespons pada jam kerja pelayanan.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="btn btn-secondary btn-sm mt-2"
          >
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="label label-required">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="label">Nomor WhatsApp / HP</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="label">Status Anda</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input"
              >
                <option value="Orang Tua Siswa">Orang Tua / Wali Siswa</option>
                <option value="Calon Siswa Baru">Calon Siswa Baru</option>
                <option value="Alumni">Alumni</option>
                <option value="Masyarakat Umum">Masyarakat Umum / Instansi</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label">Keperluan Informasi</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input"
              >
                <option value="Informasi PPDB 2026/2027">Informasi PPDB 2026/2027</option>
                <option value="Legalisir & Berkas Ijazah">Legalisir &amp; Berkas Ijazah</option>
                <option value="Mutasi / Pindah Masuk">Mutasi / Pindah Masuk</option>
                <option value="Pengaduan & Saran">Pengaduan &amp; Saran</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="label label-required">Pesan / Pertanyaan</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan pertanyaan atau rincian keperluan Anda..."
              className="input resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-[#1E5631] hover:bg-[#164325] text-white transition-colors cursor-pointer"
          >
            <WhatsappLogo size={18} weight="fill" className="text-white" />
            <span>Kirim Pesan via WhatsApp Resmi</span>
            <PaperPlaneTilt size={15} weight="bold" />
          </button>
        </form>
      )}
    </div>
  );
}
