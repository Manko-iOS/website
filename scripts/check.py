from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re, subprocess

root = Path(__file__).resolve().parents[1] / 'dist'
class Check(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.targets = []
        self.stack = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, 'Duplicate ID'
            self.ids.add(attrs['id'])
        if 'content-id' in attrs:
            self.targets.append(attrs['content-id'])
        for key in ('src', 'href', 'srcset'):
            value = attrs.get(key, '')
            url = urlsplit(value)
            if value and not url.scheme and not url.netloc and url.path:
                assert (root / unquote(url.path)).is_file(), value
        if tag not in ('meta', 'link', 'img', 'input', 'source', 'br'):
            self.stack.append(tag)
    def handle_endtag(self, tag):
        assert self.stack.pop() == tag, tag

check = Check()
check.feed((root / 'index.html').read_text())
assert not check.stack
assert len(check.targets) == 3 and all(target in check.ids for target in check.targets)
for path in root.rglob('*.js'):
    subprocess.run(['node', '--check', str(path)], check=True)
    for dependency in re.findall(r"[\"'](\.[^\"']+\.js)[\"']", path.read_text()):
        assert (path.parent / dependency).is_file(), dependency
json.loads((root / 'sources.json').read_text())
assert not (root / '.openai').exists()
print('PASS: HTML structure, segment associations, local assets, module graph, JS syntax and source records')
