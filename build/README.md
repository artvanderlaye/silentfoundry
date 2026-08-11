# build/ — how index.html is put together

```
index.html  =  BASELINE  +  <script id="sf-mobimg">      Marshall case study
                         +  <script id="sf-ddna-width">  DESIGNED DNA
```

The **baseline** is everything in `index.html` above the first `<script id="sf-mobimg">`
line. It holds all the ordinary page copy — the hero, What We Do, The Foundry,
Venture Models, the footer. It is not kept as a separate file: the build reads it
back out of `index.html` every time, so there is no second copy to drift.

The **payloads** are JavaScript that rewrites and restyles parts of the page after
it loads. They own the Marshall case study and the DESIGNED DNA block, and
nothing else on the page.

## Making a change

**Ordinary copy — hero, What We Do, The Foundry, Venture Models, the footer.**
Edit `index.html` directly, above the first `<script id="sf-mobimg">` line.
That text is the baseline and a rebuild preserves it byte for byte. You do not
need to run the build at all for this; it is a plain HTML edit. Do run it
afterwards if you want `index-mobimg.html` kept in step.

**Marshall or DESIGNED DNA — anything inside those two blocks.**
Edit the file in `build/payloads/` and rebuild. Editing those parts inside
`index.html` is pointless twice over: the build replaces the block, and the
payload rewrites the DOM at runtime anyway.

## Running it

```
cd /Users/Home/Documents/GitHub/silentfoundry
python3 build/build.py --check     # says what would change, writes nothing
python3 build/build.py             # rebuilds index.html and index-mobimg.html
```

Then the usual:

```
rm -f .git/index.lock && git add . && git commit -m "..." && git push
```

The build refuses to write if the baseline it reproduces differs from the one it
read, so a bad run cannot quietly mangle the page. `--check` on a clean tree
prints *identical to what is on disk*.

`index-mobimg.html` is a byte-identical mirror of `index.html`, kept only
because that preview URL has been shared around. It can be deleted once nobody
is using it.

## Why it is built this way

The page came from a template and is edited by appending scripts rather than by
rewriting its markup — that way a change is one reviewable file, and the rest of
the page is provably untouched. The trade-off is that the two payloads must win
against the page's own inline styles, so they use `!important` and re-assert on
a poll. See `claude/build-notes-and-session-index.md` in the project for the
traps that cost the most time.
