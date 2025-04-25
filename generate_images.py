import os
import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO

# Configure the API key (you'll need to replace this with your actual API key)
GOOGLE_API_KEY = "YOUR_API_KEY"
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-pro-vision')

# Product descriptions and prompts
products = {
    "cocopeat_blocks": {
        "description": "Premium cocopeat blocks for agriculture",
        "prompt": "Generate a high-quality image of compressed cocopeat blocks used in agriculture. The image should show the blocks in a professional setting, with a clean background. The blocks should be neatly stacked and have a natural brown color."
    },
    "coir_pith": {
        "description": "Fine coir pith for soil improvement",
        "prompt": "Create an image showing fine coir pith being used in agriculture. The image should demonstrate the texture and quality of the coir pith, with a focus on its natural appearance and how it's used in soil."
    },
    "soil_solutions": {
        "description": "Custom soil solutions with coir",
        "prompt": "Generate an image showing a professional agricultural setup using custom soil solutions with coir. The image should include healthy plants growing in the coir-based soil mix, with a focus on the natural and organic aspects."
    }
}

def generate_image(prompt, output_path):
    try:
        # Generate the image
        response = model.generate_content(prompt)
        
        # Save the image
        if response.image:
            image = Image.open(response.image)
            image.save(output_path)
            print(f"Successfully generated image: {output_path}")
        else:
            print(f"Failed to generate image for: {output_path}")
    except Exception as e:
        print(f"Error generating image: {str(e)}")

def main():
    # Create output directory if it doesn't exist
    output_dir = "static/images/products"
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate images for each product
    for product_name, product_info in products.items():
        output_path = os.path.join(output_dir, f"{product_name}.jpg")
        generate_image(product_info["prompt"], output_path)

if __name__ == "__main__":
    main() 