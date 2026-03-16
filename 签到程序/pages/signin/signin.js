//pages/signin/signin.js
const app = getApp();
Page({
  data: {
    coursename:'',
    latitude: null, // 纬度
    longitude: null ,// 经度
    currentTime: '', // 当前时间
    startTime: '',   // 起始时间
    endTime: '23:59',   // 结束时间初始值
  },
  onLoad(options) {
    // 接收传递过来的参数
    this.setData({
      coursename: options.coursename,
    });
    this.coursename = options.coursename
    console.log('课程名称:', this.data.coursename);
    const now = this.getCurrentTime();
    this.setData({
      currentTime: now,
      startTime: now,
    });
    this.currentTime = now;
  },
  // 请求定位
  getLocation() {
    const that = this;
    const teacherid = app.globalData.sztuid;
    if (!this.startTime || !this.endTime || !teacherid || !this.coursename) {
      wx.showToast({
        title: '请选择签到时间',
        icon: 'none',
      });
      console.log(this.startTime);
      console.log(this.endTime);
      console.log(teacherid);
      console.log(this.coursename);
      return;
    }
    const coursename = this.coursename;
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const startTime = `${year}-${month}-${day} ${this.startTime}`;
    const endTime = `${year}-${month}-${day} ${this.endTime}`;

    wx.getLocation({
      type: 'wgs84', // 返回 GPS 坐标
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        wx.showToast({
          title: '定位成功',
          icon: 'success',
        });
        wx.request({
          url: `${app.globalData.posturl}/signin/creat`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          data:{
            teacherid : teacherid,
            coursename : coursename,
            start_time : startTime,
            end_time : endTime,
            location_lat : this.latitude, // 纬度 
            location_lng : this.longitude,
          },
          success(res) {
            wx.hideLoading();
            if (res.statusCode === 200) {
              wx.showToast({
                title: '创建签到成功',
                icon: 'success',
                success() {
                  wx.redirectTo({
                    url: '/pages/index/index', // 注册成功跳转到登录页面
                  });
                },
              });
            } else {
              wx.showToast({
                title: '创建签到失败，请重试',
                icon: 'loading',
                duration: 3000 // 提示持续时间（毫秒）
              });
              console.error('服务器错误，创建签到失败:', res.data);
            }
          },
          fail(err) {
            wx.hideLoading();
            wx.showToast({
              title: '网络请求失败',
              icon: 'loading',
              duration: 3000 // 提示持续时间（毫秒）
            });
            console.error('网络错误:', err);
          },

        })
      },
      fail(err) {
        console.error("定位失败：", err);
        wx.showToast({
          title: '定位失败，请授权',
          icon: 'none'
        });
      }
    });
  },
  fail(err) {
    if (err.errMsg === "getLocation:fail auth deny") {
      wx.showModal({
        title: '授权失败',
        content: '需要定位权限以完成签到，请授权。',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success(settingRes) {
                if (settingRes.authSetting['scope.userLocation']) {
                  wx.showToast({
                    title: '授权成功，请重试',
                    icon: 'success'
                  });
                }
              }
            });
          }
        }
      });
    }
  },
  onStartTimeChange(e) {
    const selectedTime = e.detail.value;
    this.setData({
      startTime: selectedTime,
    });
    this.startTime = selectedTime;
    console.log(this.startTime);
  },

  // 结束时间选择
  onEndTimeChange(e) {
    const selectedTime = e.detail.value;
    // 检查结束时间是否早于起始时间
    if (selectedTime <= this.data.startTime) {
      wx.showToast({
        title: '结束时间不能早于起始时间',
        icon: 'none',
      });
      return;
    }

    this.setData({
      endTime: selectedTime,
    });
    this.endTime = selectedTime;
  },

  // 获取当前时间，格式为 "HH:mm"
  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
});
