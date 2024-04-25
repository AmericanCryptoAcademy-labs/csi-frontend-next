export function validateAddresses(input: string): boolean {
  const cleanInput = input.replace(/[\[\]\s]/g, '');  // Remove brackets and spaces
  return cleanInput.split(',').every(address => 
      /^0x[a-fA-F0-9]{40}$/.test(address.trim())
  );
}