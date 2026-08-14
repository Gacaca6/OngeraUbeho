#!/usr/bin/env python3
"""
Switch the whole site to a new domain in one command.

    python scripts/set-domain.py ongeraubeho.org

Rewrites every place the site's address is baked in:
canonical tags, og:url / og:image, all JSON-LD (@id, url, logo, image,
breadcrumb items), sitemap.xml, robots.txt and the form redirect
fallbacks. Prints a summary and verifies nothing was missed.
"""
import re
import sys
import os
from datetime import date

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(REPO, 'website')
OLD_DEFAULT = 'https://ongera-ubeho.vercel.app'


def main():
    if len(sys.argv) < 2:
        sys.exit('usage: python scripts/set-domain.py <new-domain>\n'
                 '   e.g. python scripts/set-domain.py ongeraubeho.org')

    raw = sys.argv[1].strip().rstrip('/')
    raw = re.sub(r'^https?://', '', raw)
    new_base = 'https://' + raw
    old_base = sys.argv[2].rstrip('/') if len(sys.argv) > 2 else OLD_DEFAULT

    if new_base == old_base:
        sys.exit(f'Nothing to do — site is already on {new_base}')

    print(f'  {old_base}  ->  {new_base}\n')

    changed = 0
    for root, _dirs, files in os.walk(WEB):
        for fn in files:
            if not fn.endswith(('.html', '.xml', '.txt', '.webmanifest')):
                continue
            path = os.path.join(root, fn)
            src = open(path, encoding='utf-8').read()
            if old_base not in src:
                continue
            hits = src.count(old_base)
            open(path, 'w', encoding='utf-8').write(src.replace(old_base, new_base))
            rel = os.path.relpath(path, REPO)
            print(f'  {rel:42s} {hits:3d} replaced')
            changed += hits

    # refresh sitemap lastmod — the content genuinely changed today
    sm_path = os.path.join(WEB, 'sitemap.xml')
    if os.path.exists(sm_path):
        sm = open(sm_path, encoding='utf-8').read()
        sm = re.sub(r'<lastmod>[^<]+</lastmod>',
                    f'<lastmod>{date.today().isoformat()}</lastmod>', sm)
        open(sm_path, 'w', encoding='utf-8').write(sm)
        print(f'\n  sitemap lastmod -> {date.today().isoformat()}')

    # verify nothing was left behind
    leftovers = []
    for root, _dirs, files in os.walk(WEB):
        for fn in files:
            if fn.endswith(('.html', '.xml', '.txt', '.webmanifest')):
                p = os.path.join(root, fn)
                if old_base in open(p, encoding='utf-8').read():
                    leftovers.append(os.path.relpath(p, REPO))

    print(f'\n  {changed} references updated')
    if leftovers:
        print('  !! still referencing the old domain:', leftovers)
        sys.exit(1)
    print('  verified: no references to the old domain remain\n')
    print('  Next:')
    print('    1. git add -A && git commit -m "Switch to ' + raw + '" && git push')
    print('    2. Add the domain in Vercel -> Settings -> Domains')
    print('    3. In Google Search Console, add ' + new_base + ' as a new')
    print('       property and submit ' + new_base + '/sitemap.xml')


if __name__ == '__main__':
    main()
