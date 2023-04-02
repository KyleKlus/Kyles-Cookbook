import os
import frontmatter
import deepl

src_dir = 'recipes/'
dst_dir = 'recipes_EN/'

auth_key = '9a21a631-24d3-7e01-9088-5c655988007e:fx'
translator = deepl.Translator(auth_key)

entries = os.listdir(src_dir)

for file in entries:
    print('[INFO] Working on: ' + file)
    post = frontmatter.load(src_dir + file, encoding='cp1252')
    title = post['title']

    with open(src_dir + file, 'r', encoding='cp1252') as f:
        data = f.read()
        data = translator.translate_text(data, target_lang="EN-US").text
        new_file_name = translator.translate_text(
            file, target_lang="EN-US").text.replace('.md', '-ENG.md')

    with open(dst_dir + file, 'w', encoding='cp1252') as f:
        f.write(data)
