import os
import requests
from PIL import Image
from io import BytesIO

def download_image(url, filename):
    """Download an image from URL and save it to the specified path."""
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print(f"Downloaded {filename}")
        else:
            print(f"Failed to download {filename}: Status code {response.status_code}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

def main():
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')

    # Define image URLs and their corresponding filenames
    images = {
        # Product images (using natural/earthy images)
        'cocopeat.jpg': 'https://picsum.photos/seed/cocopeat/800/600',
        'coir-pith.jpg': 'https://picsum.photos/seed/coirpith/800/600',
        'soil-solutions.jpg': 'https://picsum.photos/seed/soil/800/600',
        
        # Use case images (using garden/agriculture images)
        'agriculture.jpg': 'https://picsum.photos/seed/agriculture/800/600',
        'horticulture.jpg': 'https://picsum.photos/seed/horticulture/800/600',
        'landscaping.jpg': 'https://picsum.photos/seed/landscape/800/600',
        
        # Team member images
        'teaml.jpg': 'https://picsum.photos/seed/team1/400/400',
        'teamr.jpg': 'https://picsum.photos/seed/team2/400/400',
        'teama.jpg': 'https://picsum.photos/seed/team3/400/400',
        
        # Other images
        'customer1.jpg': 'https://picsum.photos/seed/customer/600/400',
        'factory.jpg': 'https://picsum.photos/seed/factory/800/600',
        'logo.png': 'https://picsum.photos/seed/logo/300/100',
        'hero-bg.jpg': 'https://picsum.photos/seed/hero/1920/1080',
        'placeholder.jpg': 'https://picsum.photos/seed/placeholder/400/300'
    }

    # Download all images
    for filename, url in images.items():
        filepath = os.path.join('images', filename)
        download_image(url, filepath)

if __name__ == '__main__':
    main() 