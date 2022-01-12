

export function getMonth(month = new Date().getMonth()) {
    const year = new Date().getFullYear();
    const firstDayOfTheMonth = new Date(year, month, 1).getDay();
    let currentMonthCount = 1 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return new Date(year, month, currentMonthCount);
        });
    });
    return daysMatrix;
}