import os
import urllib.request
import urllib.parse
import json

OUTPUT_DIR = os.path.abspath('/Users/nobang/.gemini/antigravity/scratch/cookierun-game/public/images/cookies')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Cookie Wiki File Names
COOKIES_WIKI_FILES = {
    'pure_vanilla': 'Pure_Vanilla_Cookie.png',
    'dark_cacao': 'Dark_Cacao_Cookie.png',
    'hollyberry': 'Hollyberry_Cookie.png',
    'gold_cheese': 'Golden_Cheese_Cookie.png',
    'white_lily': 'White_Lily_Cookie.png',
    'sea_fairy': 'Sea_Fairy_Cookie.png',
    'moonlight': 'Moonlight_Cookie.png',
    'frost_queen': 'Frost_Queen_Cookie.png',
    'shadow_milk': 'Shadow_Milk_Cookie.png',
    'espresso': 'Espresso_Cookie.png',
    'vampire': 'Vampire_Cookie.png',
    'gingerbrave': 'GingerBrave.png',
    'strawberry': 'Strawberry_Cookie.png'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

downloaded = []

for cookie_id, filename in COOKIES_WIKI_FILES.items():
    api_url = f"https://cookierunkingdom.fandom.com/api.php?action=query&titles=File:{urllib.parse.quote(filename)}&prop=imageinfo&iiprop=url&format=json"
    try:
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'imageinfo' in page:
                image_url = page['imageinfo'][0]['url']
                dest_path = os.path.join(OUTPUT_DIR, f"{cookie_id}.png")
                
                img_req = urllib.request.Request(image_url, headers=headers)
                with urllib.request.urlopen(img_req) as img_resp, open(dest_path, 'wb') as out_f:
                    out_f.write(img_resp.read())
                print(f"✅ Success: {cookie_id}.png saved ({os.path.getsize(dest_path)} bytes)")
                downloaded.append(cookie_id)
            else:
                print(f"❌ File info not found for {filename}")
    except Exception as e:
        print(f"❌ Error downloading {cookie_id}: {e}")

print(f"\nSuccessfully downloaded {len(downloaded)} / {len(COOKIES_WIKI_FILES)} cookie images!")
