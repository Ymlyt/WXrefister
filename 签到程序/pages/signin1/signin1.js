//pages/signin1/signin1.js
const app = getApp();
Page({
  data: {
    courseid :'',
    coursename :'',
    tlat : '',
    tlng : '',
    latitude : '', // 纬度
    longitude : '' ,// 经度
    startTime : '',   // 起始时间
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
    if (!this.coursename) {
      wx.showToast({
        title: '获取课程名称失败，请退出重试',
        icon: 'none',
      });
      return;
    }
    const coursename = this.coursename;
    console.log(coursename);
    wx.request({
      url: `${app.globalData.posturl}/signin/find`, // 替换为实际接口地址
      method: 'POST',
      data: {
        coursename : coursename
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data.data)
          const data = res.data.data;
          if (Array.isArray(data) && data.length > 0) {
            const lastItem = data[data.length - 1]; // 获取最后一个元素
            const lastId = lastItem.id; // 获取最后一个数据的 id
            const last_t_lat = lastItem.location_lat;
            const last_t_lng = lastItem.location_lng;
            // 如果需要存储到页面 data 中
            this.setData({
              courseid : lastId,
              tlat : last_t_lat,
              tlng : last_t_lng
            });
            this.courseid = lastId;
            this.tlat = last_t_lat;
            this.tlng = last_t_lng;
          } else {
            console.log('数据为空或不是数组');
            wx.showToast({
              title: '未找到相关课程数据',
              icon: 'none',
            });
          }

        } else {
          wx.showToast({
            title: '获取课程失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none',
        });
      },
    });
    const that = this;
    const studentid = app.globalData.sztuid;
    if (!this.startTime || !studentid) {
      wx.showToast({
        title: '请选择签到时间',
        icon: 'none',
      });
      console.log(this.startTime);
      console.log(studentid);
      return;
    }

    const startTime = this.startTime;
    const lastId = that.courseid;
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
          url: `${app.globalData.posturl}/attendance/signin`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          data:{
            signintaskid : lastId,
            studentid : app.globalData.sztuid,
            coursename : coursename,
            sign_in_time : startTime,
            t_lat : that.tlat,
            t_lng : that.tlng,
            location_lat : this.latitude, // 纬度 
            location_lng : this.longitude,
          },
          success(res) {
            wx.hideLoading();
            if (res.statusCode === 200) {
              console.log(res)
              const issign = res.data.data;
              console.log(issign.is_within_range);
              if(issign.is_within_range==true){
                wx.showToast({
                  title: '签到成功',
                  icon: 'success',
                  success() {
                    wx.redirectTo({
                      url: '/pages/index/index', // 注册成功跳转到登录页面
                    });
                  },
                });
              }
            } else {
              wx.showToast({
                title: '签到失败，请重试',
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
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.setData({
      startTime: now,
    });
    this.startTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    console.log(this.startTime);
    return;
  },
});
