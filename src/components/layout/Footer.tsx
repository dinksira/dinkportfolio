import { ArrowUpRight } from 'lucide-react';

const socials = [
  { name: 'Behance', href: 'https://www.behance.net/dinksiraelsa' },
  { name: 'Dribbble', href: 'https://dribbble.com/dinksira-elsa' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dinksira-elsa-13904b319/' },
  { name: 'GitHub', href: 'https://github.com/dinksira' },
  { name: 'Telegram', href: 'https://t.me/Dink_Sira' },
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
          <p className="mt-1 text-sm text-soft">UI/UX Designer &amp; Frontend Developer</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-soft transition-colors hover:text-ink"
              >
                {social.name}
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-soft">© {year} Dinksira Elsa. All rights reserved.</p>
      </div>
    </footer>
  );
}