import re

FILE_PATH = '/Users/nobang/.gemini/antigravity/scratch/cookierun-game/src/data/cookies.ts'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace imageUrl: 'https://images.unsplash.com/...' with imageUrl: '/images/cookies/<id>.png'
def replace_img(match):
    block = match.group(0)
    id_match = re.search(r"id:\s*'([^']+)'", block)
    if id_match:
        cookie_id = id_match.group(1)
        return re.sub(r"imageUrl:\s*'[^']+'", f"imageUrl: '/images/cookies/{cookie_id}.png'", block)
    return block

# Pattern matching each cookie object in RAW_COOKIES_DATA
updated_content = re.sub(r'\{\s*id:[^}]+imageUrl:[^}]+\}', replace_img, content, flags=re.DOTALL)

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Updated cookies.ts image paths to local /images/cookies/<id>.png!")
