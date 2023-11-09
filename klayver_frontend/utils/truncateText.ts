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
  
  