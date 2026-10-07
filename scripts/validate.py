"""Check country coverage, assets, provenance hashes and standalone build."""
import hashlib
import json
from pathlib import Path
from build import build, DOCS

build()
load = lambda name: json.loads((DOCS / name).read_text())
countries = load('paises.json')
manifest = load('manifest.json')
stats = load('RESUMEN.json')
assert len(countries) == stats['countries'] == 196
assert len({c['code'] for c in countries}) == len(countries)
assignments = []
for country in countries:
    assert len(country['pieces']) == 3
    for piece in country['pieces'] + country['extras']:
        image = piece.get('image')
        if image:
            for key in ('file', 'reference_preview'):
                if image.get(key):
                    assert (DOCS / image[key]).is_file(), image[key]
        example = piece.get('global_example')
        if example:
            assert (DOCS / example['file']).is_file(), example['file']
            assignments.append(example)
            if piece['kind'] == 'ID' and piece['side'] == 'reverso':
                mrz = image['mrz'] == 'yes' if image else piece['document_features']['sides']['reverso']['mrz']
                assert mrz is True, country['code']
assert len(assignments) == stats['global_examples']['assignments']
for image in manifest:
    path = DOCS / image['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == image['sha256'], path
batch_dir = DOCS / 'incorporaciones/2026-10-07'
batch = json.loads((batch_dir / 'manifest.json').read_text())
originals = json.loads((batch_dir / 'originales.json').read_text())
assert len(batch) == len(originals) == 39
assert len({row['key'] for row in batch}) == 39
for row in batch:
    assert (batch_dir / row['reference']).is_file()
    assert hashlib.sha256((batch_dir / row['file']).read_bytes()).hexdigest() == row['sha256']
    placements = [p for c in countries for p in c['pieces'] + c['extras']
                  if (p.get('image') or {}).get('id') == 'OCT07-' + row['key']]
    assert len(placements) == 1, row['key']
for row in originals:
    assert hashlib.sha256((DOCS / row['file']).read_bytes()).hexdigest() == row['sha256']
assert stats['images'] == len(manifest)
assert stats['countries_with_images'] == sum(c['image_count'] > 0 for c in countries)
for path in DOCS.rglob('*'):
    if path.suffix in ('.html', '.json', '.txt'):
        text = path.read_text()
        assert '/Users/' not in text and '/var/folders/' not in text, path
assert (DOCS / 'index.html').read_bytes() == (DOCS / 'ABRIR_CATALOGO.html').read_bytes()
print(f'Validated {len(manifest)} images and {len(assignments)} global examples')
