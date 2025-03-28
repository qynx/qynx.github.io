import os.path
import re

scripts_dir = os.path.dirname(__file__)
src_dir = os.path.dirname(scripts_dir)
posts_dir = os.path.join(src_dir, "posts")

def replace_formatter(text:str, new_str):
    def rp_func(match):
        return "---\n%s---" % new_str

    return re.sub("^---(.*?)---", rp_func, text, 1, re.M | re.S)

def parse_formatter(text: str):
    mat = re.match("^---(.*?)---", text, re.M | re.S)
    if not mat:
        return None
    return mat.group(1)


if __name__ == "__main__":
    print(posts_dir)
