import React, { useRef, useEffect } from 'react';
import styles from '../styles/CertificateCanvas.module.css';

const CertificateCanvas = () => {
    const canvasRef = useRef(null);

    // A function to handle text wrapping on the canvas
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image(); // Create a new Image instance

        // Load the image
        image.onload = () => {
            // First, fill the background with black color
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the image onto the canvas
            context.drawImage(image, 20, 37, 170, 330); // Adjust the position (20, 37) and size (170, 330) as needed

            // Draw the text after the image has loaded
            // LCERT Title
            context.fillStyle = '#e6d29d'; // Text color
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.font = 'bold 42px Arial';
            context.fillText('LCERT', 280, 70); // Position the text

            // American Crypto Academy Subtitle
            context.fillStyle = '#ffffff'; // Text color
            context.textAlign = 'left';
            context.font = '12px Arial';
            context.fillText('American Crypto Academy', 212, 100); // Position the text

            // Name
            context.font = '20px Arial';
            context.fillText('Matty', 212, 150); // Position the text

            // Certification Phrase
            context.font = '14px Arial';
            context.fillText('Is Certified As', 212, 180); // Position the text

            // Dynamic Certification Text
            context.fillStyle = '#e6d29d';
            context.font = '22px Arial';
            const dynamicText = 'Defi Engineer'; // Replace with your dynamic text variable
            const maxWidth = 170; // Set the maximum width of the text block
            const lineHeight = 26; // Set the line height
            wrapText(context, dynamicText, 212, 205, maxWidth, lineHeight); // Use wrapText function

            context.fillStyle = '#ffffff'; // Text color
            context.textAlign = 'left';
            context.font = '12px Arial';
            context.fillText('issued Date', 212, 270);

            context.fillStyle = '#ffffff'; // Text color
            context.textAlign = 'left';
            context.font = '12px Arial';
            context.fillText('21-01-2024', 212, 285);

            context.fillStyle = '#ffffff'; // Text color
            context.textAlign = 'left';
            context.font = '12px Arial';
            context.fillText('Valid Upto', 310, 270);

            context.fillStyle = '#ffffff'; // Text color
            context.textAlign = 'left';
            context.font = '12px Arial';
            context.fillText('10 days', 310, 285);

            context.fillStyle = '#e6d29d'; // Text color
            context.textAlign = 'left';
            context.font = 'bold 30px Arial';
            context.fillText('POLYGON', 212, 330);

            context.fillStyle = '#e6d29d'; // Text color
            context.textAlign = 'left';
            context.font = 'bold 20px Arial';
            context.fillText('0123 4567 8901', 212, 355);
        };

        // Set the source of the image
        image.src = '/images/certCoverImage/certCoverImg.png';

        // Clean up the effect by returning a function that does nothing (as there are no listeners to clean up in this case)
        return () => {};

    }, []);

    return (
        <canvas 
            ref={canvasRef}
            width={400}
            height={400}
            className="" // Removed empty string, assuming you have styles defined
        />
    );
};

export default CertificateCanvas;
