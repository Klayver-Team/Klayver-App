export const truncateTextWithEllipsis = (input: string, maxLength: number): string => {
    if (input.length <= maxLength) {
      return input;
    }
  
    const ellipsis = '...';
    const charsToShow = maxLength - ellipsis.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
  
    const truncatedText = input.slice(0, frontChars) + ellipsis + input.slice(-backChars);
  
    return truncatedText;
  }

  // Define collapseAddress as a utility function
const collapseAddress = (address: string) => {
  // Example implementation: remove leading zeros and '0x' prefix
  return address.replace(/^0x/, '').replace(/^0+/, '');
};
  
  