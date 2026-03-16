"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haversine = void 0;
const R = 6371000;
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
// 导出 haversine 函数
const haversine = (lat1, lon1, lat2, lon2) => {
    // 将经纬度从度转换为弧度
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);
    // Haversine公式
    const a = Math.pow(Math.sin(Δφ / 2), 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.pow(Math.sin(Δλ / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 0.001; // 距离（米）
};
exports.haversine = haversine;
