FILE_PATH = '/Users/nobang/.gemini/antigravity/scratch/cookierun-game/src/data/cookies.ts'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
current_id = None

for line in lines:
    if "id: '" in line:
        current_id = line.split("id: '")[1].split("'")[0]
        new_lines.append(line)
    elif "imageUrl: '" in line and current_id:
        indent = line[:line.find("imageUrl:")]
        new_lines.append(f"{indent}imageUrl: '/images/cookies/{current_id}.png',\n")
    else:
        new_lines.append(line)

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fix completed! All cookie image paths updated to local /images/cookies/<id>.png")
