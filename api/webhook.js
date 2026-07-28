export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const event = req.body;
  
  // We will process the Snipcart order here
  
  return res.status(200).json({ received: true });
}
