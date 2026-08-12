import os
import re
import urllib.request
import urllib.parse

OUTPUT_DIR = os.path.abspath('/Users/nobang/.gemini/antigravity/scratch/cookierun-game/public/images/cookies')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Cookie ID to Namuwiki Page Name
COOKIES_NAMUWIKI = {
    'pure_vanilla': '퓨어바닐라 쿠키',
    'dark_cacao': '다크카카오 쿠키',
    'hollyberry': '홀리베리 쿠키',
    'gold_cheese': '골드치즈 쿠키',
    'white_lily': '세인트릴리 쿠키',
    'sea_fairy': '바다요정 쿠키',
    'moonlight': '달빛술사 쿠키',
    'frost_queen': '서리여왕 쿠키',
    'shadow_milk': '섀도우밀크 쿠키',
    'espresso': '에스프레소맛 쿠키',
    'vampire': '뱀파이어맛 쿠키',
    'gingerbrave': '용감한 쿠키',
    'strawberry': '딸기맛 쿠키'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

downloaded = []

for cookie_id, name_ko in COOKIES_NAMUWIKI.items():
    page_url = f"https://namu.wiki/w/{urllib.parse.quote(name_ko)}"
    try:
        req = urllib.request.Request(page_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
            
            # Find i.namu.wiki image links ending with .webp, .png, or .jpg
            img_matches = re.findall(r'//i\.namu\.wiki/i/([a-zA-Z0-9_.-]+(?:\.png|\.webp|\.jpg|\.jpeg)?)', html)
            
            if img_matches:
                # Take the first main infobox image
                img_url = f"https://i.namu.wiki/i/{img_matches[0]}"
                dest_path = os.path.join(OUTPUT_DIR, f"{cookie_id}.png")
                
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req) as img_resp, open(dest_path, 'wb') as out_f:
                    out_f.write(img_resp.read())
                
                file_size = os.path.getsize(dest_path)
                print(f"✅ Success: Downloaded {cookie_id}.png for {name_ko} ({file_size} bytes)")
                downloaded.append(cookie_id)
            else:
                print(f"⚠️ No image found on Namuwiki for {name_ko}")
    except Exception as e:
        print(f"❌ Error fetching Namuwiki for {name_ko}: {e}")

print(f"\nSuccessfully downloaded {len(downloaded)} / {len(COOKIES_NAMUWIKI)} images from Namuwiki!")
