export default function handler(req, res) {
    if (req.method === 'POST') {
        // Handle POST request - maybe you're saving the certificate
        res.status(200).json({ message: 'Certificate saved successfully' });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
