import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=100');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export default handler;