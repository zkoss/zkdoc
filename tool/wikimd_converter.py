# convert wiki source content to markdown
import os
import re
import shutil
import subprocess
import sys
import scrapy
from scrapy.crawler import CrawlerProcess
import json

OUTPUT_FOLDER = 'output/'
WIKI_FOLDER = OUTPUT_FOLDER + 'wiki/'

HOST = 'https://www.zkoss.org/_w//api.php?'
ACTION_QUERY = 'action=query'

TITLES = "" # Will be populated from args

urls = []
page_titles_list = []


def process_titles(titles_arg):
    global TITLES
    for title in titles_arg:
        for line in title.splitlines():
            if not line.strip():
                continue
            line = line.strip()
            page_titles_list.append(line)
            urls.append(HOST + ACTION_QUERY + "&rvslots=*&format=json&prop=revisions&rvprop=content&titles=" + line.replace(' ', '_'))
    TITLES = "\n".join(page_titles_list)


class WikiSpider(scrapy.Spider):
    name = "wiki_spider"

    def start_requests(self):
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        wiki_text = self.extract_wiki_text(response.text)
        wiki_text = self.remove_width100(wiki_text)
        wiki_text = remove_templates(wiki_text)
        wiki_text = convert_template_include(wiki_text)

        data = json.loads(response.text)
        pages = data.get('query', {}).get('pages', {})
        title = "untitled"
        for page_id, page_info in pages.items():
            title = page_info.get('title', title)

        if not os.path.exists(WIKI_FOLDER):
            os.makedirs(WIKI_FOLDER)
        
        filename = WIKI_FOLDER + title.replace('/', '_').replace(' ', '_') + '.txt'
        with open(filename, "w") as file:
            file.write(wiki_text)

    @staticmethod
    def extract_wiki_text(jsonResponse):
        data = json.loads(jsonResponse)
        pages = data.get('query', {}).get('pages', {})
        for page_id, page_info in pages.items():
            if 'revisions' in page_info and page_info['revisions'] and 'slots' in page_info['revisions'][0]:
                return page_info['revisions'][0]['slots']['main']['*']
        return ""

    @staticmethod
    def remove_link(wiki_text):
        return wiki_text.replace('<a href="', '').replace('</a>', '').replace('">', ' ')

    @staticmethod
    def remove_width100(wiki_text):
        return wiki_text.replace('width="100%"', '')


def convert_figures_to_images(markdown_text):
    pattern = r'<figure>\s*<img src="([^"]+)" title=".*?" />\s*<figcaption>.*?</figcaption>\s*</figure>'
    return re.sub(pattern, r'![](\1)', markdown_text)


def remove_wiki_link(markdown_text):
    pattern_link = r'\[([^\]]+)\]\(([^ ]+) "wikilink"\)'
    return re.sub(pattern_link, r'[\1](\2)', markdown_text)


def convert_template_include(wiki_text):
    wiki_text = convert_on_after_render(wiki_text)
    wiki_text = re.sub(r'\{\{([^}]+)\}\}', r'{% include \1 %}', wiki_text)
    return wiki_text


def remove_templates(wiki_text):
    patterns = [
        r'(?i)\{\{LastUpdated\}\}',
        r'(?i)\{\{.*header\}\}',
        r'(?i)\{\{.*footer\}\}'
    ]
    for pattern in patterns:
        wiki_text = re.sub(pattern, '', wiki_text)
    return wiki_text


def convert_on_after_render(content):
    replacement_text = (
        "| <center><code>onAfterRender</code></center>\n"
        "| '''Event:'''  <javadoc>org.zkoss.zk.ui.event.Event</javadoc>"
    )
    return re.sub(r'\{\{onAfterRender\}\}', replacement_text, content)


MARKDOWN_FOLDER = OUTPUT_FOLDER + "md/"


def convert_markdown():
    if not os.path.exists(WIKI_FOLDER):
        print(f"Wiki folder not found: {WIKI_FOLDER}")
        return

    if not os.path.exists(MARKDOWN_FOLDER):
        os.makedirs(MARKDOWN_FOLDER)

    for txt_file in os.listdir(WIKI_FOLDER):
        if not txt_file.endswith('.txt'):
            continue
        
        file_name = os.path.join(WIKI_FOLDER, txt_file)
        output_file = os.path.join(MARKDOWN_FOLDER, os.path.splitext(txt_file)[0] + '.md')
        
        try:
            subprocess.check_call(["pandoc", file_name, "-f", "mediawiki", "-t", "gfm", "-s", "-o", output_file])
        except subprocess.CalledProcessError as e:
            print(f"Error converting {file_name}: {e}")
            continue
        
        with open(output_file, 'r') as file:
            markdown_content = file.read()
        
        markdown_content = convert_figures_to_images(markdown_content)
        markdown_content = remove_wiki_link(markdown_content)
        
        with open(output_file, 'w') as file:
            file.write(markdown_content)


def init_folder():
    if os.path.exists(OUTPUT_FOLDER):
        shutil.rmtree(OUTPUT_FOLDER)


def main():
    if len(sys.argv) < 2:
        print(f"Usage: python3 {sys.argv[0]} <page_title1> [<page_title2> ...]")
        sys.exit(1)

    page_titles_from_args = sys.argv[1:]
    process_titles(page_titles_from_args)
    init_folder()
    
    process = CrawlerProcess(settings={
        'LOG_LEVEL': 'INFO',
    })
    process.crawl(WikiSpider)
    process.start()
    
    convert_markdown()
    
    subprocess.run(["python3", "tool/wiki_image_downloader.py"] + page_titles_from_args)

if __name__ == '__main__':
    main()
