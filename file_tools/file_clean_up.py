import os
import re
import frontmatter

src_dir = 'recipes_EN/'
dst_dir = 'recipes_EN_2/'
entries = os.listdir(src_dir)


def converter(match_obj):
    if match_obj.group() is not None:
        return match_obj.group().upper()


def returner(match_obj):
    if match_obj.group() is not None:
        return match_obj.group()


for file in entries:
    post = frontmatter.load(src_dir + file, encoding='cp1252')
    title = post['title']
    title = title.replace('(', '')
    title = title.replace(')', '')
    title = title.replace(' ', '-')

    new_file_name = file[:11]
    new_file_name += title + '-ENG.md'

    print(new_file_name)

    with open(src_dir + file, 'r', encoding='cp1252') as f:
        data = f.read()
        data = re.sub(
            '(\| [a-z])+|(# [a-z])+|(^[0-9]{0,2}\. [a-z])+', converter, data)

    with open(dst_dir + new_file_name, 'w', encoding='cp1252') as f:
        f.write(data)
