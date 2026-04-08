
import os
import pdfplumber
from PIL import Image
import io

pdf_files = [
    'practice-tasks---numerical-reasoning.pdf',
    'practice-tasks---verbal-reasoning.pdf',
    'practice-tasks---inductive-logical-reasoning-scales-clx.pdf',
    'practice-tasks--deductive-numeracy-digitchallenge.pdf',
    'practice-tasks--deductive-reasoning-gapchallenge.pdf',
    'practice-tasks--deductive-reasoning-switchchallenge.pdf',
    'practice-tasks--inductive-reasoning-ix.pdf',
    'practice-tasks-applied-numeracy.pdf',
    'practice-tasks---ap-reasoning.pdf'
]

output_dir = 'pdf_extracts'
os.makedirs(output_dir, exist_ok=True)

for pdf_file in pdf_files:
    print(f"\n{'='*60}")
    print(f"Processing: {pdf_file}")
    print('='*60)
    
    try:
        with pdfplumber.open(pdf_file) as pdf:
            text_content = []
            image_count = 0
            
            # Create image directory for this PDF
            pdf_name = os.path.splitext(pdf_file)[0]
            image_dir = os.path.join(output_dir, f"{pdf_name}_images")
            os.makedirs(image_dir, exist_ok=True)
            
            for page_num, page in enumerate(pdf.pages, 1):
                print(f"\n--- Page {page_num} ---")
                
                # Extract text
                text = page.extract_text()
                if text:
                    print(text[:500] + '...' if len(text) > 500 else text)
                    text_content.append(f"\n--- Page {page_num} ---\n{text}")
                
                # Extract images
                images = page.images
                if images:
                    print(f"  Found {len(images)} image(s) on this page")
                    for img_num, img in enumerate(images, 1):
                        try:
                            # Get image data
                            x0, top, x1, bottom = img['x0'], img['top'], img['x1'], img['bottom']
                            width = img['width']
                            height = img['height']
                            
                            # Crop the image from the page
                            im = page.within_bbox((x0, top, x1, bottom)).to_image()
                            
                            # Save the image
                            img_filename = f"page{page_num}_img{img_num}.png"
                            img_path = os.path.join(image_dir, img_filename)
                            im.save(img_path)
                            print(f"    Saved image: {img_path}")
                            image_count += 1
                        except Exception as img_error:
                            print(f"    Error saving image: {img_error}")
            
            # Save text to file
            if text_content:
                text_file = os.path.join(output_dir, f"{pdf_name}_text.txt")
                with open(text_file, 'w', encoding='utf-8') as f:
                    f.write('\n'.join(text_content))
                print(f"\nText saved to: {text_file}")
            
            print(f"\nTotal images found in {pdf_file}: {image_count}")
            
    except Exception as e:
        print(f"Error processing {pdf_file}: {e}")

print(f"\n{'='*60}")
print("Extraction complete!")
print(f"Results saved to: {output_dir}")
print('='*60)
