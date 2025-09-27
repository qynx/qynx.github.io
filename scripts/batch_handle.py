import re

from loop_file import MdFileHandler, loop_src
from markdown_it import MarkdownIt

def replace_cdn():
    
    class ReplaceCdnHandler(MdFileHandler):
        
                 
        def handle(self, file_path: str):
            if file_path.endswith('.md'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                pa = r'!\[(.*?)\]\((.*?)(\s+["\'](.*?)["\'])?\)'  
                do_replace = []
                def replace(match):
                    alt, url, title = match.group(1), match.group(2), match.group(3)
                    new_url = url
                    if url.startswith("http://cdnblog.laikecc.xyz/"):
                        new_url  = url.replace("http://cdnblog.laikecc.xyz/", "http://cdnblog.laikesxw.top/")
                        do_replace.append(f'{url} -> {new_url}')
                    return f'![{alt or ""}]({new_url}{title or ""})'
                new_content = re.sub(pa, replace, content, flags=re.S)
                if len(do_replace) > 0:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                return

    loop_src(ReplaceCdnHandler())
    
if __name__ == "__main__":
    replace_cdn()