// Mobile navigation. Content and project descriptions are editable in index.html.
const header = document.querySelector('header');
const toggle = header?.querySelector('button[aria-label="Toggle menu"]');
const desktopNav = header?.querySelector('nav');

if (header && toggle && desktopNav) {
  const menu = document.createElement('nav');
  menu.id = 'mobile-navigation';
  menu.className = 'flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden';
  menu.setAttribute('aria-label', 'Mobile navigation');
  menu.hidden = true;
  toggle.setAttribute('aria-controls', menu.id);
  desktopNav.querySelectorAll('a').forEach(link => {
    const item = link.cloneNode(true);
    item.className = 'rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground';
    menu.appendChild(item);
  });
  const github = header.querySelector('a[target="_blank"]');
  if (github) {
    const item = github.cloneNode(true);
    item.className = 'rounded-lg px-3 py-2 text-accent';
    item.textContent = 'GitHub ↗';
    menu.appendChild(item);
  }
  header.appendChild(menu);
  const bars = toggle.querySelectorAll('span');
  function setOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    bars[0]?.classList.toggle('translate-y-2', open);
    bars[0]?.classList.toggle('rotate-45', open);
    bars[1]?.classList.toggle('opacity-0', open);
    bars[2]?.classList.toggle('-translate-y-2', open);
    bars[2]?.classList.toggle('-rotate-45', open);
  }
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', event => {
    if (event.matches) setOpen(false);
  });
}
const copyright = document.querySelector('footer p:last-child');
if (copyright) copyright.textContent = `© ${new Date().getFullYear()} Tanvi. All rights reserved.`;
