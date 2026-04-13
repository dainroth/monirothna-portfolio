"use client";
import { motion } from "framer-motion";
import { SiGithub, SiTelegram, SiDiscord, SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import React from "react";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [localTime, setLocalTime] = React.useState<string>("");

  React.useEffect(() => {
    const update = () => {
      setLocalTime(
        new Date().toLocaleTimeString("en-KH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: <SiGithub />,
      url: "https://github.com/dainroth",
      color: "#fff",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/in/monirothna-sakhan-318b922a0",
      color: "#0077B5",
    },
    {
      name: "Discord",
      icon: <SiDiscord />,
      url: "https://discordapp.com/users/922518151374200843",
      color: "#5865F2",
    },
    {
      name: "Telegram",
      icon: <SiTelegram />,
      url: "https://t.me/dainroth",
      color: "#229ED9",
    },
    {
      name: "Gmail",
      icon: <SiGmail />,
      url: "mailto:rothanaemily@gmail.com",
      color: "#EA4335",
    },
  ];

  return (
    <footer className="bg-[#1a2b56] text-[#F7F5F0] pt-20 pb-12 px-4 sm:px-6 lg:px-8 rounded-t-[2.5rem] mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Left: Heading & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-tight">
              If it doesn&apos;t
              <span className="italic font-serif block">spark joy</span>
              I&apos;m not done.
            </h2>
            <p className="text-[#F7F5F0]/70 text-sm sm:text-base leading-relaxed font-comic-relief max-w-sm">
              Somewhere between pages or stuck in code, I’m always learning, I
              enjoy good conversations, quiet moments with music, and the kind
              of talks that linger. Maybe we’ll share one over coffee someday
            </p>
          </motion.div>

          {/* Right: Social Links in Two Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="font-comic-relief text-xs sm:text-sm tracking-widest uppercase opacity-50 font-medium">
                Connect
              </p>
              <ul className="space-y-4">
                {socialLinks.slice(0, 3).map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm sm:text-base font-medium hover:text-[#C4763A] font-comic-relief transition-colors duration-300 group"
                      >
                        <span className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                          {/* <Icon size={20} strokeWidth={1.5} /> */}
                          {link.icon}
                        </span>
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Direct Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="font-comic-relief text-xs sm:text-sm tracking-widest uppercase opacity-50 font-medium">
                Direct
              </p>
              <ul className="space-y-4">
                {socialLinks.slice(3).map((link, i) => {
                  // const Icon = link.icon;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm sm:text-base font-medium hover:text-[#C4763A] font-comic-relief transition-colors duration-300 group"
                      >
                        <span className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                          {link.icon}
                          {/* <Icon size={20} strokeWidth={1.5} /> */}
                        </span>
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center sm:items-start gap-1 order-2 sm:order-1"
          >
            <p className="font-mono tracking-widest uppercase opacity-50">
              Phnom Penh, Cambodia
            </p>
            <p className="opacity-40 text-[11px]">
              Local Time: {localTime && `${localTime} ICT`}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="font-mono tracking-widest uppercase opacity-50 order-3 sm:order-2"
          >
            © {currentYear} Sakhan Monirothna
          </motion.p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-mono text-[11px] tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 order-1 sm:order-3"
          >
            Back to Top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
