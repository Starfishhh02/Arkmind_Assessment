// This is a mock function for now. Replace with actual DB queries later.
export const getAllItems = async () => {
  return [
    {
      id: 1,
      name: 'Item 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Item 2',
      price: 200,
    },
  ];
};

export const createItemService = async (itemData: any) => {
  // Placeholder logic for creating an item, will use DB logic later
  const { name, description, price } = itemData;
  return { id: Date.now(), name, description, price };
};

export const getItemByIdService = async (id: number) => {
  // Mock item fetch
  return {
    id,
    name: `Item ${id}`,
    description: `Description for Item ${id}`,
    price: 100 * id,
  };
};

export const updateItemService = async (id: number, updatedData: any) => {
  // Placeholder for updating an item, mock logic
  return { ...updatedData, id };
};

export const deleteItemService = async (id: number) => {
  // Placeholder for deleting an item, mock logic
  return true;
};
