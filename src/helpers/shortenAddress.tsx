import { Address } from 'viem';
function shortenAddress(address: Address) {
  if (!address) return '';
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
}

export { shortenAddress };