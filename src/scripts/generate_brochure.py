from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

def create_brochure():
    # Create output directory if it doesn't exist
    os.makedirs('downloads', exist_ok=True)
    
    # Create PDF document
    doc = SimpleDocTemplate(
        "downloads/mayuracoirs-brochure.pdf",
        pagesize=A4,
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30
    )
    
    # Create styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=1
    )
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=18,
        spaceAfter=20,
        textColor=colors.HexColor('#2e7d32')
    )
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=10
    )
    
    # Create content
    story = []
    
    # Add title
    story.append(Paragraph("Mayuracoirs", title_style))
    story.append(Paragraph("Premium Coir Products", title_style))
    story.append(Spacer(1, 20))
    
    # Add company description
    story.append(Paragraph("About Us", heading_style))
    story.append(Paragraph(
        "Mayuracoirs is a leading manufacturer of sustainable coir products in India. "
        "We specialize in producing high-quality cocopeat blocks, coir pith, and soil solutions "
        "for agricultural and horticultural applications.",
        body_style
    ))
    story.append(Spacer(1, 20))
    
    # Add products section
    story.append(Paragraph("Our Products", heading_style))
    
    # Product 1
    story.append(Paragraph("Cocopeat Blocks", heading_style))
    story.append(Paragraph(
        "• High-quality cocopeat blocks for superior water retention and aeration\n"
        "• Perfect for hydroponic systems and organic gardening\n"
        "• Excellent moisture retention and natural pH balance\n"
        "• Available in various sizes and EC levels",
        body_style
    ))
    
    # Product 2
    story.append(Paragraph("Coir Pith", heading_style))
    story.append(Paragraph(
        "• Premium coir pith for soil amendment and potting mixes\n"
        "• Enhances soil structure and water retention\n"
        "• Promotes healthy root development\n"
        "• Ideal for organic farming and landscaping",
        body_style
    ))
    
    # Product 3
    story.append(Paragraph("Soil Solutions", heading_style))
    story.append(Paragraph(
        "• Custom blends for specific crops\n"
        "• Combines cocopeat, coir pith, and organic amendments\n"
        "• Optimized for different agricultural applications\n"
        "• Technical support available",
        body_style
    ))
    
    story.append(Spacer(1, 20))
    
    # Add specifications
    story.append(Paragraph("Product Specifications", heading_style))
    specs_data = [
        ['Product', 'Dimensions', 'Weight', 'Water Retention'],
        ['Cocopeat Blocks', '30x30x15 cm', '5 kg', '8-10 times'],
        ['Coir Pith', '60x30x30 cm', '20 kg', '6-8 times'],
        ['Soil Solutions', 'Custom', 'Custom', 'Custom']
    ]
    
    specs_table = Table(specs_data, colWidths=[2*inch, 1.5*inch, 1*inch, 1.5*inch])
    specs_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2e7d32')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    story.append(specs_table)
    
    story.append(Spacer(1, 20))
    
    # Add contact information
    story.append(Paragraph("Contact Us", heading_style))
    story.append(Paragraph(
        "Email: mayuracoirs@gmail.com\n"
        "Phone: +91 9994754402\n"
        "Address: Jalakantapuram, Salem, Tamilnadu, India - 636501",
        body_style
    ))
    
    # Build PDF
    doc.build(story)

if __name__ == "__main__":
    create_brochure() 