"""Arma las páginas: une _partials/header.html + _pages/<página>.html + _partials/footer.html.
Uso: python3 build.py
"""
import pathlib, re

root = pathlib.Path(__file__).parent
header = (root / "_partials/header.html").read_text(encoding="utf-8")
footer = (root / "_partials/footer.html").read_text(encoding="utf-8")

for page in sorted((root / "_pages").glob("*.html")):
    body = page.read_text(encoding="utf-8")
    title = re.search(r"<!--TITLE: (.*?)-->", body).group(1)
    desc = re.search(r"<!--DESC: (.*?)-->", body).group(1)
    body = re.sub(r"<!--(TITLE|DESC): .*?-->\n?", "", body)
    html = (header.replace("{{TITLE}}", title).replace("{{DESC}}", desc)
            .replace("{{PAGE}}", page.stem)) + body + footer
    (root / page.name).write_text(html, encoding="utf-8")
    print("ok", page.name)
