export function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();
  
    return (callback: any) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }
