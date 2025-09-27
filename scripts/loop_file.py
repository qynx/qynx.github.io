import os 

def find_src_path() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src'))


class FileBaseHandler():
    
    def handle(self, file_path: str):
        pass    
    
class MdFileHandler(FileBaseHandler):
    
    fn = None
    
    def __init__(self):
        pass 
    
    def handle(self, file_path: str):
        if file_path.endswith('.md'):
            print(file_path)


def do_loop(folder, handler: FileBaseHandler):
    for root, dirs, files in os.walk(folder):
        for file in files:
            file_path = os.path.join(root, file)
            handler.handle(file_path)

def loop_src(handler: FileBaseHandler):
    src_path = find_src_path()
    do_loop(src_path, handler)
    
    
if __name__ == "__main__":
    loop_src(MdFileHandler())