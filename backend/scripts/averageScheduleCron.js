const cron = require("node-cron");
const axios = require("axios");

const TIMEZONE = "Asia/Seoul";
const TARGET_URL = "http://localhost:4000/averageSchedule/generate";

function startAverageScheduleJob() {
    // 2월 28일 00:00
    cron.schedule(
        "0 0 0 28 2 *",
        async () => {
            console.log(`[cron] 2월 28일 실행: ${new Date().toISOString()}`);
            try {
                const res = await axios.post(TARGET_URL);
                console.log("[cron] success", res.status);
            } catch (err) {
                console.error("[cron] failed", err.message);
            }
        },
        { timezone: TIMEZONE }
    );

    // 8월 31일 00:00
    cron.schedule(
        "0 0 0 31 8 *",
        async () => {
            console.log(`[cron] 8월 31일 실행: ${new Date().toISOString()}`);
            try {
                const res = await axios.post(TARGET_URL);
                console.log("[cron] success", res.status);
            } catch (err) {
                console.error("[cron] failed", err.message);
            }
        },
        { timezone: TIMEZONE }
    );

    console.log("[cron] averageSchedule jobs scheduled for 2/28 and 8/31");
}

module.exports = { startAverageScheduleJob };
