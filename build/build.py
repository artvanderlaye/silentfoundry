#!/usr/bin/env python3
"""Rebuild index.html from its baseline plus the payloads in build/payloads/.

    python3 build/build.py            rebuild
    python3 build/build.py --check    verify only, write nothing

HOW THE PAGE IS PUT TOGETHER

    index.html  =  BASELINE  +  <script id="sf-mobimg">      Marshall case study
                             +  <script id="sf-ddna-width">  DESIGNED DNA

The BASELINE is everything in index.html before the first payload marker. It is
not stored separately — it is read back out of index.html each time, so there is
no second copy to drift out of step. Editing the baseline (the hero, What We Do,
The Foundry, Venture Models, the footer — all the ordinary page copy) is just
editing index.html above that marker, and a rebuild preserves it byte for byte.

The two payloads are JavaScript that restyles and rewrites parts of the page
after it loads. They own the Marshall case study and the DESIGNED DNA block.
Anything they touch has to be changed in build/payloads/, not in index.html —
a rebuild replaces those two script blocks wholesale.

The script refuses to write if the baseline it read back differs by a single
byte from what it wrote, so a bad run cannot quietly mangle the page.
"""
import hashlib
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
PAGE = ROOT / 'index.html'
MIRROR = ROOT / 'index-mobimg.html'          # kept byte-identical to index.html
PAYLOADS = [
    ('sf-mobimg',         HERE / 'payloads' / '210-mobimg.js'),
    ('sf-ddna-width',     HERE / 'payloads' / '230-ddna.js'),
    ('sf-marshall-order', HERE / 'payloads' / '250-marshall.js'),
    ('sf-page-order',     HERE / 'payloads' / '260-order.js'),
]

FIRST = PAYLOADS[0][0]
MARK = re.compile((r'\n?<script id="%s">' % FIRST).encode('utf-8'))


def baseline(html: bytes) -> bytes:
    m = MARK.search(html)
    if not m:
        sys.exit('no <script id="%s"> marker in index.html — is this the built '
                 'page?' % FIRST)
    return html[:m.start()]


def main():
    check = '--check' in sys.argv
    if not PAGE.exists():
        sys.exit('index.html not found next to build/ — run this from the repo')

    html = PAGE.read_bytes()
    base = baseline(html)

    out = bytearray(base)
    for i, (ident, path) in enumerate(PAYLOADS):
        if not path.exists():
            sys.exit('missing payload: %s' % path)
        js = path.read_text(encoding='utf-8')
        # A line break straight after `return` gets a semicolon inserted by the
        # parser and silently ends the function early. Cheap to check, painful
        # to debug.
        if re.findall(r'return[ \t]*\n', js):
            sys.exit('%s: a bare `return` at the end of a line' % path.name)
        # one newline between the baseline and the first block, and none
        # between blocks — each block already ends with its own. Getting this
        # wrong changes the file by a single byte, which is enough to make
        # "did anything change?" useless as a check.
        if i == 0 and not out.endswith(b'\n'):
            out += b'\n'
        out += b'<script id="' + ident.encode() + b'">\n'
        out += js.encode('utf-8')
        out += b'\n</script>\n'
    out = bytes(out)

    if baseline(out) != base:
        sys.exit('refusing to write: the rebuilt baseline is not identical')

    print('baseline        %d bytes  md5 %s' % (len(base), hashlib.md5(base).hexdigest()))
    for ident, path in PAYLOADS:
        print('payload         %-14s %d bytes' % (ident, path.stat().st_size))
    print('index.html      %d bytes  (was %d)' % (len(out), len(html)))
    print('baseline kept   True')

    if check:
        print('\n--check: nothing written. %s'
              % ('identical to what is on disk' if out == html else 'WOULD CHANGE index.html'))
        return
    if out == html:
        print('\nno change — index.html already matches the payloads')
        return
    PAGE.write_bytes(out)
    MIRROR.write_bytes(out)
    print('\nwrote index.html and index-mobimg.html')


if __name__ == '__main__':
    main()
