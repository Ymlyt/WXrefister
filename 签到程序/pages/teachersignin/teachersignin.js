// pages/teachersignin/teachersignin.js
Page({

  data: {
    coursename: ''
  },
  onLoad(options) {
    // 接收传递过来的参数
    this.setData({
      coursename: options.coursename,
    });
    console.log('课程名称:', this.data.coursename);
  },
  navigateToSignin() {
    wx.navigateTo({
      url: `/pages/signin/signin?coursename=${this.data.coursename}`
    });
  },

})