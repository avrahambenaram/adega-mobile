const date = new Date();

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

const dayMs = 24 * 60 * 60 * 1000;

export default {
    today(dateStr: string) {
        const dateParam = new Date(dateStr);
        if (dateParam.getDate() !== day) {
            return false;
        }
        if (dateParam.getMonth() !== month) {
            return false;
        }
        if (dateParam.getFullYear() !== year) {
            return false;
        }
        return true;
    },
    yesterday(dateStr: string) {
        const dateParam = new Date(dateStr);
        if (dateParam.getDate() !== day - 1) {
            return false;
        }
        if (dateParam.getMonth() !== month) {
            return false;
        }
        if (dateParam.getFullYear() !== year) {
            return false;
        }
        return true;
    },
    thisWeek(dateStr: string) {
        const dateParam = new Date(dateStr);
        const time1 = date.getTime() - (dayMs * 8);
        const time2 = date.getTime() - (dayMs * 2);
        if (dateParam.getTime() < time1) {
            return false;
        }
        if (dateParam.getTime() > time2) {
            return false;
        }
        return true;
    },
    thisMonth(dateStr: string) {
        const dateParam = new Date(dateStr);
        const time1 = date.getTime() - (dayMs * 31);
        const time2 = date.getTime() - (dayMs * 7);
        if (dateParam.getTime() < time1) {
            return false;
        }
        if (dateParam.getTime() > time2) {
            return false;
        }
        return true;
    },
    old(dateStr: string) {
        const dateParam = new Date(dateStr);
        const time = date.getTime() - (dayMs * 30);
        if (dateParam.getTime() > time) {
            return false;
        }
        return true;
    }
}