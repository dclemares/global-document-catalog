"""Build the standalone catalog using only the Python standard library."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'

def build():
    countries = json.loads((DOCS / 'paises.json').read_text())
    stats = json.loads((DOCS / 'RESUMEN.json').read_text())
    template = (ROOT / 'src/catalog.html').read_text()
    html = template.replace('__DATA__', json.dumps(countries, ensure_ascii=False).replace('</', '<\\/'))
    html = html.replace('__STATS__', json.dumps(stats, ensure_ascii=False))
    assert '__DATA__' not in html and '__STATS__' not in html
    for name in ('index.html', 'ABRIR_CATALOGO.html'):
        (DOCS / name).write_text(html)
    print(f'Built catalog: {len(countries)} countries')

if __name__ == '__main__':
    build()
