const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const year = (ym: string) => ym.slice(0, 4);

export const monthYear = (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${year(ym)}`;
