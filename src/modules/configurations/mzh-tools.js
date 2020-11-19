/**
 * contain some general handy methods.
 * @author Moaaz Nashawi
 * 
 * @module Tools MZHTools
 */

/**
 * generate a date and increase it by days
 * @method
 * @param {Number} days number of days to be added to the date
 * @returns {Date} return the Date after adding the days
 */
export const createDateDaysIncreased = (days) => {

    let date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}


export default () => { }