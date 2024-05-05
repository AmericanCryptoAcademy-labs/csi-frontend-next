export interface certData {
    StudentName: string
    CertificateName: string
    Duration: number
    Organization: string
    certBg:string
}
export default function createCertificate(certData: certData): Promise<string> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        canvas.width = 400;
        canvas.height = 400;
        const context = canvas.getContext('2d');

        if (!context) {
            console.error('Unable to get canvas context');
            reject('Unable to get canvas context');
            return;
        }

        const image = new Image();
        image.crossOrigin = 'Anonymous';

        const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
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

        image.onload = () => {
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.drawImage(image, 20, 37, 170, 330);

            context.fillStyle = '#e6d29d';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.font = 'bold 42px Arial';
            context.fillText('LCERT', 280, 70);

            context.fillStyle = '#ffffff';
            context.textAlign = 'left';
            context.font = '12px Arial';
            context.fillText(certData.Organization, 212, 100);

            context.font = '20px Arial';
            context.fillText(certData.StudentName, 212, 150);

            context.font = '14px Arial';
            context.fillText('Is Certified As', 212, 180);

            context.fillStyle = '#e6d29d';
            context.font = '22px Arial';
            const dynamicText = certData.CertificateName;
            const maxWidth = 170;
            const lineHeight = 26;
            wrapText(context, dynamicText, 212, 205, maxWidth, lineHeight);

            context.fillStyle = '#ffffff';
            context.font = '12px Arial';
            context.fillText('Issued Date', 212, 270);

            context.fillStyle = '#ffffff';
            context.font = '12px Arial';
            context.fillText(formattedDate, 212, 285);

            context.fillStyle = '#ffffff';
            context.font = '12px Arial';
            context.fillText('Valid Upto', 310, 270);

            context.fillStyle = '#ffffff';
            context.font = '12px Arial';
            context.fillText(certData.Duration + ` Days`, 310, 285);

            context.fillStyle = '#e6d29d';
            context.font = 'bold 30px Arial';
            context.fillText('POLYGON', 212, 330);

            context.fillStyle = '#e6d29d';
            context.font = 'bold 20px Arial';
            context.fillText('0123 4567 8901', 212, 355);

            // After drawing on the canvas is done
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL); // Resolve the Promise with the data URL
        };

        image.onerror = () => {
            reject('Failed to load image');
        };

        image.src = certData.certBg;
    });
}

export function dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }

