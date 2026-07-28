export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const event = req.body;

    // Check if it's a completed order event from Snipcart
    if (event.eventName === 'order.completed') {
      const order = event.content;

      // Prepare the payload for Tapstitch
      const tapstitchPayload = {
        external_id: order.token,
        shipping_address: {
          name: order.shippingAddress.name,
          address1: order.shippingAddress.address1,
          address2: order.shippingAddress.address2,
          city: order.shippingAddress.city,
          province: order.shippingAddress.province,
          postal_code: order.shippingAddress.postalCode,
          country: order.shippingAddress.country,
          phone: order.shippingAddress.phone
        },
        line_items: order.items.map(item => ({
          sku: item.id,
          quantity: item.quantity
        }))
      };

      // Send the order to Tapstitch API
      const tapstitchResponse = await fetch('https://api.tapstitch.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TAPSTITCH_API_KEY}`
        },
        body: JSON.stringify(tapstitchPayload)
      });

      if (!tapstitchResponse.ok) {
        const errorText = await tapstitchResponse.text();
        console.error('Tapstitch error:', errorText);
        return res.status(500).json({ message: 'Failed to forward order to Tapstitch' });
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
