#!/usr/bin/python3

# Download images of a wiki page.
import subprocess
import sys
import requests
import os

URL = "https://www.zkoss.org/_w//api.php?"
session = requests.Session()
page_titles = []
image_titles = []


def process_titles(titles_arg):
    for title in titles_arg:
        page_titles.append(title.replace(' ', "_"))


def get_image_titles():
    PARAMS = {
        "action": "query",
        "format": "json",
        "titles": "",
        "prop": "images"
    }
    for title in page_titles:
        PARAMS['titles'] = title
        try:
            response = session.get(url=URL, params=PARAMS)
            response.raise_for_status()
            pages = response.json()['query']['pages']
            for k, v in pages.items():
                if 'images' in v:
                    for img in v['images']:
                        image_titles.append(img["title"])
        except requests.exceptions.RequestException as e:
            print(f"Error fetching image titles for '{title}': {e}")
        except KeyError:
            print(f"Unexpected JSON structure for '{title}'")


url_set = set()


def get_images_url():
    IMAGE_INFO_PARAMS = {
        "action": "query",
        "format": "json",
        "titles": "",
        "prop": "imageinfo",
        "iiprop":"url"
    }
    for title in image_titles:
        IMAGE_INFO_PARAMS['titles'] = title
        try:
            response = session.get(url=URL, params=IMAGE_INFO_PARAMS)
            response.raise_for_status()
            json_data = response.json()
            pages = json_data['query']['pages']
            for k, v in pages.items():
                if 'imageinfo' in v and v['imageinfo']:
                    url_set.add(v["imageinfo"][0]["url"])
        except requests.exceptions.RequestException as e:
            print(f"Error fetching image URL for '{title}': {e}")
        except (KeyError, IndexError):
            print(f"Unexpected JSON or missing image info for '{title}'")


def download_images():
    if not os.path.exists('images'):
        os.makedirs('images')
    for url in url_set:
        try:
            subprocess.check_call(["wget", "-P", "images", url])
        except subprocess.CalledProcessError as err:
            print(err)
        except FileNotFoundError:
            print("Error: 'wget' command not found. Please install wget.")
            break

def main():
    if len(sys.argv) < 2:
        print(f"Usage: python3 {sys.argv[0]} <page_title1> [<page_title2> ...]")
        sys.exit(1)
    
    process_titles(sys.argv[1:])
    get_image_titles()
    get_images_url()
    download_images()

if __name__ == '__main__':
    main()