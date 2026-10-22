import type { IconType } from "react-icons";
import { SiGithub, SiTelegram, SiDiscord, SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export type SocialLink = {
  name: string;
  icon: IconType;
  url: string;
  color: string;
  /** Short label shown under the name in the footer. */
  handle: string;
};

export const email = "rothanaemily@gmail.com";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: SiGithub,
    url: "https://github.com/dainroth",
    color: "#fff",
    handle: "@dainroth",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/monirothna-sakhan-318b922a0",
    color: "#0077B5",
    handle: "Monirothna Sakhan",
  },
  {
    name: "Discord",
    icon: SiDiscord,
    url: "https://discordapp.com/users/922518151374200843",
    color: "#5865F2",
    handle: "Send a message",
  },
  {
    name: "Telegram",
    icon: SiTelegram,
    url: "https://t.me/dainroth",
    color: "#229ED9",
    handle: "@dainroth",
  },
  {
    name: "Gmail",
    icon: SiGmail,
    url: `mailto:${email}`,
    color: "#EA4335",
    handle: email,
  },
];
