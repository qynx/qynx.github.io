import os.path
import yaml

from base import posts_dir
from base import parse_formatter
from base import src_dir
from base import replace_formatter


def load_all_author():
    rel_path = "posts/诗人"
    dir_name = os.path.join(src_dir, rel_path)
    files = os.listdir(dir_name)
    maps = {}
    for item in files:
        if item.endswith(".md"):
            name = item.split(".md")[0]
            url = "/" + rel_path + "/" + name
            maps[name] = {"url": url}
    return maps


author_path_map = load_all_author()


def do_replace(file_path):
    with open(file_path, 'r') as f:
        st = f.read()
        mat = parse_formatter(st)
        if not mat:
            return

    r = yaml.safe_load(mat)
    if not r.get("author"):
        return
    author = r['author']
    if type(author) is not str:
        return

    info = author_path_map.get(author)
    if not info:
        return

    r["author"] = {
        "name": author,
        "url": info["url"],
    }
    new_str = yaml.safe_dump(r, indent=2, allow_unicode=True, sort_keys=False)

    file_str = replace_formatter(st, new_str)
    with open(file_path, 'w') as f:
        f.write(file_str)

if __name__ == "__main__":
    file = os.path.join(posts_dir, "诗词/清/浣溪沙-残雪凝辉冷画屏.md")
    do_replace(file)
