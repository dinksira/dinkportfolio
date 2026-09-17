import {
  BehanceIcon,
  DribbbleIcon,
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
} from '@/components/sections/ToolIcons';

const socials = [
  { name: 'Behance', href: 'https://www.behance.net/dinksiraelsa', Icon: BehanceIcon },
  { name: 'Dribbble', href: 'https://dribbble.com/dinksira-elsa', Icon: DribbbleIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dinksira-elsa-13904b319/', Icon: LinkedInIcon },
  { name: 'GitHub', href: 'https://github.com/dinksira', Icon: GitHubIcon },
  { name: 'Telegram', href: 'https://t.me/Dink_Sira', Icon: TelegramIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold tracking-tight">
            Dinksira Elsa<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-soft">Full Stack Developer &amp; UI/UX Designer</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-8">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="text-soft transition-colors hover:text-accent"
              >
                <social.Icon className="h-6 w-6" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-soft">© {year} Dinksira Elsa. All rights reserved.</p>
      </div>
    </footer>
  );
}