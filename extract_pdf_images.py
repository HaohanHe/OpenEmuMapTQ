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

output_dir = 'pdf_images'
os.makedirs(output_dir, exist_ok=True)

for pdf_file in pdf_files:
    print(f"\n{'='*60}")
    print(f"Processing: {pdf_file}")
    print('='*60)
    
    try:
        with pdfplumber.open(pdf_file) as pdf:
            image_count = 0
            
            for page_num, page in enumerate(pdf.pages, 1):
                images = page.images
                if images:
                    print(f"Page {page_num}: Found {len(images)} image(s)")
                    
                    for img_idx, img in enumerate(images, 1):
                        image_count += 1
                        # Extract image
                        x0, top, x1, bottom = img['x0'], img['top'], img['x1'], img['bottom']
                        image = page.within_bbox((x0, top, x1, bottom)).to_image()
                        
                        # Save image
                        pdf_name = os.path.splitext(pdf_file)[0]
                        img_filename = f"{pdf_name}_page{page_num}_img{img_idx}.png"
                        img_path = os.path.join(output_dir, img_filename)
                        image.save(img_path)
                        print(f"  Saved: {img_filename}")
            
            print(f"\nTotal images extracted from {pdf_file}: {image_count}")
            
    except Exception as e:
        print(f"Error processing {pdf_file}: {e}")

print(f"\n{'='*60}")
print("Image extraction complete!")
print(f"Images saved to: {output_dir}")
print('='*60)
