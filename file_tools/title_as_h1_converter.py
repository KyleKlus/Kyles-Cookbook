import os
import frontmatter

src_dir = 'recipes/'
dst_dir = 'recipes/'
entries = os.listdir(src_dir)

for file in entries:
    print('[INFO] Working on: ' + file)
    post = frontmatter.load(src_dir + file)
    title = post['title']

    with open(src_dir + file, 'r') as f:
        data = f.read()
        data = data.replace('## Zutaten', '# ' + title + '\n\n## Zutaten')

    with open(dst_dir + file, 'w') as f:
        f.write(data)
