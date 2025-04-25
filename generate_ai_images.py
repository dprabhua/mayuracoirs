import os
from diffusers import StableDiffusionPipeline
import torch
from PIL import Image

def generate_image(prompt, output_path):
    """Generate an image using Stable Diffusion and save it to the specified path."""
    try:
        # Load the Stable Diffusion pipeline
        pipe = StableDiffusionPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",  # Use standard SD 1.5
            torch_dtype=torch.float32
        )
        
        # Move the pipeline to GPU if available
        device = "cuda" if torch.cuda.is_available() else "cpu"
        pipe = pipe.to(device)
        
        # Generate the image
        with torch.no_grad():
            image = pipe(
                prompt=prompt,
                num_inference_steps=50,
                guidance_scale=7.5
            ).images[0]
        
        # Save the image
        image.save(output_path)
        print(f"Generated image saved to {output_path}")
        
    except Exception as e:
        print(f"Error generating image: {e}")
        # Create a simple placeholder image
        placeholder = Image.new('RGB', (512, 512), color='lightgray')
        placeholder.save(output_path)
        print(f"Created placeholder image at {output_path}")

def main():
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')

    # Product images
    product_prompts = {
        'cocopeat.jpg': 'A high-quality cocopeat block made from coconut husks, showing its fibrous texture and natural brown color, suitable for gardening and agriculture, professional product photography style, 8k uhd, highly detailed',
        'coir-pith.jpg': 'Premium coir pith in a natural setting, showing its fine texture and rich brown color, perfect for soil amendment, professional product photography style, 8k uhd, highly detailed',
        'soil-solutions.jpg': 'A professional display of various soil solutions and potting mixes made from coir products, arranged neatly with gardening tools, professional product photography style, 8k uhd, highly detailed'
    }

    # Use case images
    use_case_prompts = {
        'agriculture.jpg': 'Aerial view of a large agricultural field using coir products for soil improvement, showing healthy crops and sustainable farming practices, professional photography style, 8k uhd, highly detailed',
        'horticulture.jpg': 'A modern greenhouse or nursery using coir products for plant cultivation, showing various plants growing in coir-based substrates, professional photography style, 8k uhd, highly detailed',
        'landscaping.jpg': 'A beautiful garden or landscape using coir products for soil improvement and water retention, showing healthy plants and sustainable landscaping practices, professional photography style, 8k uhd, highly detailed'
    }

    # Team member images
    team_prompts = {
        'teaml.jpg': 'Professional headshot of an Indian business executive in his 50s, wearing formal business attire, confident expression, professional photography style, 8k uhd, highly detailed',
        'teamr.jpg': 'Professional headshot of an Indian woman in her 40s, wearing formal business attire, confident expression, professional photography style, 8k uhd, highly detailed',
        'teama.jpg': 'Professional headshot of an Indian man in his 30s, wearing formal business attire, confident expression, professional photography style, 8k uhd, highly detailed'
    }

    # Other images
    other_prompts = {
        'customer1.jpg': 'Portrait of a satisfied farmer or gardener using coir products, showing them in their field or garden, professional photography style, 8k uhd, highly detailed',
        'factory.jpg': 'Modern coir manufacturing facility showing production process, clean and professional environment, professional photography style, 8k uhd, highly detailed',
        'logo.png': 'A professional logo for Mayuracoirs, featuring a stylized coconut or leaf design with the text "MAYURACOIRS" in a modern, clean font, suitable for a sustainable agricultural company, 8k uhd, highly detailed',
        'hero-bg.jpg': 'A beautiful aerial view of a coconut plantation with workers processing coir, showing the sustainable and natural aspects of coir production, professional photography style, 8k uhd, highly detailed, warm natural lighting',
        'placeholder.jpg': 'A simple gray placeholder image with the text "Loading..." in the center, minimal design'
    }

    # Generate all images
    print("Generating product images...")
    for filename, prompt in product_prompts.items():
        generate_image(prompt, f'images/{filename}')

    print("\nGenerating use case images...")
    for filename, prompt in use_case_prompts.items():
        generate_image(prompt, f'images/{filename}')

    print("\nGenerating team member images...")
    for filename, prompt in team_prompts.items():
        generate_image(prompt, f'images/{filename}')

    print("\nGenerating other images...")
    for filename, prompt in other_prompts.items():
        generate_image(prompt, f'images/{filename}')

if __name__ == '__main__':
    main() 