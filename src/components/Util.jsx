export const Util = {
    convertSeconds: (seconds) => {
        var sec_num = parseInt(seconds, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor(sec_num / 60) % 60;
        var sec = sec_num % 60;

        return [hours, minutes, sec]
            .map((v) => (v < 10 ? '0' + v : v))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':')
            .replace(/^0+/, '');
    }
};
