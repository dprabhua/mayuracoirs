import os
from PIL import Image, ImageEnhance

def optimize_logo(input_path, output_path, max_size=(300, 100)):
    """
    Optimize the logo image:
    1. Resize while maintaining aspect ratio
    2. Enhance contrast and sharpness
    3. Optimize file size
    4. Convert to PNG with transparency
    """
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Calculate new size maintaining aspect ratio
        ratio = min(max_size[0]/img.size[0], max_size[1]/img.size[1])
        new_size = (int(img.size[0]*ratio), int(img.size[1]*ratio))
        
        # Resize image
        img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Enhance image
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)  # Increase contrast by 20%
        
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(1.3)  # Increase sharpness by 30%
        
        # Save optimized image
        img.save(output_path, 'PNG', optimize=True, quality=90)
        print(f"Logo optimized and saved to {output_path}")
        
        # Print size reduction
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        reduction = (original_size - new_size) / original_size * 100
        print(f"Size reduced by {reduction:.1f}% ({original_size/1024:.1f}KB -> {new_size/1024:.1f}KB)")
        
    except Exception as e:
        print(f"Error optimizing logo: {e}")

def main():
    # Use the eco-friendly logo as it seems most appropriate
    input_logo = 'images/eco-friendly-logo.png'
    output_logo = 'images/logo.png'
    
    if os.path.exists(input_logo):
        optimize_logo(input_logo, output_logo)
    else:
        print(f"Could not find logo file: {input_logo}")

if __name__ == '__main__':
    main() 