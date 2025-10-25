export const signUp = async (req: any, res: any) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    res.status(200).send(`Hi ${name}`);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Something went wrong' });
  }
};
