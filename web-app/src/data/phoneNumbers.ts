export interface PhoneNumber {
  id: string;
  number: string;
  vapi_id: string;
  status: 'available' | 'taken';
  region: string;
  price: number;
}

export const AVAILABLE_PHONE_NUMBERS: PhoneNumber[] = [
  {
    id: '1',
    number: '+18149247495',
    vapi_id: 'ed636f59-7ecc-4658-b4d1-ee0a3726db5c',
    status: 'available',
    region: 'US',
    price: 9
  },
  {
    id: '2', 
    number: '+15551234567',
    vapi_id: 'ed636f59-7ecc-4658-b4d1-ee0a3726db5c',
    status: 'available',
    region: 'US',
    price: 9
  },
  {
    id: '3',
    number: '+15558675309', 
    vapi_id: 'ed636f59-7ecc-4658-b4d1-ee0a3726db5c',
    status: 'available',
    region: 'US',
    price: 9
  },
  {
    id: '4',
    number: '+15551234567',
    vapi_id: 'ed636f59-7ecc-4658-b4d1-ee0a3726db5c',
    status: 'available', 
    region: 'US',
    price: 9
  }
];

export const getAvailableNumbers = () => {
  return AVAILABLE_PHONE_NUMBERS.filter(num => num.status === 'available');
};

export const getNumberById = (id: string) => {
  return AVAILABLE_PHONE_NUMBERS.find(num => num.id === id);
};

// Finds phone object by phone number
export const getNumberByPhoneNumber = (phoneNumber: string) => {
  return AVAILABLE_PHONE_NUMBERS.find(num => num.number === phoneNumber);
}; 